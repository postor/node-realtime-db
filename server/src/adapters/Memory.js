import objectPath from 'object-path'
import operations from '../operations'

class Memory {
  constructor(initalData) {
    this.data = initalData
  }

  async get(path) {
    return objectPath.get(this.data, path, undefined)
  }

  async set(path, value, option) {
    const op = getOperation(option)
    let k = 1
    switch (op) {
      case operations.decr:
        k = -1
      case operations.incr:
        const check1 = this.checkPathType(path, x => typeof x == 'number', 0)
        if (!check1.pass) {
          return check1.value
        }
        const new1 = check1.value + k * value
        objectPath.set(this.data, path, new1)
        return new1
        break;

      case operations.push:
        const check2 = this.checkPathType(path, x => Array.isArray(x), [])
        if (!check2.pass) {
          return check2.value
        }
        const new2 = [...check2.value, value]
        objectPath.set(this.data, path, new2)
        return new2
        break
      case operations.unshift:
        const check3 = this.checkPathType(path, x => Array.isArray(x), [])
        if (!check3.pass) {
          return check3.value
        }
        const new3 = [value, ...check3.value]
        objectPath.set(this.data, path, new3)
        return new3
        break
      case operations.splice:
        const check4 = this.checkPathType(path, x => Array.isArray(x), [])
        if (!check4.pass) {
          return check4.value
        }
        check4.value.splice(...value)
        objectPath.set(this.data, path, check4.value)
        return check4.value
        break
      default:
        objectPath.set(this.data, path, value)
        return value
    }
  }

  checkPathType(path, check, defaultValue) {
    const value = objectPath.get(this.data, path)
    if (typeof value == 'undefined') {
      return {
        value: defaultValue,
        pass: true,
      }
    }
    if (check(value)) {
      return {
        value,
        pass: true
      }
    }
    return {
      value,
      pass: false
    }
  }
}

export default Memory

function getOperation(option) {
  const defaultOperation = operations.set
  if (!option) {
    return defaultOperation
  }
  if (typeof option == 'string') {
    if (isValid(option)) {
      return option
    }
    return defaultOperation
  }
  if (option.operation) {
    if (isValid(option.operation)) {
      return option.operation
    }
    return defaultOperation
  }
  return defaultOperation

  function isValid(operation) {
    return operations[operation]
  }
}