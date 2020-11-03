import React, { useContext, useState, useEffect, useRef } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { ContextAuth } from '../contextAuth'
import { ContextConMenu } from '../contextmenu/contextConMenu'
import { ContextMain } from './contextMain'
import { ContextIndicatorOnline } from '../indicatorOnline/contextIndicatorOnline'

import { getUserId } from '../../utils/functions'
import { socketsClient } from '../../sockets/sockets'
import { CLIENT__SET_STATUS, CLIENT__GET_STATUS, CLIENT__CHECK_FRIEND, 
    CLIENT__GET_CHECKED_FRIEND, REQUEST__FIND_OUT_INQUIRIES_FROM_FRIENDS } from '../../types/socket'

import config from '../../config.json'

export const MainState = ({ children }) => {
    const auth         = useContext(ContextAuth)
    const { request }  = useHttp()
    const contextmenu  = useContext(ContextConMenu)
    const { setStatusIO } = useContext(ContextIndicatorOnline)

    const [infoUser, setInfoUser]  = useState(null)
    const [rerender, setRerender]  = useState(false)

    const [listRequestFriends, 
            setListRequestFriends] = useState(null)

    const [finishLoading, setFinishLoading]   = useState(false)
    const [createdMyRooms, setCreatedMyRooms] = useState([])

    const [infoUserDialogs, setInfoUserDialogs] = useState([])
    const userDialogArray                       = useRef([])
    const [isReloading, setIsReloading]         = useState(false)

    const countErrors = useRef(0)


    useEffect(() => {
        const wrap = async () => {
            try {
                setIsReloading(true)

                const response = await request(`${config.hostServer}/api/getInfo/user`, 'GET', null, {
                    Authorization: `Bearer ${auth.token}`
                })   
                
                const requestFriends = await request(`${config.hostServer}/api/friends/listRequestFriends`, 'GET', null, {
                    Authorization: `Bearer ${auth.token}`
                })
                
                const createdMyRoomsServer = await request(`${config.hostServer}/api/room/getMyRooms`, 'GET', null, {
                    Authorization: `Bearer ${auth.token}`
                })

                const listDialogs = await request(`${config.hostServer}/api/dialogs/getAllDialogs`, 'GET', null, {
                    Authorization: `Bearer ${auth.token}`
                })

                listDialogs.map(async dialog => {
                    if (auth.userId === dialog.author) {
                        const dataInfoUsersDialogsAuthor = await request(`${config.hostServer}/api/getInfo/user/byId`, 'POST', {id: dialog.partner})
                        userDialogArray.current.push({...dialog, ...dataInfoUsersDialogsAuthor})

                        setInfoUserDialogs([...userDialogArray.current])
                    } else {
                        const dataInfoUsersDialogsPartner = await request(`${config.hostServer}/api/getInfo/user/byId`, 'POST', {id: dialog.author})
                        userDialogArray.current.push({...dialog, ...dataInfoUsersDialogsPartner})

                        setInfoUserDialogs([...userDialogArray.current])
                    }
                })

                contextmenu.setOptionsEachCM(requestFriends.userFriends.length)

                setInfoUser(response)
                setListRequestFriends(requestFriends)
                setCreatedMyRooms(createdMyRoomsServer)

                setTimeout(() => {
                    setFinishLoading(true)
                }, 3000)
            

                countErrors.current = 0
                userDialogArray.current = []

                setIsReloading(false)

            } catch (e) {
                if (countErrors.current >= 5) return

                if (e.message === 'Пользователь не авторизован!') {
                    const data = await request(`${config.hostServer}/api/auth/token/refresh`, 'POST', { userId: auth.userId, oldToken: auth.token })
                    auth.login(data.token, data.userId)
                }
                
                countErrors.current++
                
                setRerender(!rerender)
            }
        }
        wrap()
    }, [request, auth.userId, rerender])


    useEffect(() => {
        const wrap = async () => {
            socketsClient.connect()

            const uID = await getUserId(() => setRerender(!rerender))

            socketsClient.socket.emit(CLIENT__SET_STATUS, {
                userId: uID,
                typeStatus:'online'
            })

            setStatusIO('online')

            socketsClient.socket.on(CLIENT__GET_STATUS, async ({ friend }) => {
                socketsClient.socket.emit(CLIENT__CHECK_FRIEND, ({ uID, friend })) 
            })

            socketsClient.socket.on(CLIENT__GET_CHECKED_FRIEND, async ({ isMyFriend }) => { 
                if (isMyFriend) {

                    const requestFriends = await request(`${config.hostServer}/api/friends/listRequestFriends`, 'GET', null, {
                        Authorization: `Bearer ${auth.token}`
                    })
    
                    setListRequestFriends(requestFriends)
                }
            })

            socketsClient.socket.on(REQUEST__FIND_OUT_INQUIRIES_FROM_FRIENDS, async () => {
                const requestFriends = await request(`${config.hostServer}/api/friends/listRequestFriends`, 'GET', null, {
                    Authorization: `Bearer ${auth.token}`
                })

                setListRequestFriends(requestFriends)
            })
        }
        wrap()

        return () => {
            socketsClient.socket.off(CLIENT__GET_STATUS)
            socketsClient.socket.off(CLIENT__GET_CHECKED_FRIEND)
            socketsClient.socket.off(REQUEST__FIND_OUT_INQUIRIES_FROM_FRIENDS)
            socketsClient.disconnect()
        }
    }, [])

    return (
        <ContextMain.Provider value={{infoUser, listRequestFriends, finishLoading, createdMyRooms, rerender, setRerender, infoUserDialogs, isReloading }}>
            {children}
        </ContextMain.Provider>
    )
}