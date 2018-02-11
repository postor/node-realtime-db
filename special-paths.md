# special paths | 特殊路径

## `user` store | `user` 仓库

`db.set('user',val)` or `db.set('user.path.to.something',val,option)`

store things that won't mix with others, can be used to auth user operation on server side, data in user will lost when user leave this application

用于保存不和其他用户混用的数据，可以在服务端用来验证用户身份等，用户断开后保存的数据会被丢弃

```

var app = require('http').createServer(handler)
require('node-realtime-db-server')(app,{},{
  auth:(user,event,eventData={},rtdb)=>{
    if(!isLogin(user.token)){
      return false
    }

    const {path} = eventData
    if(path.startsWith('admin.')){
      if(!isAdmin(user.token)){
        return false
      }
    }

    return true
  }
})

```
auth can be async, [example usage](./test/server.js)

auth可以说异步的， [使用示例](./test/server.js)