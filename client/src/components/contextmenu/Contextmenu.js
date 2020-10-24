import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { MenuStatus } from './parts/MenuStatus'
import { AddFriendToRoom } from './parts/AddFriendToRoom'
import { ActionMyFriends } from './parts/ActionMyFriends'

import './contextmenu.scss'

export const Contextmenu = ({ style, view = 'menu-status', name, newClass = '', open, data }) => {
    return (
        <CSSTransition 
            in={open} 
            classNames={'contextmenu_animate'} 
            timeout={1000} 
            mountOnEnter unmountOnExit
        >
            <div 
                className={`contextmenu ${newClass} ${view === 'action-list-my-friends' ? 'action-over-my-friends' : ''} ${view === 'menu-status' ? 'menu-status' : ''} ${view === 'add-friend-to-room' ? 'friend-room' : ''}`}    
                style={style}
                name={name}
            >
                {
                    view === 'menu-status' ? <MenuStatus/> : null
                }
                {
                    view === 'add-friend-to-room' ? <AddFriendToRoom/> : null
                }
                {
                    view === 'action-list-my-friends' ? <ActionMyFriends data={data}/> : null
                }
            </div>
         </CSSTransition>
    )
}