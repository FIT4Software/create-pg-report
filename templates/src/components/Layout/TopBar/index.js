import React, { Component } from 'react'
import TopBarLeft from './TopBarLeft'
import TopBarRight from './TopBarRight'
import TopBarCenter from './TopBarCenter'
import TopBarButton from './TopBarButton'
import TopBarDropDown from './TopBarDropDown'

//assets
import styles from './styles.module.scss'

class TopBar extends Component {
  render() {
    let newContainer = React.Children.map(
      this.props.children,
      (child, index) => {
        if (child) {
          return React.cloneElement(child, {
            state: 'main'
          })
        }
      }
    )

    return <div className={styles.topbar}>{newContainer}</div>
  }
}

export { TopBarCenter, TopBarLeft, TopBarRight, TopBarButton, TopBarDropDown }

export default TopBar
