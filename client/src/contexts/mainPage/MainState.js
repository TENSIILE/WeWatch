import React, { useContext, useState, useEffect, useRef } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { ContextAuth } from '../contextAuth'
import { ContextConMenu } from '../contextmenu/contextConMenu'
import { ContextMain } from './contextMain'
import { ContextIndicatorOnline } from '../indicatorOnline/contextIndicatorOnline'

import { getUserId } from '../../functions/functions'
import { socketsClient } from '../../sockets/sockets'

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

    const countErrors = useRef(0)

    useEffect(() => {
        const wrap = async () => {
            try {
                
                const response = await request(`${config.hostServer}/api/getInfo/user`, 'GET', null, {
                    Authorization: `Bearer ${auth.token}`
                })   
                
                const requestFriends = await request(`${config.hostServer}/api/friends/listRequestFriends`, 'GET', null, {
                    Authorization: `Bearer ${auth.token}`
                })
                
                const createdMyRoomsServer = await request(`${config.hostServer}/api/room/getMyRooms`, 'GET', null, {
                    Authorization: `Bearer ${auth.token}`
                })

                contextmenu.setOptionsEachCM(requestFriends.userFriends.length)
                
                setInfoUser(response)
                setListRequestFriends(requestFriends)
                setCreatedMyRooms(createdMyRoomsServer)

                setTimeout(() => {
                    setFinishLoading(true)
                }, 3000)

                countErrors.current = 0
               
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

            socketsClient.socket.emit('CLIENT::SET-STATUS', {
                userId: uID,
                typeStatus:'online'
            })

            setStatusIO('online')

            socketsClient.socket.on('CLIENT::GET-STATUS', async ({ friend }) => {
                console.log('Данные пришли от какого то чела', friend)
                
                socketsClient.socket.emit('CLIENT::CHECK_FRIEND', ({ uID, friend })) 
            })

            socketsClient.socket.on('CLIENT::GET_CHECKED_FRIEND', async ({ isMyFriend }) => {
                if (isMyFriend) {

                    const requestFriends = await request(`${config.hostServer}/api/friends/listRequestFriends`, 'GET', null, {
                        Authorization: `Bearer ${auth.token}`
                    })
    
                    setListRequestFriends(requestFriends)
                }
            })
        }
        wrap()

        return () => {
            socketsClient.socket.off('CLIENT::GET-STATUS')
            socketsClient.socket.off('CLIENT::GET_CHECKED_FRIEND')
        }
    }, [rerender, auth.token, request])

    return (
        <ContextMain.Provider value={{infoUser, listRequestFriends, finishLoading, createdMyRooms, rerender, setRerender }}>
            {children}
        </ContextMain.Provider>
    )
}