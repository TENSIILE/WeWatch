import React from 'react'
import { Sidebar } from '../../blocks/Sidebar/Sidebar'

import './settings.scss'

export const Settings = () => {
    return (
        <>
            <Sidebar textEmpty='Здесь пусто, настроек пока нет'/>
            <div className='settings-area'>
                <h2>Настройки</h2>
                <hr/>
            </div>
        </>
    )
}