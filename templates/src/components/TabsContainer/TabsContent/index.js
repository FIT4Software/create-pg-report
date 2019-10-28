import React, { PureComponent } from "react";
import styles from "./styles.module.scss";

export default class TabsContent extends PureComponent {
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps.filters !== this.props.filters);
  //   if (
  //     nextProps.filters !== this.props.filters ||
  //     nextProps.activeTab !== this.props.activeTab
  //   )
  //     true;
  //   return false;
  // }
  render() {
    const { activeTab, children } = this.props;

    let newTabContent = React.Children.map(children, (child, index) => {
      let active = activeTab === index ? 1 : 0;

      return React.cloneElement(child, { active, id: "tabContent-" + index });
    });

    return (
      <div className={styles.container + " " + this.props.class}>
        {newTabContent}
      </div>
    );
  }
}
