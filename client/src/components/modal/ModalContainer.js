import React, { useContext } from 'react'
import { Modal } from './Modal'
import { ContextModal } from '../../contexts/modal/contextModal'

export const ModalContainer = ({
  disabledArea = 'footer',
  style = { width: 500 },
}) => {
  const modal = useContext(ContextModal)

  return (
    <Modal
      title={modal.title[modal.type]}
      size={modal.style[modal.type]}
      style={style}
      action={modal.type}
      disabledArea={disabledArea}
    >
      {modal.child}
    </Modal>
  )
}
