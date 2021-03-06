import React, { PureComponent } from 'react'
import DropDownList from '../../../components/DropDownList'
import Button from '../../../components/Button'
import { Icon } from 'react-fa'
import styles from './styles.module.scss'
import {
  saveDefition,
  getDefinitions,
  removeDefinition
} from '../../../services/definitions'
import SaveDefinition from '../SaveDefinition'
import DeleteDefinition from '../DeleteDefinition'
import { showMsg } from '../../../services/notification'
import { getErrorMessages } from './../../../services/filters'
import store from './../../../redux/store'

const OptionComponent = ({ value, children, onClick }) => {
  return (
    <div className={styles['defition-option']}>
      <span>{children}</span>
      <Icon
        name="trash"
        className={styles.icon}
        size="lg"
        onClick={e => {
          e.stopPropagation()
          onClick(value)
        }}
      />
    </div>
  )
}

const initialStates = {
  showModalSave: false,
  nameDefinitionInput: '',
  disabledInput: false,
  invalidInput: null,
  showModalDelete: false,
  defitionToRemove: null
}

class Definitions extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      ...initialStates,
      definitions: [],
      selectedDefinition: null
    }
  }

  componentDidMount() {
    this.readDefinitions()
  }

  openModalSaveDefinition = () => {
    const { selectedDefinition, definitions } = this.state
    const { t } = this.props

    if (getErrorMessages().length <= 0) {
      if (selectedDefinition) {
        this.setState({
          nameDefinitionInput: definitions.find(
            def => def.Def_Id === selectedDefinition
          ).Def_Name,
          disabledInput: true,
          showModalSave: true
        })
      } else {
        this.setState({
          nameDefinitionInput: '',
          disabledInput: false,
          showModalSave: true
        })
      }
    } else {
      showMsg({
        type: 'error',
        icon: 'exclamation-circle',
        title: t('Please complete the required filters'),
        message: '',
        position: 'top',
        closable: true,
        show: true
      })
    }
  }

  onCancelSaveDef = () => {
    this.setState(initialStates)
  }

  onSaveSaveDef = () => {
    const { t } = this.props
    const { selectedDefinition } = this.state
    let nameDef = this.state.nameDefinitionInput.trim()
    if (nameDef.length === 0) {
      this.setState({ invalidInput: true })
      showMsg({
        type: 'error',
        icon: 'exclamation-circle',
        message: '',
        title: t('Please type a name first!'),
        position: 'top',
        closable: true,
        show: true
      })
    } else {
      let error = false
      this.state.definitions.forEach(def => {
        if (def.Def_Name === nameDef && this.state.selectedDefinition === null)
          error = true
      })
      if (error) {
        showMsg({
          type: 'error',
          icon: 'exclamation-circle',
          message: '',
          title: t('The definition name already exist. please try other name!'),
          position: 'top',
          closable: true,
          show: true
        })
      } else {
        saveDefition(selectedDefinition, nameDef, store.getState().filters)
          .then(() => {
            this.readDefinitions()
            this.setState({ showModalSave: false })
            this.state.selectedDefinition === null
              ? showMsg({
                  type: 'success',
                  icon: 'check',
                  message: '',
                  title: t('Definition saved successfully'),
                  position: 'top',
                  closable: true,
                  show: true
                })
              : showMsg({
                  type: 'success',
                  icon: 'check',
                  message: '',
                  title: t('Definition edited successfully'),
                  position: 'top',
                  closable: true,
                  show: true
                })
          })
          .catch(error => {
            console.error(error.response)
            showMsg({
              type: 'error',
              icon: 'exclamation-circle',
              message: 'Error!!!',
              title: error.response.data.ExceptionMessage,
              position: 'top',
              closable: true,
              show: true
            })
          })
      }
    }
  }

  onInputChangeSaveDef = e => {
    this.setState({
      nameDefinitionInput: e.target.value,
      invalidInput: false
    })
  }

  openModalDeleteDefinition = defId => {
    this.setState({ showModalDelete: true, defitionToRemove: defId })
  }

  onCancelDeleteDef = () => {
    this.setState({ showModalDelete: false })
  }

  onOkDeleteDef = () => {
    const { defitionToRemove, selectedDefinition } = this.state
    const { t } = this.props
    removeDefinition(defitionToRemove).then(() => {
      this.readDefinitions()
      this.setState({ showModalDelete: false })
      if (defitionToRemove === selectedDefinition) {
        this.setState({
          defitionToRemove: null,
          selectedDefinition: null
        })
      }

      showMsg({
        type: 'success',
        icon: 'check',
        message: '',
        title: t('Definition removed successfully'),
        position: 'top',
        closable: true,
        show: true
      })
    })
  }

  onSelectDefinition = value => {
    const { onSelectDefinition } = this.props
    const { definitions } = this.state

    this.setState({ selectedDefinition: value }, () => {
      if (onSelectDefinition) {
        const selectedDef = definitions.find(def => def.Def_Id === value)

        onSelectDefinition(selectedDef ? selectedDef.Value : null)
      }
    })
  }

  readDefinitions = () => {
    getDefinitions().then(definitions =>
      this.setState({
        definitions: definitions
      })
    )
  }

  render() {
    const { t } = this.props
    const { selectedDefinition, definitions } = this.state
    return (
      <div>
        <DropDownList
          defaultItem={{ Def_Name: t('Select Definition') }}
          width="auto"
          minWidth={this.props.minWidth}
          maxWidth={this.props.maxWidth}
          value={selectedDefinition}
          options={definitions}
          onSelect={this.onSelectDefinition}
          valueKey="Def_Id"
          labelKey="Def_Name"
          optionComponent={({ value, children }) => {
            return (
              <OptionComponent
                value={value}
                onClick={this.openModalDeleteDefinition}
              >
                {children}
              </OptionComponent>
            )
          }}
        />
        <Button
          icon={this.state.selectedDefinition === null ? 'save' : 'pencil'}
          text={
            this.state.selectedDefinition === null
              ? t('Save Definition')
              : t('Edit Definition')
          }
          primary
          onClick={this.openModalSaveDefinition}
        />
        <SaveDefinition
          show={this.state.showModalSave}
          onCancel={this.onCancelSaveDef}
          onSave={this.onSaveSaveDef}
          onInputChange={this.onInputChangeSaveDef}
          invalidInput={this.state.invalidInput}
          value={this.state.nameDefinitionInput}
          disabled={this.state.disabledInput}
          edit={!!selectedDefinition}
          t={t}
        />
        <DeleteDefinition
          show={this.state.showModalDelete}
          onCancel={this.onCancelDeleteDef}
          onOk={this.onOkDeleteDef}
          t={t}
        />
      </div>
    )
  }
}

export default Definitions
