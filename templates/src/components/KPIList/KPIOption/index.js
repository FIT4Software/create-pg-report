import React, { Component } from 'react'
import Icon from 'react-fa'
import styles from './styles.module.scss'

let timer

class KPIOption extends Component {
  constructor(props) {
    super(props)
    this.kpi = React.createRef()
    this.state = {
      tooltipKpi: ''
    }
  }

  handleMouseEnter = e => {
    let kpi = this.kpi.current.attributes['kpi-name'].value
    timer = setTimeout(() => {
      this.setState(
        {
          tooltipKpi: kpi
        },
        () => clearTimeout(timer)
      )
    }, 2000)
  }

  handleMouseLeave = e => {
    clearTimeout(timer)
    if (this.state.tooltipKpi !== '')
      this.setState({ tooltipKpi: '' }, clearTimeout(timer))
  }

  getLeftPosition = () => {
    let tooltipMinSize = 250
    return (
      (this.kpi.current.clientWidth - tooltipMinSize) / 2 +
      this.kpi.current.offsetLeft
    )
  }

  render() {
    const {
      t,
      kpi,
      label,
      value,
      onClick,
      selected,
      showTooltip,
      tooltip,
      name
    } = this.props
    return (
      <article
        data-id={name}
        ref={this.kpi}
        kpi-name={kpi}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={`${styles['kpi-option']} ${
          selected === true ? styles.selected : null
        }`}
        onClick={onClick}
      >
        <Icon name="thumb-tack" />
        <h3>{label}</h3>
        <h1>{value}</h1>
        {showTooltip && kpi === this.state.tooltipKpi && (
          <div
            style={{
              left: this.getLeftPosition()
            }}
            kpi-tooltip={kpi}
            className={styles.tooltip}
          >
            <label>
              <b>{t('KPI')} </b>
              {tooltip.kpi}
            </label>
            <br />
            <label>
              <b>{t('Unit')} </b>
              {tooltip.unit}
            </label>
            <br />
            <label>
              <b>{t('Machine')} </b>
              {tooltip.machine}
            </label>
            <br />
            <label>
              <b>{t('MachineTotal')} </b>
              {tooltip.machineTotal}
            </label>
          </div>
        )}
      </article>
    )
  }
}

export default KPIOption
