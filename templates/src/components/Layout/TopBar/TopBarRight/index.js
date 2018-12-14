import React, { Component } from 'react';

import styles from './styles.module.scss';

export default class TopBarRight extends Component {
  render() {
    let newContainer = React.Children.map(
      this.props.children,
      (child, index) => {
        return React.cloneElement(child, {
          state: 'right'
        });
      }
    );

    return <div className={styles.container}>{newContainer}</div>;
  }
}
