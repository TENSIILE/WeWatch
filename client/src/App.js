import React from 'react'
import { useRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { ContextAuth } from './contexts/contextAuth'
import { AlertState } from './contexts/alert/alertState'


const App = () => {
    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token
    let routes = useRoutes(isAuthenticated)

    document.oncontextmenu = () => false

    return (
        <AlertState>
        <ContextAuth.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <BrowserRouter>
            <div className="containter">
                {routes}
            </div>
            </BrowserRouter>
        </ContextAuth.Provider>
        </AlertState>
    )
}

export default App 