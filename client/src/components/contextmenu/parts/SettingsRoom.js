import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ContextConMenu } from '../../../contexts/contextmenu/contextConMenu'
import { ContextAuth } from '../../../contexts/contextAuth'
import { ContextMain } from '../../../contexts/mainPage/contextMain'

export const SettingsRoom = () => {
  const contextmenu = useContext(ContextConMenu)
  const { roomHook } = useContext(ContextMain)
  const auth = useContext(ContextAuth)
  const params = useParams()

  const logoutFromRoom = async () => {
    contextmenu.hideAll()
    roomHook.onDisconnect(params.id, auth.userId)
  }

  return (
    <ul>
      <li>Настройки комнаты</li>
      <hr />
      <li className='danger' onClick={logoutFromRoom}>
        Выйти из комнаты
      </li>
    </ul>
  )
}
