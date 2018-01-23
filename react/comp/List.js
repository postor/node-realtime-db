import connect from '../lib/connect'

const List = (props) => {
  const { messages } = props
  return (<ul>
    {messages && messages.map((m, i) => {
      return (<li key={i}>{m}</li>)
    })}
  </ul>)
}

export default connect({ messages: 'messages' })(List)