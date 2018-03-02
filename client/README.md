# node-realtime-db-client

realtime database for nodejs, support for react. I mean firebase-lite or redux-server, browser will automatically update when data change on server

node.js的实时数据库，支持react，有点像firebase和redux的合体， 当服务端数据变化的时候浏览器中的相关内容会自动更新

![screenshot](https://raw.githubusercontent.com/postor/node-realtime-db/master/screenshot.gif)

[online demo](https://test-qvothdqjjn.now.sh/)

## client side | 客户端

```
import Db from 'node-realtime-db-client'

const db = new Db('http://localhost/rtdb')

db.get('path.key').then((value)=>{
  alert(value)
})

db.watch('path.key',(value)=>{
  alert(value)
})

db.update('path.key.sub','z')

```

[more info | 查看更多](https://github.com/postor/node-realtime-db)