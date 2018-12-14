import React from 'react'
import Modal from '../../../components/Modal'
import ModalButton from '../../../components/Modal/ModalButton'


const DeleteDefinition = ({ show, onCancel, onOk, t }) => {
  let buttons = [
    <ModalButton icon="times" typeButton="danger" key="1" onClick={onCancel}>
      {t('Cancel')}
    </ModalButton>,
    <ModalButton icon="check" typeButton="success" key="2" onClick={onOk}>
      {t('Ok')}
    </ModalButton>
  ]
  return (
    <div>
      <Modal
        buttons={buttons}
        title={t('Delete Definition')}
        iconTitle="times"
        extraStyles={{ maxWidth: '350px' }}
        show={show}
      >
        {t('Are you sure to delete this definition?')}
      </Modal>
    </div>
  )
}

export default DeleteDefinition
