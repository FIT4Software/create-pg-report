import React, { PureComponent } from 'react'
import styles from './styles.module.scss'

export default class TabsContent extends PureComponent {
  render() {
    const { activeTab, children, className } = this.props
    let newTabContent = React.Children.map(children, (child, index) => {
      let active = activeTab === index
      if (child)
        return React.cloneElement(child, {
          active: active,
          id: 'tabContent-' + index
        })
    })

    return (
      <div className={styles.container + ' ' + className}>{newTabContent}</div>
    )
  }
}
