import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'
import localization from 'devextreme/localization'
import dxLocales from '../resources/DX/messages'

function i18nInit() {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
      fallbackLng: 'en',
      load: 'all',
      ns: ['translations'],
      defaultNS: 'translations',
      debug: process.env.NODE_ENV !== 'production',
      interpolation: {
        escapeValue: false // not needed for react!!
      },
      react: {
        wait: true
      },
      backend: {
        loadPath: './locales/{{lng}}/{{ns}}.json'
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

function getAvailableLanguages() {
  let languages = []
  if (i18n && i18n.options) {
    const keys = i18n.getResource('en', i18n.options.defaultNS, 'locales')
    Object.keys(keys).forEach(key =>
      languages.push({ value: key, text: keys[key] })
    )
  }
  return languages
}

export { i18nInit, i18n, getAvailableLanguages }
