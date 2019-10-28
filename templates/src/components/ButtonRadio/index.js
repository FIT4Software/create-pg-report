import React, { PureComponent } from "react";
import styles from "./styles.module.scss";
export default class ButtonSwitch extends PureComponent {
  onClick = () => {
    this.props.onPress(this)
  };

  onChange = event => {
    this.props.onChange(event)
  };

  createStyles = () => {
    console.log(this.props.disable)
    let names = [styles.component]
    if (this.props.disable) {
      names.push(styles.disable)
    }
    if (this.props.checked === this.props.value) names.push(styles.active)
    if (this.props.classes) names.push(this.props.classes)
    return names.join(' ')
  }

  render() {
    return (
      <div className={this.props.classContainer}>
        <input
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
