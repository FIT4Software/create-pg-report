import axios from 'axios'
import { getUrlParameter } from './helpers'
import { getProfile } from './auth'

function saveDefition(defId, name, definition) {
  return axios.post('../../api/Definitions/saveEdit', {
    username: getProfile().UserID || '',
    values: JSON.stringify(definition || {}),
    reportType: getUrlParameter('id') || 0,
    local: true,
    name: name,
    defId: defId
  })
}

function removeDefinition(defId) {
  return axios.delete(`../../api/Definitions/delete`, {
    data: { defId }
  })
}

function getDefinitions() {
  return axios
    .get(
      `../../api/Definitions/getAll?reportType=${getUrlParameter('id') || 0}`
    )
    .then(response => response.data)
}

export { saveDefition, getDefinitions, removeDefinition }
