import { connect } from 'node-realtime-db-react'

const List = (props) => {
  const { messages, set } = props
  return (<ul>
    {messages && messages.map((m = {}, i) => {
      const { id, name, message, time } = m
      return (<li key={id} style={{
        position: 'relative',
      }}>
        <a
          style={{
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 0,
            color: 'red',
            fontSize: '20px',
          }}
          onClick={() => set('messages', [i, 1], 'splice').catch(alert)}
        >{'✖'}</a>
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