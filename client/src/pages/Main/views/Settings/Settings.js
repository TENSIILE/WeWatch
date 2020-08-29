import React from 'react'
import { Sidebar } from '../../layouts/Sidebar/Sidebar'

import './settings.scss'

export const Settings = () => {
    return (
        <>
            <Sidebar textEmpty='Здесь пусто, настроек пока нет'/>
            <div className='settings-area region'>
                <h2>Настройки</h2>
                <hr id='title-border-bottom'/>
            </div>
        </>
    )
}