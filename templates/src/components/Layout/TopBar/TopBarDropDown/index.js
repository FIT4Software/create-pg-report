import React, { Component } from 'react'
import styles from './styles.module.scss'

class TopBarDropDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  static defaultProps = {
    options: [],
    fieldValue: 'value',
    fieldDesc: 'text'
  }

  toogle = () => {
    this.setState(prevState => {
      if (!prevState.open) {
        document.addEventListener('click', this.toogle)
      } else {
        document.removeEventListener('click', this.toogle)
      }

      return { open: !prevState.open }
    })
  }

  render() {
    const {
      title,
      icon,
      options,
      fieldDesc,
      fieldValue,
      onOptionClick,
      right
    } = this.props
    const { open } = this.state

    return (
      <div
        className={!open ? styles.root : [styles.root, styles.active].join(' ')}
        onClick={this.toogle}
      >
        <span>
          {icon && <i className={icon + ' icon'} />}
          <span>
            {!icon ? ' ' : ''}
            {title}
          </span>{' '}
          <i className="fa fa-caret-down" />
        </span>
        <ul
          className={open ? styles.open : ''}
          style={right ? { right: 0 } : { left: 0 }}
        >
          {options.map(option => (
            <li key={option[fieldValue]}>
              <span
                onClick={() => (onOptionClick ? onOptionClick(option) : null)}
              >
                {option[fieldDesc]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default TopBarDropDown
