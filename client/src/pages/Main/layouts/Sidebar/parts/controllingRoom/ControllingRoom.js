import React, { useState, useContext, useEffect } from 'react'
import classnames from 'classnames'
import { ReactSVG } from 'react-svg'
import { useHttp } from '../../../../../../hooks/http.hook'
import { Contextmenu } from '../../../../../../components/contextmenu/Contextmenu'
import { SwitchBtn } from '../../../../../../components/switch/Switch'
import { Item } from '../../../../../../components/itemsGroup/Item'
import { ButtonToggle } from '../../../../../../components/buttonToggle/ButtonToggle'
import { ContextChat } from '../../../../../../contexts/contextChat'
import { ContextMain } from '../../../../../../contexts/mainPage/contextMain'
import { ContextAuth } from '../../../../../../contexts/contextAuth'
import { ContextConMenu } from '../../../../../../contexts/contextmenu/contextConMenu'

import microphone from '../../../../../../static/icons/microphone.svg'
import webcamera from '../../../../../../static/icons/video-camera.svg'
import { webcam, display } from '../../../../../../static/icons/settings'
import plus from '../../../../../../static/icons/plus.svg'
import dots from '../../../../../../static/icons/three-dots-horizontal.svg'
import arrow from '../../../../../../static/icons/arrow-left.svg'
import slider from '../../../../../../static/img/img_slider.png'
import config from '../../../../../../config.json'
import './controllingRoom.scss'

export const ControllingRoom = ({ isRoom = false }) => {
  const { visibleSidebar, setVisibleSidebar } = useContext(ContextChat)
  const { roomHook } = useContext(ContextMain)
  const { token } = useContext(ContextAuth)
  const contextmenu = useContext(ContextConMenu)

  const [party, setParty] = useState([])
  const { request } = useHttp()

  useEffect(() => {
    const people = roomHook.partyRoom.map(async human => {
      return await request(
        `${config.hostServer}/api/getInfo/user/byId`,
        'POST',
        { id: human },
        { Authorization: `Bearer ${token}` }
      )
    })
    Promise.all(people).then(res => setParty(res))
  }, [roomHook.partyRoom])

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
            <h2>{roomHook.infoRoom.title}</h2>
          </div>
          <ReactSVG
            src={dots}
            className='icon-settings-room'
            onClick={() => contextmenu.show('settingsRoom')}
          />
          <Contextmenu
            open={contextmenu.visible.settingsRoom}
            view='settings-room'
            newClass='right'
          />
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
            <h3>Участники({roomHook.partyRoom.length})</h3>
            <ReactSVG src={plus} className='add-new-participant' />
          </header>
        </div>
      </div>

      <div className='list-participants beautiful-scrollbar mini'>
        <div className='wrapper-list-patricipant'>
          {party.map((user, i) => {
            return (
              <Item
                key={i}
                src={user.userAdditional.avatar}
                text={
                  user.userAdditional.name + ' ' + user.userAdditional.lastname
                }
                dotsActive={true}
                statusOnline={user.userAdditional.statusOnline}
                isListFriend={true}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
