import React from 'react'
import { Sidebar } from '../../layouts/Sidebar/Sidebar'
import { SettingItems } from '../../layouts/Sidebar/parts/settingItems/SettingItems'
import { RootSettingsChildren } from '../../layouts/Settings/RootSettings'

import './settings.scss'

export const Settings = () => {
    return (
        <>
            <Sidebar>
                <SettingItems/>
            </Sidebar>
            
            <div className='settings-area m-width-400 region scroll beautiful-scrollbar mini'>
                <h2>Настройки</h2>
                <hr id='title-border-bottom'/>
                <RootSettingsChildren/> 
            </div>
        </>
    )
}