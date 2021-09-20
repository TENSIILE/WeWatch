import React, { useState, useEffect, useContext } from 'react'
import classnames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { Badge } from '../../../../components/badge/Badge'
import { Image } from '../../../../components/image/Image'
import { Contextmenu } from '../../../../components/contextmenu/Contextmenu'
import { IndicatorOnline } from '../../../../components/indicatorOnline/IndicatorOnline'
import { ButtonMini } from '../../../../components/buttonMini/ButtonMini'
import { ContextGetInfo } from '../../../../contexts/contextGetInfo'
import { ContextBadge } from '../../../../contexts/contextBadge'
import { ContextConMenu } from '../../../../contexts/contextmenu/contextConMenu'
import { ContextIndicatorOnline } from '../../../../contexts/indicatorOnline/contextIndicatorOnline'
import { ContextMain } from '../../../../contexts/mainPage/contextMain'

import Home from '../../../../static/icons/Home.svg'
import Video from '../../../../static/icons/Play.svg'
import Chat from '../../../../static/icons/Edit-tools.svg'
import Search from '../../../../static/icons/Search.svg'
import Settings from '../../../../static/icons/Settings.svg'
import user from '../../../../static/img/user.jpg'
import './mainMenu.scss'

export const MainMenu = () => {
  const { infoUser } = useContext(ContextGetInfo)
  const { textBadge, textBadgeChat } = useContext(ContextBadge)
  const contextmenu = useContext(ContextConMenu)
  const { statusIO } = useContext(ContextIndicatorOnline)
  const { roomHook } = useContext(ContextMain)

  const [focus, setFocus] = useState({ home: true })
  const defaultFocus = {
    home: false,
    room: false,
    chat: false,
    search: false,
    settings: false,
    profile: false,
  }

  const location = useLocation()

  const page = location.pathname
    .substring(1, location.pathname.length)
    .split('/')[0]

  useEffect(() => {
    setFocus({
      ...defaultFocus,
      [page]: true,
    })
  }, [page])

  const setActiveButtonsOnClick = event => {
    setFocus({
      ...defaultFocus,
      [event.target.closest('button').id]: true,
    })
  }

  return (
    <div className='main-menu'>
      <div className='logo'>
        <h6>Ww</h6>
      </div>
      <div className='menu'>
        <Link to='/home'>
          <ButtonMini
            icon={Home}
            id='home'
            onClick={setActiveButtonsOnClick}
            focus={focus.home}
          />
        </Link>
        <Link
          to={`/room/${roomHook.roomId}`}
          className={classnames({ disabled: !roomHook.isConnected })}
        >
          <ButtonMini
            icon={Video}
            id='room'
            onClick={setActiveButtonsOnClick}
            focus={focus.room}
          />
        </Link>
        <Link to='/chat'>
          <ButtonMini
            icon={Chat}
            id='chat'
            onClick={setActiveButtonsOnClick}
            focus={focus.chat}
          />
          <Badge text={textBadgeChat} />
        </Link>
        <Link to='/search'>
          <ButtonMini
            icon={Search}
            id='search'
            onClick={setActiveButtonsOnClick}
            focus={focus.search}
          />
          <Badge text={textBadge} />
        </Link>
        <Link to='/settings/account'>
          <ButtonMini
            icon={Settings}
            id='settings'
            onClick={setActiveButtonsOnClick}
            focus={focus.settings}
          />
        </Link>
      </div>
      <div className='profile'>
        <Link to='/profile'>
          <ButtonMini
            icon=''
            id='profile'
            onClick={setActiveButtonsOnClick}
            onClickRightButton={() => contextmenu.show('status')}
            focus={focus.profile}
            style={{ width: 55, height: 55 }}
          >
            <IndicatorOnline status={statusIO} newClass='no-transition' />
            <Image
              src={!!infoUser ? infoUser.userAdditional.avatar : user}
              id='avatar'
            />
          </ButtonMini>
        </Link>
        <Contextmenu open={contextmenu.visible.status} />
      </div>
    </div>
  )
}
