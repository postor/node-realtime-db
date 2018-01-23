import Memory from './adapters/Memory'

const eventPrifix = '$rtdb$'

class Db {
  constructor(io, initalData = {}, Adapter = Memory) {
    this.io = io
    this.adapter = new Adapter(initalData)
    this.io.on(`${eventPrifix}get`, async ({ path }) => {
      const value = this.get(path)
      this.io.emit(`${eventPrifix}get`, {
        path,
        value,
      })
    })
  }

  async set(path, value) {
    await this.adapter.set(path, value)
    this.io.emit(`${eventPrifix}update`, {
      path,
      value,
    })
  }

  async get(path) {
    return await this.adapter.get(path)
  }
}

export default Db