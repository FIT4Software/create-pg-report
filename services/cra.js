const createReactApp = (appName, shell) => {
  return new Promise(resolve => {
    if (appName) {
      shell.exec(`npm install create-react-app -g`, () => {
    
         shell.exec(`npm init react-app ${appName}`, () => {
        console.log('Created react app!')
        resolve(true)
      })
       
      })
    } else {
      console.log('\nNo app name was provided.'.red)
      console.log('\nProvide an app name in the following format: ')
      console.log('\ncreate-pg-report ', 'app-name\n'.cyan)
      resolve(false)
    }
  })
}

module.exports = {
  createReactApp
}
