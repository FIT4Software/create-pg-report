import axios from 'axios'

function getDBServerName() {
  return axios
    .get('../../api/Site/getDBAServer')
    .then(response => response.data)
    .then(data => (data.length > 0 ? data[0].siteid : ''))
}

export { getDBServerName }
