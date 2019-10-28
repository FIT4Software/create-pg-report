import { applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'

const middleware =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : applyMiddleware(logger, thunk)

export default middleware
