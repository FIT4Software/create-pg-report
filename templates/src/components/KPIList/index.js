import React, { Component } from 'react'
import styles from './styles.module.scss'
import KPIOption from './KPIOption'
import Icon from 'react-fa'

class KPIList extends Component {
  render() {
    const { data, showLoading, t, onClick, selectedKPI } = this.props

    return (
      <div className={styles['kpi-list-container']}>
        {showLoading && (
          <div className={styles.loading}>
            <Icon name="refresh" spin />
          </div>
        )}
        {!showLoading && (
          <div className={styles.KPIList}>
            {data &&
              data.map((v, k) => {
                return (
                  <KPIOption
                    label={t(v.label)}
                    value={v.value}
                    key={k}
                    selected={v.label === selectedKPI}
                    onClick={() => (onClick ? onClick(v) : null)}
                  />
                )
              })}
          </div>
        )}
      </div>
    )
  }
}
export default KPIList
