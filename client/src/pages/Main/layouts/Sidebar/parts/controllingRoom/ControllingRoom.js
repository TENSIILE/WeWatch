import React, { useContext } from 'react'
import classnames from 'classnames'
import { ReactSVG } from 'react-svg'
import { SwitchBtn } from '../../../../../../components/switch/Switch'
import { Item } from '../../../../../../components/itemsGroup/Item'
import { ButtonToggle } from '../../../../../../components/buttonToggle/ButtonToggle'
import { ContextChat } from '../../../../../../contexts/contextChat'

import microphone from '../../../../../../static/icons/microphone.svg'
import webcamera from '../../../../../../static/icons/video-camera.svg'
import { webcam, display } from '../../../../../../static/icons/settings'

import plus from '../../../../../../static/icons/plus.svg'
import dots from '../../../../../../static/icons/three-dots-horizontal.svg'
import arrow from '../../../../../../static/icons/arrow-left.svg'

import slider from '../../../../../../static/img/img_slider.png'
import user from '../../../../../../static/img/user.jpg'

import './controllingRoom.scss'

export const ControllingRoom = ({ isRoom = false }) => {
  const { visibleSidebar, setVisibleSidebar } = useContext(ContextChat)

  return (
    <div className={`container-controling`}>
      <div className='wrapper-controlling'>
        <div
          className='minimize-window'
          onClick={() => setVisibleSidebar(!visibleSidebar)}
        >
          <ReactSVG
            src={arrow}
            className={classnames('arrow', { rotated: visibleSidebar })}
          />
        </div>
        <header>
          <div className='title'>
            <h2>Видео просмотр комнаты</h2>
            <span id='indicator-work-room' />
          </div>
          <ReactSVG src={dots} className='icon-settings-room' />
        </header>

        {!isRoom && (
          <div className='preview-video-room'>
            <img src={slider} alt='' />
          </div>
        )}

        <div className='change-of-status-in-room'>
          <div className='text'>
            <h3 id='personal-status-in-room'>Онлайн</h3>
            <span>Ваш статус в комнате</span>
          </div>
          <div className='switch-btn'>
            <SwitchBtn size='mini' />
          </div>
        </div>

        {isRoom && (
          <ButtonToggle.Container>
            <ButtonToggle icon={microphone} />
            <ButtonToggle icon={webcamera} />
            <ButtonToggle icon={webcam} />
            <ButtonToggle icon={display} />
          </ButtonToggle.Container>
        )}

        <div className='participants'>
          <header>
            <h3>Участники(8)</h3>
            <ReactSVG src={plus} className='add-new-participant' />
          </header>
        </div>
      </div>

      <div className='list-participants beautiful-scrollbar mini'>
        <div className='wrapper-list-patricipant'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
            i => {
              return (
                <Item
                  key={i}
                  src={user}
                  text={'Имя фамилия'}
                  dotsActive={true}
                  statusOnline={'offline'}
                  isListFriend={true}
                />
              )
            }
          )}
        </div>
      </div>
    </div>
  )
}
