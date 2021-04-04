import React from 'react'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'
import { MenuStatus } from './parts/MenuStatus'
import { AddFriendToRoom } from './parts/AddFriendToRoom'
import { ActionMyFriends } from './parts/ActionMyFriends'
import { AttachmentDataMessage } from './parts/AttachmentDataMessage'
import './contextmenu.scss'

export const Contextmenu = ({
  style,
  view = 'menu-status',
  name,
  newClass = '',
  open,
  fullData,
}) => {
  return (
    <CSSTransition
      in={open}
      classNames={'contextmenu_animate'}
      timeout={1000}
      mountOnEnter
      unmountOnExit
    >
      <div
        className={classnames(
          'contextmenu',
          [newClass],
          { 'action-over-my-friends': view === 'action-list-my-friends' },
          { 'menu-status': view === 'menu-status' },
          { 'friend-room': view === 'add-friend-to-room' },
          { 'attachment-data-message': view === 'attachment-data-message' }
        )}
        style={style}
        name={name}
      >
        {view === 'menu-status' && <MenuStatus />}
        {view === 'add-friend-to-room' && <AddFriendToRoom />}
        {view === 'action-list-my-friends' && (
          <ActionMyFriends fullDataFriend={fullData} />
        )}
        {view === 'attachment-data-message' && <AttachmentDataMessage />}
      </div>
    </CSSTransition>
  )
}
