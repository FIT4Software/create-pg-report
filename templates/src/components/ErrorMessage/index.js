import React from 'react'
import styles from './styles.module.scss'
import { Icon } from 'react-fa'

const ErrorMessage = ({
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
    </div>
  )
}

export default ErrorMessage
