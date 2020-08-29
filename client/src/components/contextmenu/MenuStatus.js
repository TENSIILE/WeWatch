import React, { useContext } from 'react'
import { ContextAuth } from '../../contexts/contextAuth'
import './contextmenu.scss'

export const MenuStatus = () => {
    const { logout } = useContext(ContextAuth)

    return (
        <ul>
            <li className='indicator online'>В сети</li>
            <li className='indicator sleep'>Не активен</li>
            <li className='indicator breaker'>Не беспокоить
                <span>Вы не будете получать уведомления на рабочем столе</span>
            </li>
            <li className='indicator offline'>Оффлайн</li>
            <hr/>
            <li className='danger' onClick={logout}>Выйти</li>
        </ul>
    )
}