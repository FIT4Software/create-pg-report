import React, { PureComponent } from 'react'
import styles from './styles.module.scss'
import { animateScrollLeft } from '../../../services/helpers'
import { Icon } from 'react-fa'

export default class TabsList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      step: 300,
      backBtn: false,
      forwardBtn: true
    }
  }

  static defaultProps = {
    showActionButtons: true
  }

  componentDidMount() {
    this.handleScrollButtons()

    window.addEventListener('resize', () => {
      this.handleScrollButtons()
    })
  }

  onForwardClick = () => {
    animateScrollLeft(
      this.containerElement,
      this.containerElement.scrollLeft + this.state.step,
      this.handleScrollButtons
    )
  }

  onBackClick = () => {
    animateScrollLeft(
      this.containerElement,
      this.containerElement.scrollLeft - this.state.step,
      this.handleScrollButtons
    )
  }

  handleScrollButtons = () => {
    if (this.containerElement !== null) {
      const { scrollWidth, clientWidth, scrollLeft } = this.containerElement

      this.setState({
        forwardBtn: scrollWidth > clientWidth + scrollLeft,
        backBtn: !(scrollLeft <= 0)
      })
    }
  }

  setTabVisible = tabRef => {
    const bounding = tabRef.getBoundingClientRect()
    const containerBounding = this.containerElement.getBoundingClientRect()

    if (bounding.right > containerBounding.right) {
      this.containerElement.scrollLeft +=
        bounding.right - containerBounding.right
    } else if (bounding.left < containerBounding.left) {
      this.containerElement.scrollLeft -= containerBounding.left - bounding.left
    }
    this.handleScrollButtons()
  }

  render() {
    const { activeTab, showActionButtons, className } = this.props
    const { backBtn, forwardBtn } = this.state

    let newTabList = React.Children.map(this.props.children, (child, index) => {
      let active = activeTab === index
      return React.cloneElement(child, {
        active,
        ref: node => (this._input = node),
        onTabClick: ref => {
          this.setTabVisible(ref)
          this.props.onTabClick(index)
        }
      })
    })

    return (
      <div className={styles.container + ' ' + className}>
        {showActionButtons && (
          <div className={styles.icon}>
            {backBtn && (
              <Icon
                name={backBtn ? 'angle-left' : ''}
                onClick={this.onBackClick}
              />
            )}
          </div>
        )}
        <div className={styles.list} ref={div => (this.containerElement = div)}>
          {newTabList}
        </div>
        {showActionButtons && (
          <div className={styles.icon}>
            {forwardBtn && (
              <Icon name="angle-right" onClick={this.onForwardClick} />
            )}
          </div>
        )}
      </div>
    )
  }
}
