const UPDATE_DATA_SOURCE = 'UPDATE_DATA_SOURCE'
const CLEAR_DATASOURCE = 'CLEAR_DATASOURCE'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DATA_SOURCE:
      return Object.assign({}, state, { [action.key]: action.data })
    case CLEAR_DATASOURCE:
      return Object.assign({}, initialState)
    default:
      return state
  }
}

const updataDataSource = option => ({
  type: UPDATE_DATA_SOURCE,
  key: option.key,
  data: option.data
})

const clearDataSource = () => ({
  type: CLEAR_DATASOURCE
})

export { updataDataSource, clearDataSource }
