import Memory from './adapters/Memory'

const eventPrifix = '$rtdb$'

class Db {
  constructor(io, initalData = {}, Adapter = Memory) {
    this.io = io
    this.adapter = new Adapter(initalData)
    this.io.on('connection', (socket) => {
      socket.on(`${eventPrifix}get`, async ({ path }) => {
        const value = await this.get(path)
        this.io.emit(`${eventPrifix}get`, {
          path,
          value,
        })
      })
      socket.on(`${eventPrifix}set`, async ({ path, value, option }) => {
        await this.set(path, value, option)
      })
    })
  }

  async set(path, value, option) {
    const newValue = await this.adapter.set(path, value, option)
    this.io.emit(`${eventPrifix}update`, {
      path,
      value: newValue,
    })
  }

  async get(path) {
    return await this.adapter.get(path)
  }
}

export default Db