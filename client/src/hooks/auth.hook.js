import { useState, useCallback, useEffect } from 'react'
import { socketsClient } from '../sockets/sockets'
import { getUserId } from '../utils/functions'

import { CLIENT__SET_STATUS } from '../types/socket'
import config from '../config.json'

export const useAuth = () => {
    const [token, setToken]   = useState(null)
    const [userId, setUserId] = useState(null)

    const storageName = config.nameDataLocalStorage

    const login = useCallback((jwtToken, id) => {

        localStorage.setItem(storageName, JSON.stringify({
            userId:id, token:jwtToken
        }))

        setToken(jwtToken)
        setUserId(id)

    }, [storageName])


    const logout = useCallback(async () => {
        const uID = await getUserId()
        
        socketsClient.socket.emit(CLIENT__SET_STATUS, {
            userId: uID,
            typeStatus:'offline'
        })
        
        socketsClient.disconnect()

        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
        
        window.location.replace('/login')
    }, [storageName])


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }

    }, [login, storageName])

    return { token, login, logout, userId }
}
