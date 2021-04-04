import React, { useContext, useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { ContextAuth } from '../contextAuth'
import { ContextConMenu } from '../contextmenu/contextConMenu'
import { ContextMain } from './contextMain'
import { ContextIndicatorOnline } from '../indicatorOnline/contextIndicatorOnline'
import { ContextSettings } from '../settingsPage/contextSettings'

import { getUserId } from '../../utils/functions'
import { SystemHotkey } from '../../utils/SystemHotKey'
import { socketsClient } from '../../sockets/sockets'
import {
  CLIENT__SET_STATUS,
  CLIENT__GET_STATUS,
  CLIENT__CHECK_FRIEND,
  CLIENT__GET_CHECKED_FRIEND,
  REQUEST__FIND_OUT_INQUIRIES_FROM_FRIENDS,
  DIALOG__GET_MESSAGE,
  DIALOG__CONNECTION,
} from '../../types/socket'
import { PASS_USER } from '../../types/settingsSwitchBtn'

import config from '../../config.json'

export const MainState = ({ children }) => {
  const auth = useContext(ContextAuth)
  const { request } = useHttp()
  const contextmenu = useContext(ContextConMenu)
  const { setStatusIO } = useContext(ContextIndicatorOnline)
  const settings = useContext(ContextSettings)

  const history = useHistory()

  const [infoUser, setInfoUser] = useState(null)
  const [rerender, setRerender] = useState(false)

  const [listRequestFriends, setListRequestFriends] = useState(null)

  const [finishLoading, setFinishLoading] = useState(false)
  const [createdMyRooms, setCreatedMyRooms] = useState([])

  const [infoUserDialogs, setInfoUserDialogs] = useState([])
  const userDialogArray = useRef([])

  const [isReloading, setIsReloading] = useState(false)
  const [ttlCountUnrMsg, setTtlCountUnrMsg] = useState(0)

  const [inputDevices, setInputDevices] = useState([])

  const countErrors = useRef(0)

  const updateFriendsData = async () => {
    const requestFriends = await request(
      `${config.hostServer}/api/friends/listRequestFriends`,
      'GET',
      null,
      {
        Authorization: `Bearer ${auth.token}`,
      }
    )

    setListRequestFriends(requestFriends)
  }

  const updateDialogsAndMessages = async () => {
    const listDialogs = await request(
      `${config.hostServer}/api/dialogs/getAllDialogs`,
      'GET',
      null,
      {
        Authorization: `Bearer ${auth.token}`,
      }
    )

    listDialogs.map(async dialog => {
      if (auth.userId === dialog.author) {
        const dataInfoUsersDialogsAuthor = await request(
          `${config.hostServer}/api/getInfo/user/byId`,
          'POST',
          { id: dialog.partner },
          { Authorization: `Bearer ${auth.token}` }
        )
        userDialogArray.current.push({
          ...dialog,
          ...dataInfoUsersDialogsAuthor,
        })

        setInfoUserDialogs([...userDialogArray.current])
      } else {
        const dataInfoUsersDialogsPartner = await request(
          `${config.hostServer}/api/getInfo/user/byId`,
          'POST',
          { id: dialog.author },
          { Authorization: `Bearer ${auth.token}` }
        )
        userDialogArray.current.push({
          ...dialog,
          ...dataInfoUsersDialogsPartner,
        })

        setInfoUserDialogs([...userDialogArray.current])
      }
    })
    userDialogArray.current = []
  }

  const onGetInputDevice = async () => {
    if (auth.userId) {
      const response = await request(
        `${config.hostServer}/api/securityAccount/input_devices/get`,
        'GET',
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      )
      setInputDevices(response)
    }
  }

  const logout = async () => {
    settings.changeSwitchBtn(PASS_USER, false)
    await settings.onSaveSettings()

    auth.logout()
  }

  const onSendImageProfileAsync = async (nameInput, ref) => {
    if (ref.current.files[0]) {
      const formData = new FormData()
      formData.append(nameInput, ref.current.files[0])
      formData.append('userId', auth.userId)

      const options = {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }

      await fetch(`${config.hostServer}/upload/${nameInput}`, options)
      setRerender(!rerender)
    }
  }

  useEffect(() => {
    infoUserDialogs.map(dialog => {
      socketsClient.socket.emit(DIALOG__CONNECTION, { dialogId: dialog._id })
    })
  }, [infoUserDialogs])

  useEffect(() => {
    const wrap = async () => {
      try {
        setIsReloading(true)

        const response = await request(
          `${config.hostServer}/api/getInfo/user`,
          'GET',
          null,
          {
            Authorization: `Bearer ${auth.token}`,
          }
        )

        const requestFriends = await request(
          `${config.hostServer}/api/friends/listRequestFriends`,
          'GET',
          null,
          {
            Authorization: `Bearer ${auth.token}`,
          }
        )

        const createdMyRoomsServer = await request(
          `${config.hostServer}/api/room/getMyRooms`,
          'GET',
          null,
          {
            Authorization: `Bearer ${auth.token}`,
          }
        )

        await updateDialogsAndMessages()

        contextmenu.setOptionsEachCM(requestFriends.userFriends.length)

        setInfoUser(response)
        setListRequestFriends(requestFriends)
        setCreatedMyRooms(createdMyRoomsServer)

        await onGetInputDevice()

        setTimeout(() => setFinishLoading(true), 3000)

        countErrors.current = 0
        userDialogArray.current = []

        setIsReloading(false)
      } catch (e) {
        if (countErrors.current >= 5) return

        if (e.message === 'Пользователь не авторизован!') {
          await logout()
        }

        countErrors.current++

        setRerender(!rerender)
      }
    }
    wrap()
  }, [request, auth, rerender])

  useEffect(() => {
    const wrap = async () => {
      socketsClient.connect()

      const uID = await getUserId(() => setRerender(!rerender))

      socketsClient.socket.emit(CLIENT__SET_STATUS, {
        userId: uID,
        typeStatus: 'online',
      })

      setStatusIO('online')

      socketsClient.socket.on(CLIENT__GET_STATUS, async ({ friend }) => {
        socketsClient.socket.emit(CLIENT__CHECK_FRIEND, { uID, friend })
      })

      socketsClient.socket.on(
        CLIENT__GET_CHECKED_FRIEND,
        async ({ isMyFriend }) => {
          if (isMyFriend) await updateFriendsData()
        }
      )

      socketsClient.socket.on(
        REQUEST__FIND_OUT_INQUIRIES_FROM_FRIENDS,
        async () => {
          await updateFriendsData()
        }
      )

      socketsClient.socket.on(DIALOG__GET_MESSAGE, async objMessage => {
        console.log('Ура, новое сообщение', objMessage)
        await updateDialogsAndMessages()
      })
    }
    wrap()

    new SystemHotkey(history)

    return () => {
      socketsClient.socket.off(CLIENT__GET_STATUS)
      socketsClient.socket.off(CLIENT__GET_CHECKED_FRIEND)
      socketsClient.socket.off(REQUEST__FIND_OUT_INQUIRIES_FROM_FRIENDS)
      socketsClient.disconnect()
    }
  }, [])

  return (
    <ContextMain.Provider
      value={{
        infoUser,
        listRequestFriends,
        finishLoading,
        createdMyRooms,
        rerender,
        setRerender,
        infoUserDialogs,
        isReloading,
        setInfoUserDialogs,
        ttlCountUnrMsg,
        setTtlCountUnrMsg,
        inputDevices,
        logout,
        onSendImageProfileAsync,
      }}
    >
      {children}
    </ContextMain.Provider>
  )
}
