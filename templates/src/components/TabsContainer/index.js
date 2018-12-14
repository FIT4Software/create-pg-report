import React, { PureComponent } from 'react'
import TabPanel from './TabPanel'
import TabsContent from './TabsContent'
import TabsList from './TabsList'
import Tab from './Tab'

export { TabPanel, TabsContent, TabsList, Tab }

export default class TabsContainer extends PureComponent {
  render() {
    const { activeTab, onTabChange } = this.props
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

    return <div>{newTabList}</div>
  }
}
