import { connect } from 'node-realtime-db-react'

export default connect({ counter: 'counter' })(({ counter }) => (<p>
  counter from server = {counter}
</p>))