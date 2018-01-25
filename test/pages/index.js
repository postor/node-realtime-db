import 'babel-polyfill'
import { Provider } from 'node-realtime-db-react'
import List from '../comp/List'
import Input from '../comp/Input'
import AdminSecret from '../comp/AdminSecret'


export default () => {
  return (<Provider>
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <h1>live chat</h1>
      <AdminSecret />
      <List />
      <Input />

    </div>
  </Provider>)
}