import SocketIO from 'socket.io'
import Db from './Db'

export { default as Adapter } from './adapters/Adapter'

export default (httpServer, ioOptions = {}, dbOptions = {}) => {

  const { path = '/rtdb' } = ioOptions

  const io = new SocketIO(httpServer, {
    ...ioOptions,
    path,
  })

  const db = new Db(io, dbOptions)

  return {
    io,
    db,
  }
}