import axios from 'axios'
import { Subject } from 'rxjs'

let dateOptions = []
const filtersEmitter = new Subject()

let filters = {
  ...getDefaultFilters(),
  areValid: areValid,
  getErrorMessages: getErrorMessages
}

function getDefaultFilters() {
  return {
    plantModel: {
      departments: [],
      lines: []
    },
    timeOption: 1,
    startTime: null,
    endTime: null,
    lineStatus: []
  }
}

function getSelectedFilters() {
  return filters
}

function setSelectedFilters({
  plantModel,
  timeOption,
  startTime,
  endTime,
  lineStatus
}) {
  filters = Object.assign(filters, {
    plantModel: plantModel || filters.plantModel,
    timeOption: timeOption || filters.timeOption,
    lineStatus: lineStatus || filters.lineStatus
  })

  filters = Object.assign(filters, {
    startTime:
      filters.timeOption === -1 ? startTime || filters.startTime : null,
    endTime: filters.timeOption === -1 ? endTime || filters.endTime : null
  })

  filtersEmitter.next(filters)
}

function getDepartments() {
  return axios
    .get('../../api/Filters/getDepartment')
    .then(response => response.data)
}

function getLines(areas) {
  if (areas.length === 0) return Promise.resolve([])
  return axios
    .get(`../../api/Filters/getLines?area=${areas}`)
    .then(response => response.data)
}

function getDateOptions(t = val => val) {
  return axios.get(`../../api/TimeOption/getTimeOptions`).then(response => {
    dateOptions = response.data.map(option => ({
      DateId: option.DateId,
      DateDesc: t(option.DateDesc)
    }))
    return dateOptions
  })
}

function getSelectedDateOption(id) {
  return dateOptions.find(to => to.DateId === filters.timeOption)
}

function getLineStatus() {
  return axios
    .get(`../../api/Proficy/Filter/getLineStatus`)
    .then(response => response.data)
}

function areValid() {
  if (!this || !this.plantModel) {
    return false
  }

  return this.getErrorMessages().length <= 0
}

function getErrorMessages() {
  const plantModel = this.plantModel
  let errors = []
  if (!plantModel.departments || plantModel.departments.length <= 0) {
    errors.push('Area is not selected.')
  }

  if (!plantModel.lines || plantModel.lines.length <= 0) {
    errors.push('Production Line is not selected.')
  }

  return errors
}

function onFiltersChange() {
  return filtersEmitter.asObservable()
}

export {
  getSelectedFilters,
  setSelectedFilters,
  getDepartments,
  getLines,
  getDateOptions,
  getDefaultFilters,
  onFiltersChange,
  getSelectedDateOption,
  getLineStatus
}
