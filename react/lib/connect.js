
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const serverSide = typeof window == 'undefined'

export default (mapPaths) => (C) => {
  class HOC extends Component {
    static contextTypes = {
      db: PropTypes.any,
    }

    constructor(props) {
      super(props)
      this._toClean = []
      this.state = {}
    }

    async componentWillMount() {
      if (serverSide) {
        return
      }

      const { db } = this.context
      const keys = Object.keys(mapPaths)
      await Promise.all(keys.map(async (k) => {
        const p = mapPaths[k]
        const v = await db.get(p)
        this.setState({
          [k]: v
        })
        const unwatch = db.watch(p, (val) => {
          console.log('update happen', { p, val })
          this.setState({
            [k]: val,
          })
        })
        this._toClean.push(unwatch)
        return v
      }))
    }


    render() {
      const { db } = this.context
      const set = (path, value) => db.set(path, value)
      return (<C {...{ ...this.props, ...this.state, set }} />)
    }

    componentWillUnmount() {
      this._toClean.forEach(x => x())
    }
  }
  return HOC
}