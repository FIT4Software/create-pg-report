import React, { Component } from "react";
import styles from "./styles.module.scss";
export default class ButtonGroup extends Component {
  createStyles = () => {
    let names = [styles.component];
    if (this.props.visible === false) {
      names.push(styles.hide);
    }
    if (this.props.class) names.push(this.props.class);

    return names.join(" ");
  };
  render() {
    return <div className={this.createStyles()}>{this.props.children}</div>;
  }
}
