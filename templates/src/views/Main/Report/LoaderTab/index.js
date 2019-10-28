import React from 'react'
import styles from './styles.module.scss'
import { Icon } from 'react-fa'
import logo from '../../../../resources/pglogoBlack.svg'

const Loader = ({ show, text }) => {
  return (
    <div className={styles.container}>
      {show && (
        <div className={`${styles['background']}`}>
          <div className={styles['content']}>
            <img src={logo} alt="PG Logo" />
            <div className={styles['text']}>
              <Icon spin name="refresh" />
              {text}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Loader
