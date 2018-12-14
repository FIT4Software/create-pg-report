import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { I18nextProvider } from 'react-i18next'
import { i18nInit } from './services/locale'
import { loggedIn } from './services/auth'
import 'normalize.css'
import './index.css'

import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.compact.css'
import 'react-multiselect-box/build/css/index.css'

let message = ''

if (!loggedIn()) {
  if (window.location.hostname.includes('localhost'))
    message =
      'DEV => Auth token expired. Generate token from LP and set the key iods_token in local storage.'
  else {
    message = 'No authorized. Redirecting to Landing page..'
    window.location = '../../'
  }
}

ReactDOM.render(
  <I18nextProvider i18n={i18nInit()}>
    <App message={message} />
  </I18nextProvider>,
  document.getElementById('root')
)
