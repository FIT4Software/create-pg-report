import React, { Component } from 'react'
import { TopBarDropDown } from '../TopBar'
import { getAvailableLanguages, i18n } from '../../../services/locale'

class DateSelector extends Component {
  constructor(props) {
    super(props)
    this.state = { languages: [], selected: null }
  }

  componentDidMount() {
    this.setState({
      languages: getAvailableLanguages(),
      selected: localStorage.i18nextLng || 'en'
    })
  }

  getSelectedDesc = () => {
    const { languages, selected } = this.state
    const selectedObj = languages.find(lang => lang.value === selected)
    return selectedObj ? selectedObj.text : ''
  }

  onChange = lang => {
    this.setState(
      {
        selected: lang.value
      },
      () => {
        localStorage.setItem('iods-rpt-language', lang.value)
        i18n.changeLanguage(lang.value, () => {
          window.location.reload()
        })
      }
    )
  }

  render() {
    const { languages } = this.state
    return (
      <TopBarDropDown
        title={this.getSelectedDesc()}
        options={languages}
        onOptionClick={this.onChange}
        fieldValue="value"
        fieldDesc="text"
        icon="fa fa-language"
        right
      />
    )
  }
}

export default DateSelector
