import { Component } from 'react'
import { connect } from 'node-realtime-db-react'

class Input extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { messages = [], set } = this.props
    const { message = '' } = this.state

    return (<div>
      <textarea rows={5} value={message} onChange={(e) => {
        this.setState({
          message: e.target.value,
        })
      }} />
      <button onClick={() => {
        const ms = [...messages, message]
        set('messages', ms)
        this.setState({
          message: '',
        })
      }}>send</button>
    </div>)
  }
}

export default connect({ messages: 'messages' })(Input)