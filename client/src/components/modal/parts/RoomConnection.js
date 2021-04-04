import React, { useState, useContext } from 'react'
import classnames from 'classnames'
import { useHttp } from '../../../hooks/http.hook'
import { useAuth } from '../../../hooks/auth.hook'
import { Input } from '../../input/Input'
import { Button } from '../../button/Button'
import { ContextAlert } from '../../../contexts/alert/contextAlert'
import { ContextModal } from '../../../contexts/modal/contextModal'

import { CONNECT_TO_ROOM } from '../../../types/modal'

import config from '../../../config.json'
import './parts.scss'

export const RoomConnection = () => {
  const { request } = useHttp()
  const { token } = useAuth()
  const alert = useContext(ContextAlert)
  const modal = useContext(ContextModal)

  const [inputRoomId, setInputRoomId] = useState('')
  const [inputSecurityKey, setInputSecurityKey] = useState('')
  const [dataFromServer, setDataFromServer] = useState(null)

  const onJoinToRoom = async () => {
    try {
      const response = await request(
        `${config.hostServer}/api/room/join`,
        'POST',
        {
          roomId: inputRoomId,
          securityKey: inputSecurityKey,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )

      setDataFromServer(response)

      if (response?.done) {
        alert.show('success', response.message, 'Успешно!')
        modal.hide(CONNECT_TO_ROOM)
      }
    } catch (e) {
      alert.show('danger', e.message, 'Ошибка!')
    }
  }

  return (
    <div className='room-connection'>
      <div
        className={classnames('container-inputs', {
          'flight-hidden': dataFromServer?.isSecurity,
        })}
      >
        <Input
          style={{ width: '100%' }}
          placeholder='Введите ID комнаты'
          value={inputRoomId}
          onChange={e => setInputRoomId(e.target.value)}
        />
        <Input
          style={{ width: '100%' }}
          placeholder='Введите ключ доступа'
          value={inputSecurityKey}
          onChange={e => setInputSecurityKey(e.target.value)}
        />
      </div>

      <Button
        text='Присоединиться'
        classNames='btn primary w-100-i mt-1-i'
        onClick={onJoinToRoom}
      />
    </div>
  )
}
