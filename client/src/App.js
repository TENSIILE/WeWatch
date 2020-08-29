import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { ContextAuth } from './contexts/contextAuth'
import { AlertState } from './contexts/alert/alertState'


const App = () => {
    const { token, login, logout, userId } = useAuth()
    const isAuthenticated = !!token
    const routes          = useRoutes(isAuthenticated)

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