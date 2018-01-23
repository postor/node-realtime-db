# node-realtime-db

realtime database for nodejs, specially for react. I mean firebase-lite or redux-server

## server side

```
var app = require('http').createServer(handler)
require('node-realtime-db')(app, { db:'memory' })
```

## client side

```
import Db from 'node-realtime-db'

const db = new Db('http://localhost/rtdb')

db.get('path.key').then((value)=>{
  alert(value)
})

db.watch('path.key',(value)=>{
  alert(value)
})

db.update('path.key.sub','z')

```

## react

```
import {Provider} from 'react-node-realtime-db'

export default ()=>(<Provider db={dburl}>
  <App />
</Provider>)

```


```
import {connect} from 'react-node-realtime-db'

const App = (props)=>{
  const { a, b } = props
  return (<p>{JSON.stringify(data)}</p>)
}
export default connect({a:'path.a',b:'b'})(App)

```
