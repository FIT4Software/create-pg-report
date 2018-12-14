import React, { Component } from 'react'
import DropDownOption from '../DropDownOption'
import styles from './styles.module.scss'
import { Icon } from 'react-fa'

class DropDownList extends Component {
  static defaultProps = {
    height: 'auto',
    width: '100%',
    placeholder: 'Select..',
    valueKey: 'value',
    labelKey: 'text',
    options: [],
    defaultItem: { text: 'Select', value: null }
  }

  constructor(props) {
    super(props)
    this.state = {
      list: false
    }
  }

  toggleList = () => {
    this.setState(prevState => {
      if (!prevState.list) {
        document.addEventListener('click', this.toggleList)
        document.addEventListener('scroll', this.forceRender, true)
      } else {
        document.removeEventListener('click', this.toggleList)
        document.removeEventListener('scroll', this.forceRender, true)
      }

      return { list: !this.state.list }
    })
  }

  getDescByValue = () => {
    const {
      options,
      value,
      valueKey,
      labelKey,
      defaultItem,
      placeholder
    } = this.props

    const option = options.find(option => option[valueKey] === value)
    return option
      ? option[labelKey]
      : defaultItem
        ? defaultItem[labelKey]
        : placeholder
  }

  forceRender = () => {
    this.setState({ state: this.state })
  }

  listStyles = () => {
    const { height, listOnTop } = this.props
    const { list } = this.state
    if (this.mainRef) {
      const bouding = this.mainRef.getBoundingClientRect()

      if (listOnTop) {
        return {
          height: !list ? 0 : height,
          left: bouding.left,
          width: bouding.width - 2,
          top: bouding.top - 59,
          display: 'flex',
          flexDirection: 'column-reverse',
          transform: 'translateY(-100%)'
        }
      }
      return {
        height: !list ? 0 : height,
        left: bouding.left,
        width: bouding.width - 2,
        top: bouding.top - 32
      }
    }
    return Object.assign(list ? { height } : {})
  }

  render() {
    const {
      width,
      value,
      options,
      valueKey,
      labelKey,
      onSelect,
      optionComponent,
      defaultItem,
      listOnTop
    } = this.props
    const { list } = this.state
    let stylesList = {
      width: width,
      minWidth: this.props.minWidth,
      maxWidth: this.props.maxWidth
    }
    return (
      <div
        className={styles.root}
        style={stylesList}
        ref={container => (this.mainRef = container)}
      >
        <div
          className={
            !list ? styles.button : `${styles.button} ${styles.active}`
          }
          onClick={this.toggleList}
        >
          <span>{this.getDescByValue()}</span>
          <Icon
            name="angle-down"
            className={
              !list ? styles['icon'] : [styles['icon'], styles.rotate].join(' ')
            }
          />
        </div>
        <ul
          className={
            !list
              ? styles.list
              : `${styles.list} ${styles.show} ${listOnTop ? styles.onTop : ''}`
          }
          style={this.listStyles()}
          ref={list => (this.listRef = list)}
        >
          {defaultItem && (
            <DropDownOption
              value={null}
              onClick={() => (onSelect ? onSelect(null) : null)}
            >
              {defaultItem[labelKey]}
            </DropDownOption>
          )}
          {options.map(option => (
            <DropDownOption
              value={option[valueKey]}
              onClick={() => (onSelect ? onSelect(option[valueKey]) : null)}
              className={option[valueKey] === value ? styles.active : ''}
              optionComponent={optionComponent}
              key={option[valueKey]}
            >
              {option[labelKey]}
            </DropDownOption>
          ))}
        </ul>
      </div>
    )
  }
}

export default DropDownList
