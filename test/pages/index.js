import 'babel-polyfill'
import { Provider } from 'node-realtime-db-react'
import List from '../comp/List'
import Input from '../comp/Input'


export default () => {
  return (<Provider>
    <div>
      <h1>live chat</h1>
      <List />
      <Input />
    </div>
  </Provider>)
}