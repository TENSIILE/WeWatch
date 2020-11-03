import React, { useContext, useCallback, useRef } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { ContextAuth } from '../../../contexts/contextAuth'
import { useHistory } from 'react-router-dom'
import { ContextConMenu } from '../../../contexts/contextmenu/contextConMenu'
import { ContextModal } from '../../../contexts/modal/contextModal'
import { ContextMain } from '../../../contexts/mainPage/contextMain'

import { DELETE_FRIEND } from '../../../types/modal'

import config from '../../../config.json'

export const ActionMyFriends = ({ data }) => {
    const modal       = useContext(ContextModal)
    const contextmenu = useContext(ContextConMenu)
    const auth        = useContext(ContextAuth)
    const main        = useContext(ContextMain)

    const history     = useHistory()
    const { request } = useHttp()

    const isExistsDialog = useRef(true)

    const modalActive = () => {
        contextmenu.hideAll()
        modal.setType(DELETE_FRIEND)
        modal.changeTitle(DELETE_FRIEND, 'Вы действительно хотите удалить данного человека из друзей?')
        modal.changeStyle(DELETE_FRIEND, 'little height-unset')
        modal.show(DELETE_FRIEND)
        modal.installInputData(data)
    }

    const startСommunication = useCallback(async () => {
        main.infoUserDialogs.forEach(dialog => {
            if ((dialog.author === auth.userId && dialog.partner === data) || (dialog.author === data && dialog.partner === auth.userId)) {
                isExistsDialog.current = true
                return history.push(`/chat/${dialog._id}`)
                
            } else {
                isExistsDialog.current = false
            }
        })

        if (!main.infoUserDialogs.length) {
            isExistsDialog.current = false
        } else return
    
        
        if (!isExistsDialog.current) {
            const { dialogId } = await request(`${config.hostServer}/api/dialogs/create`, 'POST', {partner: data}, {
                Authorization: `Bearer ${auth.token}`
            }) 

            main.setRerender(!main.rerender)
            history.push(`/chat/${dialogId}`)   
        }
        
    }, [main, request, history])


    return (
        <>
            <ul>
                <li>Профиль</li>
                <li onClick={startСommunication}>Написать сообщение</li>
                <hr/>
                <li className='danger' onClick={modalActive}>Удалить из друзей</li>
            </ul>
        </>
    )
}