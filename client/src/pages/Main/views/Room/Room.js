import React from 'react'
import classnames from 'classnames'
import { ReactSVG } from 'react-svg'
import { Sidebar } from '../../layouts/Sidebar/Sidebar'
import { ControllingRoom } from '../../layouts/Sidebar/parts/controllingRoom/ControllingRoom'

import groupCall from '../../../../static/icons/GroupVideoCall.svg'
import './room.scss'

export const Room = () => {
  return (
    <>
      <div className='container-room'>
        <div className='empty-without-video'>
          <ReactSVG src={groupCall} />
          <span id='text-empty'>Видео не установлено!</span>
        </div>
      </div>

      <Sidebar
        newClass={classnames('controlling-current-room sidebar-room', {
          rollUp: false,
        })}
      >
        <ControllingRoom isRoom={true} />
      </Sidebar>
    </>
  )
}
