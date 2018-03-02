import 'babel-polyfill'
import { Provider } from 'node-realtime-db-react'
import List from '../comp/List'
import Input from '../comp/Input'
import AdminSecret from '../comp/AdminSecret'
import ServerCounter from '../comp/ServerCounter'


const Index = () => {
  return (<Provider>
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <ServerCounter />
      <h1>live chat</h1>
      <AdminSecret />
      <List />
      <Input />

    </div>
  </Provider>)
}

export default Index