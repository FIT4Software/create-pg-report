import React from 'react'
import styles from './styles.module.scss'
import { Icon } from 'react-fa'

const DropDownMultiValue = ({ text, onRemove }) => {
  return (
    <div className={styles.root}>
      <div className={styles.text}>{text}</div>{' '}
      <Icon name="times" onClick={onRemove} />
    </div>
  )
}

export default DropDownMultiValue
