import axios from 'axios'
import store from '../../src/redux/store'

function getTimeOptionSelection(timeOption) {
  timeOption = timeOption.replace(/\s/g, '')

  let dateDesc =
    timeOption === 'MTD'
      ? 'MonthToDate'
      : timeOption === 'PreviousMonth'
      ? 'LastMonth'
      : timeOption === 'Past3Month'
      ? 'Last3Months'
      : timeOption

  return axios.get('../../api/Proficy/Filter/getTimeOptionSelection', {
    params: { timeOption: dateDesc }
  })
}

function getDateOptions(t = val => val) {
  return axios.get(`../../api/TimeOption/getTimeOptions`).then(response =>
    response.data.map(option => ({
      DateId: option.DateId,
      key: option.DateDesc.replace(/\s/g, ''),
      DateDesc: t(option.DateDesc.replace(/\s/g, ''))
    }))
  )
}

function getErrorMessages() {
  let { selected } = store.getState().filters

  let errors = []

  if (selected.departments.length <= 0) {
    errors.push('Areas is not selected')
  }

  if (selected.lines.length <= 0) {
    errors.push('Production Lines is not selected')
  }

  if (
    (selected.timeOption === 'UserDefined' && selected.startTime === null) ||
    selected.endTime === null
  ) {
    errors.push('Time option is not selected')
  }

  return errors
}

export { getDateOptions, getTimeOptionSelection, getErrorMessages }
