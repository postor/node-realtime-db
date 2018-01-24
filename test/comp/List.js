import { connect } from 'node-realtime-db-react'

const List = (props) => {
  const { messages } = props
  return (<ul>
    {messages && messages.map((m, i) => {
      return (<li key={i}>{m}</li>)
    })}
  </ul>)
}

export default connect({ messages: 'messages' })(List)