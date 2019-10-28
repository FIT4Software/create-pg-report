import axios from 'axios'
import store from '../../src/redux/store'
import { updataDataSource } from '../redux/ducks/dataSource'

let currentData = {}

function getReportData(
  lineId,
  lineDesc,
  {
    selected = {
      departments: [],
      lines: 0,
      timeOption: 'Last3Days'
    }
  }
) {
  return axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      params: {
        lineId,
        lineDesc,
        plIdList: selected.lines.map(l => l.equipmentId).join(','),
        timeOption: selected.timeOption
      }
    })
    .then(response => {
      currentData = response.data
      store.dispatch(updataDataSource({ key: lineDesc, data: currentData }))
      return currentData
    })
}

function getReportCurrentData() {
  return currentData
}

export { getReportData, getReportCurrentData }
