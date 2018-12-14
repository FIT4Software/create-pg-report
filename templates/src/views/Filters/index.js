import React, { PureComponent } from 'react'
import styles from './styles.module.scss'
import Button from '../../components/Button'
import Panel from '../../components/Panel'
import PlantModelSelector from './PlantModelSelector'
import MultiSelect from '../../components/MultiSelect'
import Definitions from './Definitions'
import {
  setSelectedFilters,
  getDefaultFilters,
  onFiltersChange,
  getSelectedFilters,
  getLineStatus
} from '../../services/filters'

const defaultFilters = getDefaultFilters()

class Filters extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...defaultFilters,
      lineStatusList: []
    }
  }

  componentDidMount() {
    this.readLineStatus()
    onFiltersChange().subscribe(({ timeOption }) => {
      this.setState({ timeOption })
    })
  }

  onPlantModelChange = plantModel => {
    this.setState({ plantModel }, () => {
      setSelectedFilters(this.state)
    })
  }

  onSelectDefinition = definition => {
    const filters = JSON.parse(definition)

    if (filters)
      this.setState(
        {
          ...this.state,
          ...filters
        },
        () => {
          setSelectedFilters(this.state)
          if (this.props.onRunDefinition) this.props.onRunDefinition()
        }
      )
  }

  onClearFilters = () => {
    this.setState({ ...getDefaultFilters(), teamList: [] }, () =>
      setSelectedFilters(this.state)
    )
  }

  readLineStatus = definition => {
    const { lineStatus } = this.state

    getLineStatus().then(responseLineStatus => {
      const selectedLineStatus =
        responseLineStatus.length > 0 && definition
          ? lineStatus
          : responseLineStatus.map(status => status.Phrase_Value)
      this.setState(
        {
          lineStatusList: responseLineStatus,
          lineStatus: selectedLineStatus
        },
        () => setSelectedFilters(this.state)
      )
    })
  }

  render() {
    const { plantModel, lineStatus, lineStatusList } = this.state
    const { t } = this.props

    const MSlabels = {
      addAllLabel: t('Add All'),
      removeAllLabel: t('Remove All'),
      searchPlaceHolder: `${t('Search')}...`,
      selectedLabel: t('Items selected')
    }

    return (
      <div className={styles.root}>
        <nav>
          <Button
            icon="times"
            text={t('Clear Filters')}
            onClick={this.onClearFilters}
          />
          <Definitions
            selectedFilters={getSelectedFilters}
            onSelectDefinition={this.onSelectDefinition}
            minWidth="150px"
            maxWidth="300px"
            t={t}
          />
        </nav>
        <div className={styles.content}>
          <div>
            <Panel title={t('Main Filters')}>
              <PlantModelSelector
                onChange={this.onPlantModelChange}
                className={styles['plant-model']}
                value={plantModel ? plantModel : null}
                t={t}
                MSlabels={MSlabels}
              />
            </Panel>
          </div>
          <div>
            <Panel title={t('Options Filters')} icon="filter" paddingBottom={0}>
              <label>{t('Line Status')} </label>
              <MultiSelect
                value={lineStatus}
                options={lineStatusList}
                valueKey="Phrase_Value"
                labelKey="Phrase_Value"
                onChange={selected =>
                  this.setState({ lineStatus: selected }, () =>
                    setSelectedFilters(this.state)
                  )
                }
              />
            </Panel>
          </div>
        </div>
      </div>
    )
  }
}

export default Filters
