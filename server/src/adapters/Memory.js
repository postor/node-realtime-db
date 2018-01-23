import objectPath from 'object-path'

class Memory {
  constructor(initalData) {
    this.data = initalData
  }

  async get(path) {
    return objectPath.get(this.data, path, undefined)
  }

  async set(path, value) {
    objectPath.set(this.data, path, value)
    return value
  }
}

export default Memory