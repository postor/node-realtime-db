# node-realtime-db-react

realtime database for nodejs, support for react. I mean firebase-lite or redux-server

node.js的实时数据库，支持react，有点像firebase和redux的合体

![screenshot](https://raw.githubusercontent.com/postor/node-realtime-db/master/screenshot.gif)

[online demo](https://test-qvothdqjjn.now.sh/)

## react | react使用

`provider` page

```
import { Provider } from 'react-node-realtime-db-react'

export default ()=>(<Provider db={dburl}>
  <App />
</Provider>)

```

`connect` in component

```
import { connect } from 'react-node-realtime-db-react'

const App = (props)=>{
  const { a, b } = props
  return (<p>{JSON.stringify(data)}</p>)
}

export default connect({a:'path.a', b:'b'})(App)

```

[more info | 查看更多](https://github.com/postor/node-realtime-db)