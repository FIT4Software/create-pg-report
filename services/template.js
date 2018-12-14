const fs = require('fs-extra')
const path = require('path')

const updateSources = (dirname, appDirectory) => {
  return new Promise(resolve => {
    fs.remove(`${appDirectory}/src/`, err => {
      if (err) return console.error(err)

      fs.copy(path.join(dirname, '/templates/src'), `${appDirectory}/src/`)
        .then(() => resolve())
        .catch(err => console.error(err))
    })
  })
}

const updatePublicFolder = (dirname, appDirectory) => {
  return new Promise(resolve => {
    fs.remove(`${appDirectory}/public/`, err => {
      if (err) return console.error(err)

      fs.copy(
        path.join(dirname, '/templates/public'),
        `${appDirectory}/public/`
      )
        .then(() => resolve())
        .catch(err => console.error(err))
    })
  })
}

const copyEnvFile = (dirname, appDirectory) => {
  return new Promise(resolve => {
    fs.copy(path.join(dirname, '/templates/.env'), `${appDirectory}/.env`)
      .then(() => resolve())
      .catch(err => console.error(err))
  })
}

module.exports = {
  copyEnvFile,
  updatePublicFolder,
  updateSources
}
