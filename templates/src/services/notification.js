import { Subject } from 'rxjs'

const emitterNotification = new Subject()

function showMsg(msg) {
  emitterNotification.next(msg)
}

function subscribeNotification() {
  return emitterNotification.asObservable()
}

export { subscribeNotification, showMsg }
