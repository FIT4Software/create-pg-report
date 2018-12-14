import React, { Component } from 'react'
import styles from './styles.module.scss'
import { Icon } from 'react-fa'

class Panel extends Component {
  constructor(props) {
    super(props)
    this.state = { open: true }
  }

  handleExpandCollapse = () => {
    this.setState({
      open: !this.state.open
    })
  }

  static defaultProps = {
    borderBottom: true,
    borderTop: true
  }

  getContentBorderClass = () => {
    const { borderBottom, borderTop } = this.props
    let classes = []
    if (borderBottom) classes.push(styles['border-bottom'])
    if (borderTop) classes.push(styles['border-top'])

    return classes.join(' ')
  }

  render() {
    const { children, icon, title, paddingTop, paddingBottom } = this.props
    const { open } = this.state
    return (
      <div className={styles.panel} style={{ paddingBottom, paddingTop }}>
        <div className={this.getContentBorderClass()}>
          <header>
            <h1>
              <Icon name={icon ? icon : 'industry'} /> {title}
            </h1>
            <Icon
              name={'angle-up'}
              className={
                open
                  ? styles['expand-icon']
                  : [styles['expand-icon'], styles.rotate].join(' ')
              }
              onClick={this.handleExpandCollapse}
            />
          </header>
          <section className={!open ? styles.hide : ''}>{children}</section>
        </div>
      </div>
    )
  }
}

export default Panel
