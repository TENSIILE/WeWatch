import React, { useContext } from 'react'
import { ContextAuth } from '../../../contexts/contextAuth'
import { ContextIndicatorOnline } from '../../../contexts/indicatorOnline/contextIndicatorOnline'
import { ContextConMenu } from '../../../contexts/contextmenu/contextConMenu'

import { socketsClient } from '../../../sockets/sockets'

import '../contextmenu.scss'

export const MenuStatus = () => {
    const { logout, userId } = useContext(ContextAuth)
    const { setStatusIO } = useContext(ContextIndicatorOnline)
    const contextmenu     = useContext(ContextConMenu)

    const changeStatusAccount = type => {
        socketsClient.socket.emit('CLIENT::SET-STATUS', {
            userId: userId,
            typeStatus:type
        })
        contextmenu.hide('status')
        setStatusIO(type)
    }

    return (
        <ul>
            <li className='indicator online' onClick={() => changeStatusAccount('online')}>В сети</li>
            <li className='indicator sleep' onClick={() => changeStatusAccount('sleep')}>Не активен</li>
            <li className='indicator breaker' onClick={() => changeStatusAccount('not-disturb')}>Не беспокоить
                <span>Вы не будете получать уведомления на рабочем столе</span>
            </li>
            <li className='indicator offline' onClick={() => changeStatusAccount('offline')}>Оффлайн</li>
            <hr/>
            <li className='danger' onClick={logout}>Выйти</li>
        </ul>
    )
}