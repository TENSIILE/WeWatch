import React, { useContext } from 'react'
import classnames from 'classnames'
import { ContextSettings } from '../../../../contexts/settingsPage/contextSettings'
import { MAXIMALIZE_SIDEBAR } from '../../../../types/settingsSwitchBtn'

import './sidebar.scss'

export const Sidebar = ({ 
    newClass = "",
    children = null
}) => {
    const settings = useContext(ContextSettings)
    return (
        <div className={classnames(
            'sidebar',
            [newClass], 
            {'minimalize-sidebar': settings.switchBtn[MAXIMALIZE_SIDEBAR]})}
        >
            {
                children && children
            }
        </div>
    )
}