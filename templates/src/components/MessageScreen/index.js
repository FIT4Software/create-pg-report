import React from 'react'
import styles from './styles.module.scss'
import { Icon } from 'react-fa'
import logo from '../../resources/pglogo.png'

const MessageScreen = ({ show, text, type = 'loading' }) => {
  return (
    <div>
      {show && (
        <div className={`${styles['background']}`}>
          <div className={styles['content']}>
            <img src={logo} alt="PG Logo" />
            <div className={styles['text']}>
              {type === 'loading' && <Icon spin name="refresh" />}
              {type === 'error' && <Icon name="warning" />}
              {text}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageScreen
