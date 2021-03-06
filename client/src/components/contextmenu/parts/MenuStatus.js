import React, { useContext } from 'react'
import { ContextAuth } from '../../../contexts/contextAuth'
import { ContextIndicatorOnline } from '../../../contexts/indicatorOnline/contextIndicatorOnline'
import { ContextConMenu } from '../../../contexts/contextmenu/contextConMenu'
import { ContextMain } from '../../../contexts/mainPage/contextMain'
import { socketsClient } from '../../../sockets/sockets'
import { CLIENT__SET_STATUS } from '../../../types/socket'
import '../contextmenu.scss'

export const MenuStatus = () => {
  const { userId } = useContext(ContextAuth)
  const { setStatusIO } = useContext(ContextIndicatorOnline)
  const contextmenu = useContext(ContextConMenu)
  const main = useContext(ContextMain)

  const changeStatusAccount = type => {
    socketsClient.socket.emit(CLIENT__SET_STATUS, {
      userId: userId,
      typeStatus: type,
    })
    contextmenu.hide('status')
    setStatusIO(type)
  }

  return (
    <ul>
      <li
        className='indicator online'
        onClick={() => changeStatusAccount('online')}
      >
        В сети
      </li>
      <li
        className='indicator sleep'
        onClick={() => changeStatusAccount('sleep')}
      >
        Не активен
      </li>
      <li
        className='indicator breaker'
        onClick={() => changeStatusAccount('not-disturb')}
      >
        Не беспокоить
      </li>
      <li
        className='indicator offline'
        onClick={() => changeStatusAccount('offline')}
      >
        Оффлайн
      </li>
      <hr />
      <li className='danger' onClick={main.logout}>
        Выйти
      </li>
    </ul>
  )
}
