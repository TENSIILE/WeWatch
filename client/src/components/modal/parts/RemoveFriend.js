import React, { useContext } from 'react'
import { Button } from '../../button/Button'
import { ContextModal } from '../../../contexts/modal/contextModal'
import { ContextGetInfo } from '../../../contexts/contextGetInfo'
import { ContextAlert } from '../../../contexts/alert/contextAlert'
import { ContextAuth } from '../../../contexts/contextAuth'
import { useHttp } from '../../../hooks/http.hook'

import { DELETE_FRIEND } from '../../../types/modal'
import config from '../../../config.json'

export const RemoveFriend = () => {
  const { rerender, setRerender } = useContext(ContextGetInfo)
  const modal = useContext(ContextModal)
  const alert = useContext(ContextAlert)
  const auth = useContext(ContextAuth)
  const { request } = useHttp()

  const deletePersonFromFriendsImportant = async () => {
    const data = await request(
      `${config.hostServer}/api/friends/remove`,
      'POST',
      { friendId: modal.data.user },
      {
        Authorization: `Bearer ${auth.token}`,
      }
    )
    setRerender(!rerender)
    modal.hide(DELETE_FRIEND)
    alert.show('primary', data.message, 'Отлично!')
  }

  return (
    <div style={{ display: 'flex' }}>
      <Button
        text='Отменить'
        classNames='btn simple'
        onClick={() => modal.hide(DELETE_FRIEND)}
      />
      <Button
        text='Удалить'
        classNames='btn danger half-opacity'
        style={{ width: '100%' }}
        onClick={deletePersonFromFriendsImportant}
      />
    </div>
  )
}
