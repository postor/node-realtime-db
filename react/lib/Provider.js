import React, { Component, Children } from 'react'
import Db from 'node-realtime-db-client'
import PropTypes from 'prop-types'

const serverSide = typeof window == 'undefined'

const eventPrifix = '$rtdb$'

class Provider extends Component {

  static propTypes = {
    url: PropTypes.string,
    option: PropTypes.object
  }

  static childContextTypes = {
    db: PropTypes.any
  }

  constructor(props) {
    super(props)
    if (serverSide) {
      this.db = {}
      return
    }

    const { url, option = {} } = props
    const { path = '/rtdb' } = option
    this._toClean = []

    this.db = new Db(url, {
      ...option,
      path,
    })
  }

  getChildContext() {
    return {
      db: this.db,
    }
  }

  render() {
    return Children.only(this.props.children)
  }

}

export default Provider