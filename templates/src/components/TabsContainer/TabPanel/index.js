import React from 'react'
import styles from './styles.module.scss'

const TabPanel = props => {
  return (
    <div
      className={
        props.active
          ? styles.container + ' ' + styles.active + ' ' + props.class
          : styles.container + ' ' + props.class
      }
    >
      {React.cloneElement(props.children, { active: props.active })}
    </div>
  )
}

export default TabPanel
