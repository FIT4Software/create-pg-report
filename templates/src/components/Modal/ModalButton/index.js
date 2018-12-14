import React, { Component } from 'react'
import styles from './styles.module.scss'
import { Icon } from 'react-fa'

class ModalButton extends Component {
  render() {
    const {
      typeButton,
      typeOnHover,
      disabled,
      disableShadow,
      onClick,
      icon
    } = this.props
    return (
      <button
        onClick={onClick}
        className={`${styles.ModalButton} ${
          typeButton ? styles[typeButton] : ''
        } 
        ${typeOnHover ? styles['hover-' + typeOnHover] : ''}
        ${disableShadow ? styles['without-shadow'] : ''}
        ${disabled ? styles.disabled : ''}`}
      >
        {icon && <Icon name={icon} />}
        {this.props.children}
      </button>
    )
  }
}

export default ModalButton
