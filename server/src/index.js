import SocketIO from 'socket.io'
import Db from './Db'


export default (httpServer, ioOptions = {}, dbOptions = {}) => {

  const { path = '/rtdb' } = ioOptions
  const { Adapter, initalData, auth } = dbOptions

  const io = new SocketIO(httpServer, {
    ...ioOptions,
    path,
  })

  const db = new Db(io, initalData, Adapter, auth)

  return {
    io,
    db,
  }
}