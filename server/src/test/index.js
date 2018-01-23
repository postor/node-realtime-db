import { Server } from 'http'
import 'babel-polyfill'
import express from 'express'
import rtdb from '../'
import { setTimeout } from 'timers';

const app = express()
const http = Server(app)

const { db } = rtdb(http, {}, {
  initalData: {
    a: 1,
    b: 'zz',
  },
})

app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>')
});


http.listen(3000, function () {
  console.log('listening on *:3000')
});


setTimeout(async () => {
  console.log(`'a'=${await db.get('a')}`)
  await db.set('c.d.e', 5)
  setTimeout(async () => {
    console.log(`'c.d'=${JSON.stringify(await db.get('c.d'))}`)
  }, 1000)
}, 1000)