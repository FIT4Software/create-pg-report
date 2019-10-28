import React, { PureComponent } from 'react'
import TabPanel from './TabPanel'
import TabsContent from './TabsContent'
import TabsList from './TabsList'
import Tab from './Tab'

export { TabPanel, TabsContent, TabsList, Tab }

export default class TabsContainer extends PureComponent {
  render() {
    const { isChild = false, activeTab, onTabChange } = this.props
    let newTabList = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        activeTab: activeTab,
        onTabClick: tabIndex => {
          if (onTabChange) {
            onTabChange(tabIndex)
          }
        }
      })
    })

    let style = { overflow: 'hidden', display: 'flex' }
    style = Object.assign(
      {},
      style,
      !isChild
        ? { height: '100%' }
        : {
            height: 'calc(100% - 16px)',
            width: 'calc(100% - 16px)',
            margin: '8px'
          }
    )

    return <div style={style}>{newTabList}</div>
  }
}
