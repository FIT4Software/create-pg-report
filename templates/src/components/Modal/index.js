import React from 'react'
import styles from './styles.module.scss'
import { Icon } from 'react-fa'

const Modal = ({
  show,
  children,
  onClose,
  title,
  iconTitle,
  buttons,
  extraStyles
}) => {
  const showHideClassName = show
    ? `${styles.modal} ${styles['block']}`
    : `${styles.modal} ${styles['none']}`

  const extraCSS = extraStyles ? extraStyles : null
  return (
    <div className={showHideClassName}>
      <div className={styles['modal-main']} style={extraCSS}>
        {title && (
          <div className={styles.title}>
            {iconTitle && <Icon name={iconTitle} />}
            {title}
          </div>
        )}
        {children}
        {buttons && <div className={styles.buttons}>{buttons}</div>}
      </div>
    </div>
  )
}

export default Modal
