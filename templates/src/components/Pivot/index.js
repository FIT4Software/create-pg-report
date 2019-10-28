import React, { Component } from 'react'
import PivotGrid, {
  FieldChooser,
  FieldPanel,
  Export,
  Scrolling,
  LoadPanel
} from 'devextreme-react/ui/pivot-grid'
import Chart, {
  CommonSeriesSettings,
  Size,
  Tooltip,
  ArgumentAxis,
  LoadingIndicator
} from 'devextreme-react/chart'
import styles from './styles.module.scss'

class Pivot extends Component {
  constructor(props) {
    super(props)
    this._chart = React.createRef()
    this._pivotGrid = React.createRef()
    this.state = {
      isRendered: false
    }
  }

  componentDidMount = () => {
    this._pivotGrid.current.instance.bindChart(this._chart.current.instance, {
      dataFieldsDisplayMode: 'splitPanes',
      putDataFieldsInto: 'series',
      alternateDataFields: false,
      forceUpdate: true,
      inverted: true
    })

    window.addEventListener('resize', () => this.updateDimensions())
  }

  updateDimensions = () => {
    // this.forceUpdate()
    this._chart.current.instance.option('size.width', window.innerWidth - 20)
    this._chart.current.instance.render()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.updateDimensions) return true
    else if (nextProps.active && !this.state.isRendered) {
      this.setState({ isRendered: true })
      return true
    } else return false
  }

  render = () => {
    const { fields, store, generic } = this.props

    return (
      <div id={generic ? 'generic-pivot' : ''} className={styles.container}>
        <div className={styles.chart}>
          <Chart ref={this._chart} onIncidentOccurred={null}>
            <Size height={250} />
            <Tooltip
              enabled={true}
              customizeTooltip={arg => customizeTooltip(arg, generic)}
            />
            <CommonSeriesSettings type={'bar'} />
            <LoadingIndicator enabled={true} />
            <ArgumentAxis
              label={{
                displayMode: 'standard',
                overlappingBehavior: 'none',
                textOverflow: 'ellipsis',
                customizeText: item => {
                  if (!generic) return item.valueText
                  else {
                    let text = item.valueText.split('/')
                    return text[1] + '\n' + text[0]
                  }
                }
              }}
            />
          </Chart>
        </div>

        <PivotGrid
          ref={this._pivotGrid}
          allowSortingBySummary={true}
          allowFiltering={true}
          allowSorting={true}
          allowExpandAll={false}
          wordWrapEnabled={false}
          dataSource={{
            fields,
            store
          }}
        >
          <FieldPanel
            visible={true}
            allowFieldDragging={false}
            allowExpandAll={false}
          />
          <Scrolling mode={'virtual'} />
          <Export enabled={true} />
          <LoadPanel enabled={false} />
          <FieldChooser enabled={false} />
        </PivotGrid>
      </div>
    )
  }
}

function customizeTooltip(args, generic) {
  let html = ''
  let valueText = parseFloat(args.originalValue)
  valueText = Number.isInteger(valueText) ? valueText : valueText.toFixed(2)

  const { argumentText, seriesName } = args

  if (generic) {
    let [subtitle, title] = argumentText.split('/')
    html = `${title}<br />${subtitle}<br /><b>Total ${valueText}</b>`
  } else
    html = `${seriesName}<br />${argumentText}<br /><b>Total ${valueText}</b>`

  return {
    html
  }
}

export default Pivot
