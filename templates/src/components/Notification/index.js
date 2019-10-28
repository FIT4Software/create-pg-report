import React, { Component } from "react";
import styles from "./styles.module.scss";
import { Icon } from "react-fa";
import { showMsg } from "../../services/notification";

const defaultTimeOut = 5000;

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  createStyles = () => {
    let names = [styles.component];

    switch (this.props.type) {
      case "success":
        names.push(styles.success);
        break;
      case "error":
        names.push(styles.error);
        break;
      case "info":
        names.push(styles.info);
        break;
      case "warning":
        names.push(styles.warning);
        break;
      default:
        names.push(styles.info);
        break;
    }

    switch (this.props.position) {
      case "topLeft":
        names.push(styles.topLeft);
        break;
      case "topRight":
        names.push(styles.topRight);
        break;
      case "bottomLeft":
        names.push(styles.bottomLeft);
        break;
      case "bottomRigth":
        names.push(styles.bottomRigth);
        break;
      default:
        names.push(styles.topRight);
        break;
    }

    if (this.props.class) names.push(this.props.class);

    return names.join(" ");
  };

  timer = () =>
    setTimeout(() => {
      this.clearNotification();
    }, this.props.timeout ? this.props.timeout : defaultTimeOut);

  clearNotification = () => {
    showMsg({
      type: "",
      icon: "",
      message: "",
      title: "",
      position: "",
      closable: true,
      show: false
    });
  };
  handlerClose = () => {
    this.clearNotification();
    clearTimeout(this.timeoutID);
  };

  static getDerivedStateFromProps(nextProps) {
    return {
      show: nextProps.show
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.show === this.props.show) {
      return false;
    } else {
      return true;
    }
  }
  componentDidUpdate() {
    if (this.state.show) {
      this.timeoutID = this.timer();
    } else {
      clearTimeout(this.timeoutID);
    }
  }

  render() {
    return (
      this.state.show && (
        <div className={this.createStyles()} onClick={this.props.onClick}>
          {this.props.icon ? (
            <span className={styles.icon}>
              <Icon name={this.props.icon} />
            </span>
          ) : (
            ""
          )}
          <span className={styles.title}>{this.props.title}</span>
          <br />
          <span>{this.props.message}</span>
          {this.props.closable ? (
            <span className={styles.close} onClick={this.handlerClose}>
              <Icon name="close" />
            </span>
          ) : (
            ""
          )}
        </div>
      )
    );
  }
}
