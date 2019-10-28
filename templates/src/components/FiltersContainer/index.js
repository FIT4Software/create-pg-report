import React, { PureComponent } from 'react'
import styles from './styles.module.scss'
class FiltersContainer extends PureComponent {
  render() {
    const { open, children } = this.props
    return (
      <div
        className={!open ? [styles.root, styles.hide].join(' ') : styles.root}
      >
        {children}
      </div>
    )
  }
}

export default FiltersContainer
