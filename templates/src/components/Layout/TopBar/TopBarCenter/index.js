import React, { PureComponent } from "react";

import styles from "./styles.module.scss";

export default class TopBarCenter extends PureComponent {
  render() {
    let newContainer = React.Children.map(
      this.props.children,
      (child, index) => {
        return React.cloneElement(child, {
          state: "center"
        });
      }
    );

    return <div className={styles.container}>{newContainer}</div>;
  }
}
