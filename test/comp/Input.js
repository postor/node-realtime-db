import { Component } from 'react'
import { connect } from 'node-realtime-db-react'
import uuid from 'uuid/v1'
import randomName from 'random-name'

class Input extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: randomName(),
    }
  }

  render() {
    const { messages = [], set } = this.props
    const { message = '', name } = this.state

    return (<div>
      <textarea
        style={{
          width: '100%',
        }}
        rows={5}
        value={message}
        onChange={(e) => {
          this.setState({
            message: e.target.value,
          })
        }} />
      <div>
        <label>name: {name}</label>
        <button
          onClick={() => {
            if (!message.trim()) {
              return
            }
            set('messages', {
              message,
              time: new Date(),
              id: uuid(),
              name,
            }, 'unshift')
            this.setState({
              message: '',
            })
          }}
          style={{
            width: 150,
            height: 40,
            float: 'right',
          }}
        >send</button>
      </div>
    </div>)
  }
}

export default connect({ messages: 'messages' })(Input)