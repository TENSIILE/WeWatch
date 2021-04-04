import React, { useContext, useCallback, useRef } from 'react'
import classnames from 'classnames'

import { useHttp } from '../../../hooks/http.hook'
import { ContextAuth } from '../../../contexts/contextAuth'
import { useHistory } from 'react-router-dom'
import { ContextConMenu } from '../../../contexts/contextmenu/contextConMenu'
import { ContextModal } from '../../../contexts/modal/contextModal'
import { ContextMain } from '../../../contexts/mainPage/contextMain'
import { Loader } from '../../loader/Loader'

import { ViewProfile } from '../../modal/parts/ViewProfile'
import { RemoveFriend } from '../../modal/parts/RemoveFriend'

import { RussianName } from '../../../utils/deslensionOfWords'
import { DELETE_FRIEND, VIEW_PROFILE } from '../../../types/modal'

import config from '../../../config.json'

export const ActionMyFriends = ({ fullDataFriend }) => {
  const modal = useContext(ContextModal)
  const contextmenu = useContext(ContextConMenu)
  const auth = useContext(ContextAuth)
  const main = useContext(ContextMain)

  const history = useHistory()
  const { request, loading } = useHttp()

  const isExistsDialog = useRef(false)
  const dialogIdRef = useRef({})

  const russianNames = new RussianName(
    `${fullDataFriend.name} ${fullDataFriend.lastname}`
  )
  const nameLastNameRod = russianNames.fullName(russianNames.gcaseRod)

  const ViewProfileFuncComponent = React.createElement(ViewProfile)
  const RemoveFriendFuncComponent = React.createElement(RemoveFriend)

  const viewProfileModalActive = () => {
    contextmenu.hideAll()
    modal.changeTitle(VIEW_PROFILE, `Профиль: ${nameLastNameRod}`)
    modal.setChild(ViewProfileFuncComponent)
    modal.changeStyle(VIEW_PROFILE, 'height-unset margin-mini')
    modal.setType(VIEW_PROFILE)
    modal.installInputData(fullDataFriend)
    modal.show(VIEW_PROFILE)
  }

  const modalActive = () => {
    contextmenu.hideAll()
    modal.setType(DELETE_FRIEND)
    modal.setChild(RemoveFriendFuncComponent)
    modal.changeTitle(
      DELETE_FRIEND,
      <>
        Вы действительно хотите удалить{' '}
        <strong className='text-highlight'>{nameLastNameRod}</strong> из друзей?
      </>
    )
    modal.changeStyle(DELETE_FRIEND, 'little height-unset')
    modal.show(DELETE_FRIEND)
    modal.installInputData(fullDataFriend)
  }

  const startСommunication = useCallback(async () => {
    main.infoUserDialogs.forEach(dialog => {
      if (
        (dialog.author === auth.userId &&
          dialog.partner === fullDataFriend.user) ||
        (dialog.author === fullDataFriend.user &&
          dialog.partner === auth.userId)
      ) {
        isExistsDialog.current = true
        dialogIdRef.current = { id: dialog._id, isExists: true }
        return history.push(`/chat/${dialog._id}`)
      } else isExistsDialog.current = false
    })

    if (dialogIdRef.current.isExists) {
      return history.push(`/chat/${dialogIdRef.current.id}`)
    }

    if (main.infoUserDialogs.length) {
      if (isExistsDialog.current) return

      isExistsDialog.current = false
    }

    if (!isExistsDialog.current) {
      const { dialogId } = await request(
        `${config.hostServer}/api/dialogs/create`,
        'POST',
        { partner: fullDataFriend.user },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      )

      main.setRerender(!main.rerender)
      history.push(`/chat/${dialogId}`)
    }
  }, [main, request, history, fullDataFriend, auth.token, auth.userId])

  return (
    <>
      <ul>
        <li onClick={viewProfileModalActive}>Профиль</li>
        <li
          onClick={startСommunication}
          className={classnames({ extended: loading })}
        >
          {loading ? <Loader /> : 'Написать сообщение'}
        </li>
        <hr />
        <li className='danger' onClick={modalActive}>
          Удалить из друзей
        </li>
      </ul>
    </>
  )
}
