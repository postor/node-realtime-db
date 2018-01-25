import { Component } from 'react'
import { connect } from 'node-realtime-db-react'

const secretPath = 'user.secret'

class AdminSecret extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputSecret: ''
    }
  }

  render() {
    const { set } = this.props
    const { inputSecret } = this.state
    return (<div>
      <label>admin:</label>
      <input value={inputSecret} onChange={(e) => {
        this.setState({
          inputSecret: e.target.value
        })
        set(secretPath, e.target.value)
      }} />
      <span>
        enter `123456` then you can delete
      </span>
    </div>)
  }
}

export default connect({})(AdminSecret)