import axios from 'axios'
import { Subject } from 'rxjs'
const requestStartEmitter = new Subject()
const requestCompleteEmitter = new Subject()

let request = {
  status: null
}
let requestCount = 0

axios.interceptors.request.use(
  config => {
    requestCount++
    request.status = 'start'
    requestStartEmitter.next(request)
    return config
  },
  error => {
    request.status = 'error'
    request.error = error
    requestStartEmitter.next(request)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    setTimeout(() => {
      requestCount--
      if (requestCount === 0) {
        request.status = 'complete'
        requestCompleteEmitter.next(request)
      }
    }, 50)

    return response
  },
  error => {
    if (
      !window.location.hostname.includes('localhost') &&
      error.response.status === 401
    )
      window.location = '../../'

    setTimeout(() => {
      requestCount--
      if (requestCount === 0) {
        request.status = 'error'
        request.error = error
        requestCompleteEmitter.next(request)
      }
    }, 50)
    return Promise.reject(error)
  }
)

function axiosStart() {
  return requestStartEmitter.asObservable()
}

function axiosComplete() {
  return requestCompleteEmitter.asObservable()
}

export { axiosStart, axiosComplete }
