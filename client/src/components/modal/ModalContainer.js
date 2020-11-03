import React, { useContext } from 'react'
import { Modal } from './Modal'
import { ContextModal } from '../../contexts/modal/contextModal'
import { RemoveFriend } from './parts/RemoveFriend'
import { DELETE_FRIEND } from '../../types/modal'


export const ModalContainer = ({ disabledArea = 'footer', style = {width:500} }) => {
    const modal = useContext(ContextModal)
    
    return (
        <Modal 
            title={modal.title[modal.type]}
            size={modal.style[modal.type]}
            style={style}
            action={modal.type}
            disabledArea={disabledArea}
        >
            {
                modal.type === DELETE_FRIEND ? (
                    <RemoveFriend/>
                ) : modal.child
            }  
        </Modal>
    )
}