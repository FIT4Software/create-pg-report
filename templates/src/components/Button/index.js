import React, { Component } from 'react'
import styles from './styles.module.scss'
import { Icon } from 'react-fa'

export default class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      text: ''
    }
  }
  createStyles = () => {
    let names = [styles.component]
    if (this.props.disabled) {
      names.push(styles.disabled)
    }
    if (this.props.primary) names.push(styles.primary)
    return names.join(' ')
  }

  componentDidMount = () => {
    this.setState({
      loading: this.props['style-type'] === 'loading' ? true : false,
      text: this.props.text ? this.props.text : false
    })
  }

  static getDerivedStateFromProps(props) {
    return {
      text: props.text || ''
    }
  }

  render() {
    return (
      <button
        onClick={this.props.onClick}
        className={this.createStyles()}
        type={this.props.type || 'button'}
        disabled={this.props.disabled ? 'disabled' : ''}
      >
        {this.state.loading ? (
          <Icon spin name="refresh" />
        ) : this.props.icon ? (
          <Icon name={this.props.icon} />
        ) : (
          ''
        )}
        {this.state.text ? (
          <span className={styles.title}>{this.state.text}</span>
        ) : (
          ''
        )}
      </button>
    )
  }
}
