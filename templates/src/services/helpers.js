function getUrlParameter(name) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  var results = regex.exec(window.location.search)
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

const animateScrollLeft = (elem, to, cb, time = 500, startTime = null) => {
  const from = elem.scrollLeft
  const start = startTime ? startTime : new Date().getTime()
  let step = Math.min(1, (new Date().getTime() - start) / time)

  elem.scrollLeft = from + step * (to - from)

  setTimeout(() => {
    if (step === 1) {
      if (cb) cb()
      return
    }
    animateScrollLeft(elem, to, cb, time, start)
  }, 1)
}

export { getUrlParameter, animateScrollLeft }
