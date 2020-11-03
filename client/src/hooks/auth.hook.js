import { useState, useCallback, useEffect, useContext } from 'react'
import { ContextIndicatorOnline } from '../contexts/indicatorOnline/contextIndicatorOnline'
import { socketsClient } from '../sockets/sockets'
import { getUserId } from '../utils/functions'

import config from '../config.json'

export const useAuth = () => {
    const [token, setToken]   = useState(null)
    const [userId, setUserId] = useState(null)

    const { setStatusIO } = useContext(ContextIndicatorOnline)

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
        
        socketsClient.socket.emit('CLIENT::SET-STATUS', {
            userId: uID,
            typeStatus:'offline'
        })

        socketsClient.disconnect()
        setStatusIO('offline')
        
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
        
        window.location.replace('/login')
    }, [storageName])


    useCallback(useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }

    }, [login,storageName]), [])

    return { token, login, logout, userId }
}
