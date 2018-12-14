import React, { Component } from 'react'
import { TopBarDropDown } from '../TopBar'
import {
  getDateOptions,
  setSelectedFilters,
  onFiltersChange
} from '../../../services/filters'
import { DateBox } from 'devextreme-react/ui/date-box'
import styles from './styles.module.scss'
import moment from 'moment'

class DateSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateOptions: [],
      selected: {},
      showUserDefinedSelector: false,
      startTime: moment().subtract(3, 'days'),
      endTime: moment()
    }
  }

  componentDidMount() {
    getDateOptions(this.props.t).then(options => {
      //options.push({ DateId: -1, DateDesc: this.props.t('User Defined') })
      if (options && options.length > 0) {
        this.setState({ dateOptions: options, selected: options[0] })
      }
    })

    onFiltersChange().subscribe(({ timeOption, startTime, endTime }) => {
      const { selected, dateOptions } = this.state
      if (selected && selected.DateId !== timeOption.DateId) {
        const selected = dateOptions.find(x => x.DateId === timeOption)
        this.setState({ selected, showUserDefinedSelector: timeOption === -1 })
      }
    })
  }

  onChange = option => {
    this.setState(
      { selected: option, showUserDefinedSelector: option.DateId === -1 },
      () => {
        setSelectedFilters({
          timeOption: option.DateId,
          startTime: option.DateId === -1 ? this.state.startTime : null,
          endTime: option.DateId === -1 ? this.state.endTime : null
        })
      }
    )
  }

  handleInputDate = (e, elemName) => {
    this.setState(
      {
        [elemName]: e.value
      },
      () => {
        setSelectedFilters({
          startTime: this.state.startTime,
          endTime: this.state.endTime
        })
      }
    )
  }

  render() {
    const {
      dateOptions,
      selected,
      startTime,
      endTime,
      showUserDefinedSelector
    } = this.state

    return (
      <div className={styles.container}>
        <TopBarDropDown
          title={selected ? selected.DateDesc : ''}
          options={dateOptions}
          onOptionClick={this.onChange}
          fieldValue="DateId"
          fieldDesc="DateDesc"
        />
        {showUserDefinedSelector ? (
          <div className={styles.inputs}>
            {/* <input type="date" /> */}
            <DateBox
              ref={ref => (this.startTimeBox = ref)}
              type="datetime"
              value={startTime}
              onValueChanged={e => this.handleInputDate(e, 'startTime')}
              width={160}
            />
            <DateBox
              ref={ref => (this.endTimeBox = ref)}
              type="datetime"
              value={endTime}
              onValueChanged={e => this.handleInputDate(e, 'endTime')}
              min={startTime}
              width={160}
            />
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default DateSelector
