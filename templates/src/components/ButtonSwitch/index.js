import React, { Component } from "react";
import styles from "./styles.module.scss";
export default class ButtonSwitch extends Component {
  onClick = () => {
    this.props.onPress(this);
  };

  onChange = () => {
    this.props.onChange(this);
  };

  createStyles = () => {
    let names = [styles.component];
    if (this.props.disabled) {
      names.push(styles.disabled);
    }
    if (this.props.checked) names.push(styles.active);
    if (this.props.class) names.push(this.props.class);
    return names.join(" ");
  };

  render() {
    const { checked } = this.props;

    return (
      <div>
        <input
          // id={this.props.id}
          name={this.props.id}
          className={styles.hide}
          type="checkbox"
          checked={checked ? "checked" : ""}
          onChange={this.onChange}
        />
        <span className={this.createStyles()} onClick={this.onClick}>
          {this.props.text}
        </span>
      </div>
    );
  }
}
