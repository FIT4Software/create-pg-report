import React, { Component } from 'react'
import Icon from 'react-fa'
import styles from './styles.module.scss'

class KPIOption extends Component {
  render() {
    const { label, value, onClick, selected } = this.props
    return (
      <article
        className={`${styles['kpi-option']} ${
          selected === true ? styles.selected : null
        }`}
        onClick={onClick}
      >
        <Icon name="thumb-tack" />
        <h3>{label}</h3>
        <h1>{value}</h1>
      </article>
    )
  }
}

export default KPIOption
