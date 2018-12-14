import React, { Component } from 'react'
import styles from './styles.module.scss'
export default class ButtonSwitch extends Component {
  onClick = event => {
    this.props.onPress(this)
  }

  onChange = event => {
    this.props.onChange(event)
  }

  createStyles = () => {
    let names = [styles.component]
    if (this.props.disabled) {
      names.push(styles.disabled)
    }
    if (this.props.checked) names.push(styles.active)
    if (this.props.class) names.push(this.props.class)
    return names.join(' ')
  }

  render() {
    return (
      <div>
        <input
          // id={this.props.id}
          name={this.props.name}
          className={styles.hide}
          type="radio"
          value={this.props.value}
          checked={this.props.checked === this.props.value ? 'checked' : ''}
          onChange={this.onChange}
        />
        <span className={this.createStyles()} onClick={this.onClick}>
          {this.props.text}
        </span>
      </div>
    )
  }
}
