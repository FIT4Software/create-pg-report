import React, { Component } from 'react'
import DropDownOption from '../DropDownOption'
import MultiValue from './MultiValue'
import styles from './styles.module.scss'
import { Icon } from 'react-fa'

class MultiSelectList extends Component {
  static defaultProps = {
    height: 'auto',
    width: '100%',
    placeholder: 'Select..',
    valueKey: 'value',
    labelKey: 'text',
    options: [],
    value: []
  }

  constructor(props) {
    super(props)
    this.state = {
      list: false,
      filter: ''
    }
  }

  toggleList = () => {
    this.setState(prevState => {
      if (!prevState.list) {
        document.addEventListener('focus', this.toggleList)
        document.addEventListener('click', this.toggleList)
        document.addEventListener('scroll', this.forceRender, true)
      } else {
        document.removeEventListener('focus', this.toggleList)
        document.removeEventListener('click', this.toggleList)
        document.removeEventListener('scroll', this.forceRender, true)
      }

      return { list: !prevState.list }
    })
  }

  forceRender = () => {
    this.setState({ state: this.state })
  }

  listStyles = () => {
    const { height } = this.props
    const { list } = this.state

    if (this.mainRef) {
      const bounding = this.mainRef.getBoundingClientRect()
      let setHeight = 'auto'

      if (
        this.mainRef.lastElementChild.children[0].childNodes.length * 26 >
        document.documentElement.offsetHeight -
          (bounding.y + bounding.height + 15)
      ) {
        setHeight =
          document.documentElement.offsetHeight -
          (bounding.y + bounding.height + 15)
      }

      return {
        height: !list ? 0 : setHeight,
        left: bounding.left,
        width: bounding.width - 2,
        top: bounding.top + this.button.clientHeight - 48,
        margin: 0
      }
    }
    return Object.assign(list ? { height } : {})
  }

  getMultiSelected = () => {
    const { options, value, valueKey, labelKey } = this.props

    let arrayValues =
      !Array.isArray(value) && value
        ? [value]
        : Array.isArray(value)
        ? value
        : []

    if (arrayValues.length > 0) {
      return arrayValues.map(optionValue => {
        const option = options.find(option => option[valueKey] === optionValue)

        return option ? (
          <MultiValue
            text={option[labelKey]}
            key={optionValue}
            onRemove={e => this.onRemoveMultiValue(e, optionValue)}
          />
        ) : null
      })
    } else {
      return ''
    }
  }

  onChange = selectedVal => {
    const { onChange, value, dataFrom } = this.props
    if (onChange) {
      let selectedValues = value
      if (selectedValues && Array.isArray(selectedValues))
        selectedValues.push(selectedVal)
      else if (selectedValues) selectedValues = [selectedValues, selectedVal]

      onChange(selectedValues, dataFrom)

      this.setState({ filter: '' })
    }
  }

  onKeyDown = event => {
    const { value, valueKey } = this.props
    const { filter } = this.state

    switch (event.keyCode) {
      case 8:
        if (value.length !== 0 && filter === '') {
          let optionValue = value[value.length - 1]
          this.onRemoveMultiValue(event, optionValue)
        }
        break
      case 9:
        if (this.getOptions().length === 1) {
          event.preventDefault()
          event.stopPropagation()

          this.onChange(this.getOptions()[0][valueKey])
        }
        break
      case 27:
        this.toggleList()
        break
      default:
        break
    }
    // if (this.state.filter !== '' && event.keyCode !== 27) {
    //   this.setState({
    //     list: true
    //   })
    // }
  }

  onRemoveMultiValue = (event, valueRemoved) => {
    const { value, onChange, dataFrom } = this.props

    if (onChange) {
      const selected = value.filter(val => val !== valueRemoved)
      onChange(selected, dataFrom)
    }
    event.preventDefault()
    event.stopPropagation()
  }

  getOptions = () => {
    const { options, value, valueKey, labelKey } = this.props
    let { filter } = this.state
    return options
      .filter(option => !value.includes(option[valueKey]))
      .filter(option =>
        option[labelKey].toLowerCase().includes(filter.toLowerCase())
      )
  }

  inputChange = event => {
    const value = event.target.value
    this.setState({
      filter: value,
      list: value !== ''
    })
  }

  render() {
    const {
      width,
      value,
      valueKey,
      labelKey,
      onChange,
      optionComponent,
      placeholder
    } = this.props
    const { list, filter } = this.state
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
          ref={btn => (this.button = btn)}
        >
          <div className={styles.selected}>
            {this.getMultiSelected()}

            <input
              type="text"
              placeholder={value.length > 0 ? '' : placeholder}
              onChange={this.inputChange}
              value={filter}
              onKeyDown={this.onKeyDown}
            />
          </div>

          <Icon
            name="angle-down"
            className={
              !list ? styles['icon'] : [styles['icon'], styles.rotate].join(' ')
            }
          />
        </div>
        <div>
          <ul
            className={!list ? styles.list : `${styles.list} ${styles.show}`}
            style={this.listStyles()}
          >
            {this.getOptions().map(option => (
              <DropDownOption
                value={option[valueKey]}
                onClick={() =>
                  onChange ? this.onChange(option[valueKey]) : null
                }
                className={option[valueKey] === value ? styles.active : ''}
                optionComponent={optionComponent}
                key={option[valueKey]}
              >
                {option[labelKey]}
              </DropDownOption>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MultiSelectList
