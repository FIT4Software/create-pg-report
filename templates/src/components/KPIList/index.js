import React, { Component } from 'react'
import styles from './styles.module.scss'
import KPIOption from './KPIOption'
import Icon from 'react-fa'
import Sortable from 'react-sortablejs'

class KPIList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCollapse: true,
      selectedKpi: '',
      kpiOrder:
        localStorage.getItem('iods-centerline-kpi-order') !== null
          ? localStorage.getItem('iods-centerline-kpi-order').split(',')
          : Object.keys(this.props.data)
    }
  }

  componentDidMount = () => {
    this.setState({ isCollapse: this.props.isCollapse })
  }

  onCollapseKpi = () => {
    this.setState({ isCollapse: !this.state.isCollapse })
  }

  onTouch = kpi => {
    this.setState(
      {
        selectedKpi: this.state.selectedKpi === kpi ? '' : kpi
      },
      () => this.props.onClick(kpi)
    )
  }

  render() {
    const {
      data,
      showLoading,
      t,
      onClick,
      showCollapseButton,
      showTooltip,
      tooltipList
    } = this.props
    const { isCollapse, selectedKpi } = this.state

    const kpis = this.state.kpiOrder.map(kpi => {
      return (
        <KPIOption
          t={t}
          name={kpi}
          label={t(kpi)}
          value={data[kpi]}
          key={kpi}
          kpi={kpi}
          selected={kpi === selectedKpi}
          onClick={() => (onClick ? this.onTouch(kpi) : null)}
          showTooltip={showTooltip}
          tooltip={{
            kpi: tooltipList[kpi].KPI,
            unit: tooltipList[kpi].Unit,
            machine: tooltipList[kpi].Machine,
            machineTotal: tooltipList[kpi].MachineTotal
          }}
        />
      )
    })

    return (
      <div className={styles['kpi-list-container']}>
        {showLoading && (
          <div className={styles.loading}>
            <Icon name="refresh" spin />
          </div>
        )}
        {!showLoading && (
          <div style={{ height: '100%' }}>
            {showCollapseButton && (
              <i
                className={
                  'fa fa-chevron-' +
                  (isCollapse ? 'down ' : 'up ') +
                  styles.kpiCollapse
                }
                onClick={this.onCollapseKpi}
              />
            )}
            <div style={{ height: isCollapse ? '74px' : 'auto' }}>
              {kpis && (
                <Sortable
                  className={styles.KPIList}
                  onChange={(order, sortable, evt) => {
                    localStorage.setItem('iods-centerline-kpi-order', order)
                    this.setState({ kpiOrder: order })
                  }}
                >
                  {kpis}
                </Sortable>
              )}
            </div>
            <hr className={styles.separator} />
          </div>
        )}
      </div>
    )
  }
}
export default KPIList
