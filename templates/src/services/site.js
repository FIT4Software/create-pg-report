import axios from 'axios'

let PlantName = ''

function getDBServerName() {
  return axios
    .get('../../api/Site/getDBAServer')
    .then(response => response.data)
    .then(data => {
      return (PlantName = data.length > 0 ? data[0].siteid : '')
    })
}

export { getDBServerName, PlantName }
