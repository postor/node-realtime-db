require('babel-polyfill')
const Server = require('http').Server
const express = require('express')
const next = require('next')
const rtdb = require('node-realtime-db-server')
const JsonAdapter = require('./JsonAdapter')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    const http = Server(server)
    const { db } = rtdb.default(http, {}, {
      Adapter: JsonAdapter,
      auth: (user = {}, event, eventData = {}, rtdb) => {
        const { path = '', option } = eventData
        if (path == 'messages' || path.startsWith('messages.')) {
          if (event != '$rtdb$set') {
            return true
          }
          if (option !== 'unshift') {
            console.log({ user, event, eventData, result: (user.secret == '123456') })
            return user.secret == '123456'
          }
        }
        return true
      },
      onChange: (rtdb, socket, path, newValue) => {
        const historySize = 10
        if (path == 'messages' && newValue.length > historySize) {
          rtdb.set('messages', [historySize, newValue.length - historySize], 'splice').then(console.log).catch(console.log)
        }
      }
    })
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    http.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })