import React from 'react'
import styles from './styles.module.scss'

const TabPanel = props => {
  return (
    <div
      className={
        props.active ? styles.container + ' ' + styles.active : styles.container
      }
    >
      {React.cloneElement(props.children, { active: props.active })}
    </div>
  )
}

export default TabPanel
