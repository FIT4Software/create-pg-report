import React, { PureComponent } from 'react'
import styles from './styles.module.scss'

class TopBarDropDown extends PureComponent {
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
        <div>
          {icon && <i className={icon + ' icon'} />}
          <span>
            {!icon ? ' ' : ''}
            {title}
          </span>{' '}
          <i className="fa fa-caret-down" />
        </div>
        <ul
          className={open ? styles.open : ''}
          style={right ? { right: 0 } : { left: 0 }}
        >
          {options.map(option => (
            <li key={option[fieldValue]}>
              <div
                onClick={() => (onOptionClick ? onOptionClick(option) : null)}
              >
                <span>{option[fieldDesc]}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default TopBarDropDown
