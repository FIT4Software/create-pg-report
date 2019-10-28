import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'
import localization from 'devextreme/localization'
import dxLocales from '../resources/DX/messages'
import axios from 'axios'

function i18nInit() {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
      fallbackLng: 'en',
      load: 'all',
      ns: [process.env.REACT_APP_REPORT_NAME],
      defaultNS: process.env.REACT_APP_REPORT_NAME,
      debug: process.env.NODE_ENV !== 'production',
      interpolation: {
        escapeValue: false // not needed for react!!
      },
      react: {
        wait: true
      },
      backend: {
        loadPath: '../../api/Locales/getLanguage?report={{ns}}&language={{lng}}'
      }
    })

  i18n.on('languageChanged', lang => {
    lang = lang.split('-').length > 1 ? lang.split('-')[0] : lang
    localStorage.setItem('iods-rpt-language', lang)
    localization.loadMessages(dxLocales)
    localization.locale(lang)
  })

  window.addEventListener(
    'focus',
    function(event) {
      if (i18n.language !== localStorage.getItem('iods-rpt-language'))
        i18n.changeLanguage(localStorage.getItem('iods-rpt-language'), () => {
          setTimeout(() => {
            window.location.reload()
          }, 100)
        })
    },
    false
  )
  return i18n
}

function getAvailableLanguages(report = process.env.REACT_APP_REPORT_NAME) {
  return axios.get(`../../api/locales/getLocales`).then(response =>
    response.data.map(language => ({
      text: language.LangName,
      value: language.LangCode
    }))
  )
}

export { i18nInit, i18n, getAvailableLanguages }
