import React, { Component } from 'react'
import styles from './styles.module.scss'

export default class Tab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: props.active
    }
  }

  handlerClick = () => {
    const { onTabClick, onClick } = this.props
    onTabClick(this.tab)
    if (onClick) onClick()
  }

  render() {
    const { className } = this.props
    return (
      <div
        ref={tab => (this.tab = tab)}
        className={
          this.props.active
            ? styles.container + ' ' + className + ' ' + styles.active
            : styles.container
        }
        onClick={this.handlerClick}
      >
        {this.props.children}
      </div>
    )
  }
}
