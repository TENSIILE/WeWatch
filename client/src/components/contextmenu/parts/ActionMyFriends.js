import React, { useContext } from 'react'
import { ContextConMenu } from '../../../contexts/contextmenu/contextConMenu'
import { ContextModal } from '../../../contexts/modal/contextModal'
import { DELETE_FRIEND } from '../../../types/components'

export const ActionMyFriends = ({ data }) => {
    const modal       = useContext(ContextModal)
    const contextmenu = useContext(ContextConMenu)

    const modalActive = () => {
        contextmenu.hideAll()
        modal.setType(DELETE_FRIEND)
        modal.changeTitle(DELETE_FRIEND, 'Вы действительно хотите удалить данного человека из друзей?')
        modal.changeStyle(DELETE_FRIEND, 'little height-unset')
        modal.show(DELETE_FRIEND)
        modal.installInputData(data)
    }
    return (
        <>
            <ul>
                <li>Профиль</li>
                <li>Написать сообщение</li>
                <hr/>
                <li className='danger' onClick={modalActive}>Удалить из друзей</li>
            </ul>
        </>
    )
}