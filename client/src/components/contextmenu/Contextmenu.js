import React from 'react'

import './contextmenu.scss'

export const Contextmenu = ({open = false, onClickParent, style}) => {
    return (
        <div className={`contextmenu menu-status ${open ? 'open' : ''}`} onClick={onClickParent} style={style}>
            <ul>
                <li className='indicator online'>В сети</li>
                <li className='indicator sleep'>Не активен</li>
                <li className='indicator breaker'>Не беспокоить
                    <span>Вы не будете получать уведомления на рабочем столе</span>
                </li>
                <li className='indicator offline'>Оффлайн</li>
                <hr/>
                <li className='danger'>Выйти</li>
            </ul>
        </div>
    )
}