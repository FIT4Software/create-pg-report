#!/usr/bin/env node
require('colors')
const shell = require('shelljs')
const { createReactApp } = require('./services/cra')
const {
  updateSources,
  updatePublicFolder,
  copyEnvFile
} = require('./services/template')
const { installPackages, editPackageJSON } = require('./services/packages')
const appName = process.argv[2]
const appDirectory = `${process.cwd()}/${appName}`

const run = async () => {
  let success = await createReactApp(appName, shell)
  if (!success) {
    console.log(
      'Something went wrong while trying to execute create-react-app'.red
    )
    return false
  }
  await installPackages(appDirectory, shell)
  await updateSources(__dirname, appDirectory)
  await updatePublicFolder(__dirname, appDirectory)
  await copyEnvFile(__dirname, appDirectory)
  await editPackageJSON(appDirectory)
  console.log('All done!!\n'.green)
  console.log(' Now type: \n'.green)
  console.log(`   cd ${appName}`.cyan)
  console.log('   npm start'.cyan)
}
run()
