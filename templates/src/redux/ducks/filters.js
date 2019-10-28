import axios from 'axios'

const UPDATE_FILTERS = 'UPDATE_FILTERS'
const UPDATE_PLANT_MODEL = 'UPDATE_PLANT_MODEL'
const CLEAR_FILTERS = 'CLEAR_FILTERS'

const initialState = {
  selected: {
    departments: [],
    lines: [],
    switchShowTeamColumn: false,
    timeOption: 'Last3Days',
    startTime: new Date(new Date().setHours(0, 0, 0)),
    endTime: new Date()
  },
  departments: [],
  lines: [],
  runTime: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILTERS:
      return Object.assign({}, state, action.elements, {
        selected: Object.assign({}, state.selected, action.elements.selected)
      })
    case UPDATE_PLANT_MODEL: {
      const { name, data } = action

      let options = {
        departments: state.departments,
        lines: name === 'departments' && data.length === 0 ? [] : state.lines
      }

      let selection = {
        departments: state.selected.departments,
        lines: state.selected.lines
      }

      switch (name) {
        case 'departments':
          selection.departments = data
          selection.lines = []
          break
        case 'lines':
          selection.lines = data
          break
        default:
          break
      }

      return Object.assign({}, state, options, {
        selected: Object.assign({}, state.selected, selection)
      })
    }
    case CLEAR_FILTERS:
      return Object.assign(
        {},
        initialState,
        { departments: state.departments },
        { selected: Object.assign({}, initialState.selected) }
      )
    default:
      return state
  }
}

const getDepartments = () => {
  return dispatch => {
    return axios
      .get('../../api/Proficy/Filter/getDepartments')
      .then(response => {
        dispatch(updateFilters({ departments: response.data }))
      })
  }
}

const getLines = areas => {
  return dispatch => {
    return axios
      .get('../../api/Proficy/Filter/getLinesByDepartment', {
        params: {
          departments: areas.map(dep => dep.equipmentId).join(',')
        }
      })
      .then(response => {
        dispatch(updateFilters({ lines: response.data }))
      })
  }
}

const updateFilters = elements => ({
  type: UPDATE_FILTERS,
  elements
})

const updatePlantModel = options => {
  let key = Object.keys(options)[0]
  return {
    type: UPDATE_PLANT_MODEL,
    name: key,
    data: options[key]
  }
}

const clearFilters = () => ({
  type: CLEAR_FILTERS
})

export {
  getDepartments,
  getLines,
  updateFilters,
  updatePlantModel,
  clearFilters
}
