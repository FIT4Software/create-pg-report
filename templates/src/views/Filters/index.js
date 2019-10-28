import React, { PureComponent } from 'react'
import styles from './styles.module.scss'
import Button from '../../components/Button'
import ButtonGroup from '../../components/ButtonGroup'
import ButtonSwitch from '../../components/ButtonSwitch'
import Definitions from './Definitions'
import Panel from '../../components/Panel'
import MultiSelectBox from 'react-multiselect-box'
import {
  getDepartments,
  getLines,
  updateFilters,
  updatePlantModel,
  clearFilters
} from '../../redux/ducks/filters'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Filters extends PureComponent {
  componentDidMount() {
    this.props.getDepartments()
  }

  componentDidUpdate(prevProps, prevState) {
    const { departments } = this.props.filters.selected

    if (prevProps.filters.selected.departments !== departments) {
      if (departments.length) this.props.getLines(departments)
    }
  }

  onAddMultiSelectBox = (key, value) => {
    value = Array.isArray(value) ? value : Array(value)
    this.props.updateFilters({
      selected: {
        [key]: [...(this.props.filters.selected[key] || {}), ...value]
      }
    })
  }

  onRemoveMultiSelectBox = (key, value) => {
    this.props.updatePlantModel({
      [key]: value
        ? this.props.filters.selected[key].filter(
            e => e.equipmentId !== value.equipmentId
          )
        : []
    })
  }

  onPress = btn => {
    this.props.updateFilters({
      selected: {
        switchShowTeamColumn: !btn.props.checked
      }
    })
  }

  onSelectDefinition = definition => {
    if (definition) this.props.updateFilters(JSON.parse(definition))
  }

  render() {
    const { t } = this.props
    const { departments, lines, selected } = this.props.filters
    const {
      onAddMultiSelectBox,
      onRemoveMultiSelectBox,
      onSelectDefinition
    } = this

    const msLabels = {
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
            onClick={() => {
              this.props.clearFilters()
              this.clearFilters()
            }}
          />
          <Definitions
            onSelectDefinition={onSelectDefinition}
            minWidth="150px"
            maxWidth="300px"
            t={t}
          />
        </nav>
        <div className={styles.content}>
          <div>
            <Panel
              title={t('Main Filters')}
              borderBottom={false}
              paddingBottom={0}
            >
              <label>
                {t('Areas')}&nbsp;
                <i className="fa fa-asterisk pg-darkred-color" />
              </label>
              <MultiSelectBox
                ref={ref => (this.refArea = ref)}
                options={departments}
                labelKey="equipmentDesc"
                valueKey="equipmentId"
                onAdd={e => onAddMultiSelectBox('departments', e)}
                onSelectAll={e => onAddMultiSelectBox('departments', e)}
                onRemove={e => onRemoveMultiSelectBox('departments', e)}
                onRemoveAll={e => onRemoveMultiSelectBox('departments', e)}
                valueArray={selected.departments.map(e => e.equipmentId)}
                {...msLabels}
                boxHeight={100}
              />
              <br />
              <label>
                {t('Production Lines')}&nbsp;
                <i className="fa fa-asterisk pg-darkred-color" />
              </label>
              <MultiSelectBox
                ref={ref => (this.refLine = ref)}
                options={lines}
                labelKey="equipmentDesc"
                valueKey="equipmentId"
                onAdd={e => onAddMultiSelectBox('lines', e)}
                onSelectAll={e => onAddMultiSelectBox('lines', e)}
                onRemove={e => onRemoveMultiSelectBox('lines', e)}
                onRemoveAll={e => onRemoveMultiSelectBox('lines', e)}
                valueArray={selected.lines.map(e => e.equipmentId)}
                {...msLabels}
                boxHeight={100}
              />
            </Panel>
          </div>
          <div>
            <Panel
              title={t('Grouping Options')}
              icon="filter"
              paddingBottom={0}
            >
              <ButtonGroup visible={true}>
                <ButtonSwitch
                  id="switchShowTeamColumn"
                  text={t('Show Team Column')}
                  checked={selected.switchShowTeamColumn}
                  onPress={this.onPress}
                  classes={styles.subgroups}
                  classContainer={styles.btnGroupThree}
                />
              </ButtonGroup>
            </Panel>
          </div>
        </div>
      </div>
    )
  }

  clearFilters = () => {
    const { refArea, refLine } = this
    if (refArea && refArea.state.filterText !== '')
      refArea.state.filterText = ''
    if (refLine && refLine.state.filterText !== '')
      refLine.state.filterText = ''
  }
}

const mapStateToProps = ({ filters }) => {
  return { filters }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDepartments,
      getLines,
      updateFilters,
      updatePlantModel,
      clearFilters
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters)
