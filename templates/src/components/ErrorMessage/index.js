import React from 'react'
import styles from './styles.module.scss'
import { Icon } from 'react-fa'
import Button from './../Button'

const ErrorMessage = ({
  t,
  onFilterBtnClick,
  messageList,
  title = '',
  icon = 'exclamation-triangle'
}) => {
  if (messageList.length === 1 && title === '')
    return (
      <div className={styles.root}>
        <div>
          <Icon name={icon} /> {messageList[0]}
        </div>
      </div>
    )
  return (
    <div className={styles.root}>
      {title && (
        <div>
          <Icon name={icon} /> {title}
          <br />
          <br />
        </div>
      )}

      {messageList &&
        messageList.map(message => (
          <span key={message} className={styles.message}>
            {message}
          </span>
        ))}
      <br />
      <Button text={t('Back to filters')} onClick={onFilterBtnClick} />
    </div>
  )
}

export default ErrorMessage
