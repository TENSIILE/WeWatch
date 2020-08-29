import React from 'react'
import { MenuStatus } from './MenuStatus'
import './contextmenu.scss'

export const Contextmenu = ({ open = false, onClickParent, style, view = 'menu-status' }) => {
    return (
        <div className={`contextmenu menu-status ${open ? 'open' : ''}`} onClick={onClickParent} style={style}>
            {
                view === 'menu-status' ?  <MenuStatus/> : null
            }
        </div>
    )
}