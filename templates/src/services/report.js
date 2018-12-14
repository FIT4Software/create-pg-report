import axios from 'axios'

let currentData = {}

function getReportData({
  plantModel = {
    departments: [],
    lines: 0
  },
  timeOption = 1,
  lineStatus = []
}) {
  return axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      params: {
        plIdList: plantModel.lines.map(l => l.equipmentId).join(','),
        timeOption,
        lineStatus: lineStatus.length <= 0 ? 'All' : lineStatus.join('|')
      }
    })
    .then(response => {
      return (currentData = response.data)
    })
}

function getReportCurrentData() {
  return currentData
}

export { getReportData, getReportCurrentData }
