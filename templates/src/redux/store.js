import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import dataSource from './ducks/dataSource'
import filters from './ducks/filters'

export default createStore(
  combineReducers({
    dataSource,
    filters
  }),
  composeWithDevTools(applyMiddleware(thunk))
)
