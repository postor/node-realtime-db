import io from 'socket.io-client'
import objectPath from 'object-path'

const eventPrifix = '$rtdb$'

class Db {
  constructor(url, options = {}) {
    this.io = io(url, options)
    this.data = {}
  }

  async get(path) {
    return new Promise((resolve, reject) => {
      const cb = (data) => {
        if (data.path == path) {
          this.io.removeListener(`${eventPrifix}get`, cb)
          objectPath.set(data.path, data.value)
          resolve(data.value)
        }
      }
      this.io.on(`${eventPrifix}get`, cb)
      this.io.emit(`${eventPrifix}get`, { path })
    })
  }

  watch(path, cb) {
    let watching = true
    this.get(path).then((value) => {
      watching && cb(value)
    })

    const onUpdate = (data) => {
      if (data.path.startsWith(path)) {
        objectPath.set(data.path, data.value)
        cb(objectPath.get(path))
      }
    }

    this.io.on(`${eventPrifix}update`, onUpdate)

    return () => {
      watching = false;
      this.io.removeListener(`${eventPrifix}update`, onUpdate)
    }
  }
}