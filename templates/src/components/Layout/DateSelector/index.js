import React, { Component } from 'react'
import { TopBarDropDown } from '../TopBar'
import { getDateOptions } from '../../../services/filters'
import { DateBox } from 'devextreme-react/ui/date-box'
import styles from './styles.module.scss'
import { updateFilters } from './../../../redux/ducks/filters'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class DateSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateOptions: [],
      showUserDefinedSelector: false,
      eventActive: false
    }
  }

  componentDidMount() {
    getDateOptions(this.props.t).then(options => {
      options.push({
        DateId: -1,
        key: 'UserDefined',
        DateDesc: this.props.t('UserDefined')
      })
      if (options && options.length > 0) {
        let defTimeOpt = options.indexOf(
          options.find(e => e.key === 'Last3Days')
        )
        this.setTimeOption(options[defTimeOpt].key)
        this.setState({ dateOptions: options })
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.timeOption !== this.props.timeOption &&
      !this.state.eventActive &&
      this.props.timeOption !== 'UserDefined'
    ) {
      this.setState({ showUserDefinedSelector: false }, () => {
        this.setTimeOption(this.props.timeOption)
        this.setState({
          eventActive: false
        })
      })
    }
  }

  onChange = option => {
    this.setState({ eventActive: true })

    if (option.DateId !== -1) {
      this.setTimeOption(option.key)
      this.setState({
        showUserDefinedSelector: option.DateId === -1,
        eventActive: false
      })
    } else {
      this.props.updateFilters({
        selected: { timeOption: option.key.replace(/\s/g, '') }
      })
      this.setState({ showUserDefinedSelector: true, eventActive: false })
    }
  }

  handleInputDate = (e, elemName) => {
    this.props.updateFilters({ selected: { [elemName]: e.value } })
  }

  setTimeOption = option => {
    this.props.updateFilters({ selected: { timeOption: option } })
  }

  render() {
    const { dateOptions, showUserDefinedSelector } = this.state
    const { t } = this.props

    return (
      <div className={styles.container}>
        <TopBarDropDown
          title={t(this.props.timeOption)}
          options={dateOptions}
          onOptionClick={this.onChange}
          fieldValue="DateId"
          fieldDesc="DateDesc"
        />
        {showUserDefinedSelector ? (
          <div className={styles.inputs}>
            <DateBox
              type="datetime"
              value={this.props.startTime}
              defaultOpened={true}
              onValueChanged={e => this.handleInputDate(e, 'startTime')}
              max={this.props.endTime}
              width={160}
              displayFormat={'yyyy-MM-dd HH:mm'}
            />
            <DateBox
              type="datetime"
              value={this.props.endTime}
              onValueChanged={e => this.handleInputDate(e, 'endTime')}
              min={this.props.startTime}
              width={160}
              displayFormat={'yyyy-MM-dd HH:mm'}
            />
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    timeOption: state.filters.selected.timeOption,
    startTime: state.filters.selected.startTime,
    endTime: state.filters.selected.endTime
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateFilters }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateSelector)
