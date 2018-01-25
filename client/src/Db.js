import io from 'socket.io-client'
import objectPath from 'object-path'

import operations from './operations'

const eventPrifix = '$rtdb$'

class Db {

  static operations = operations

  constructor(url, options = {}) {
    this.io = io(url, options)
    this.data = {}
    this.changeListenners = []
  }

  async get(path) {
    return new Promise((resolve, reject) => {
      const cb = (data) => {
        if (data.path == path) {
          this.io.removeListener(`${eventPrifix}get`, cb)
          objectPath.set(this.data, data.path, data.value)
          resolve(data.value)
        }
      }
      this.io.on(`${eventPrifix}get`, cb)
      this.io.emit(`${eventPrifix}get`, { path })
    })
  }

  /**
   * 
   * @param {string} path 
   * @param {any} value 
   * @param {Object} option
   * @param {string} option.operation 
   */
  async set(path, value, option) {
    return new Promise((resolve, reject) => {
      const cb = (data) => {
        if (data.path == path) {
          this.io.removeListener(`${eventPrifix}set`, cb)
          if (data.error) {
            reject(data.error)
          } else {
            resolve(data.value)
          }
        }
      }
      this.io.on(`${eventPrifix}set`, cb)
      this.io.emit(`${eventPrifix}set`, { path, value, option })
    })
  }

  watch(path, cb) {
    let watching = true
    this.get(path).then((value) => {
      watching && cb(value)
    })

    const onUpdate = (data) => {
      if (data.path.startsWith(path)) {
        objectPath.set(this.data, data.path, data.value)
        this.changeListenners.forEach(x => x(this.data))
        cb(objectPath.get(this.data, path))
      }
    }

    this.io.on(`${eventPrifix}update`, onUpdate)

    return () => {
      watching = false;
      this.io.removeListener(`${eventPrifix}update`, onUpdate)
    }
  }

  onChange(cb) {
    this.changeListenners.push(cb)
  }

  unbindChange(cb) {
    const index = this.changeListenners.indexOf(cb)
    this.changeListenners.splice(index, 1)
  }
}

export default Db