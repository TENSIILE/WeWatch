import { useState, useCallback, useEffect } from 'react'

export const useAuth = () => {
    const [token, setToken]   = useState(null)
    const [userId, setUserId] = useState(null)

    const storageName = 'userData'

    const login = useCallback((jwtToken, id) => {

        localStorage.setItem(storageName, JSON.stringify({
            userId:id, token:jwtToken
        }))

        setToken(jwtToken)
        setUserId(id)

    }, [])


    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])


    useCallback(useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }

    }, [login]), [])

    return { token, login, logout, userId }
}
