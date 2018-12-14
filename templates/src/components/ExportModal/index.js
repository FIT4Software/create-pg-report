import React, { Component } from 'react'
import styles from './styles.module.scss'
import Modal from '../Modal'
import ModalButton from '../Modal/ModalButton'

class ExportModal extends Component {
  render() {
    const {
      show,
      onCancel,
      onOk,
      onInputChange,
      invalidInput,
      t,
      value
    } = this.props
    let buttons = [
      <ModalButton icon="times" typeButton="danger" key="1" onClick={onCancel}>
        {t('Cancel')}
      </ModalButton>,
      <ModalButton icon="check" typeButton="success" key="2" onClick={onOk}>
        {t('Export')}
      </ModalButton>
    ]
    return (
      <div>
        <Modal
          buttons={buttons}
          title={t('Export Data to Excel')}
          iconTitle="file-excel-o"
          extraStyles={{ maxWidth: '350px' }}
          show={show}
        >
          <input
            type="text"
            placeholder={''}
            onChange={onInputChange}
            className={invalidInput ? styles.invalid : null}
            value={value}
          />
        </Modal>
      </div>
    )
  }
}
export default ExportModal
