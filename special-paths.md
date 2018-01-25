# special paths

## `user` store

`db.set('user',val)` or `db.set('user.path.to.something',val,option)`

store things that won't mix with others, can be used to auth user operation on server side

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
auth can be async

## `local` 

`db.set('local',val)` or `db.set('local.path.to.something',val,option)`

store things that only current page know, when you set value under this path, value not updated to server
