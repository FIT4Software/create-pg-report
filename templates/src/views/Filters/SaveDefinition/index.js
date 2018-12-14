import React from 'react'
import styles from './styles.module.scss'
import Modal from '../../../components/Modal'
import ModalButton from '../../../components/Modal/ModalButton'

const SaveDefinition = ({
  show,
  onCancel,
  onSave,
  onInputChange,
  invalidInput,
  value,
  disabled,
  edit,
  t
}) => {
  let buttons = [
    <ModalButton icon="times" typeButton="danger" key="1" onClick={onCancel}>
      {t('Cancel')}
    </ModalButton>,
    <ModalButton icon="check" typeButton="success" key="2" onClick={onSave}>
      {t('Save')}
    </ModalButton>
  ]
  return (
    <div>
      <Modal
        buttons={buttons}
        title={!edit ? t('Save Definition') : t('Edit Definition')}
        iconTitle="save"
        extraStyles={{ maxWidth: '350px' }}
        show={show}
      >
        {edit && <p>Are you sure to update this definition?</p>}
        <input
          type="text"
          placeholder={t('Name Definition')}
          value={value}
          onChange={onInputChange}
          className={invalidInput ? styles.invalid : null}
          disabled={disabled}
        />
      </Modal>
    </div>
  )
}

export default SaveDefinition
