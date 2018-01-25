import { connect } from 'node-realtime-db-react'

const List = (props) => {
  const { messages } = props
  return (<ul>
    {messages && messages.map((m = {}, i) => {
      const { id, name, message, time } = m
      return (<li key={id}>
        <p>{message}</p>
        <p style={{
          textAlign: 'right',
        }}>{time} by {name}</p>
        <hr />
      </li>)
    })}
  </ul>)
}

export default connect({ messages: 'messages' })(List)