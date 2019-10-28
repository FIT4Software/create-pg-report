import React, { Component } from 'react'
import styles from './styles.module.scss'

class Splitter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: 50
    }
  }

  componentDidMount = () => {
    this.setClass()
  }

  componentDidUpdate = () => {
    this.setClass()
  }

  onPress = pos => {
    this.setState({ position: pos })
  }

  setClass = () => {
    const { panelTop, panelBottom } = this.props
    const { position } = this.state

    if (panelTop.current !== null)
      panelTop.current.className =
        position === 0
          ? styles.splitHide
          : position === 50
          ? styles.splitMiddle
          : styles.splitFull

    if (panelBottom.current !== null)
      panelBottom.current.className =
        position === 0
          ? styles.splitFull
          : position === 50
          ? styles.splitMiddle
          : styles.splitHide
  }

  render() {
    const { position } = this.state
    const { resizable } = this.props

    return (
      <div className={styles.splitter}>
        {position !== 0 && resizable && (
          <i
            className={'fa fa-chevron-up'}
            onClick={() => this.onPress(position !== 50 ? 50 : 0)}
          />
        )}
        {position === 50 && <span className={styles.separator} />}
        {position !== 100 && resizable && (
          <i
            className={'fa fa-chevron-down'}
            onClick={() => this.onPress(position !== 50 ? 50 : 100)}
          />
        )}
      </div>
    )
  }
}

export default Splitter
