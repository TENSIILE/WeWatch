import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { ContextAuth } from './contexts/contextAuth'
import { AlertState } from './contexts/alert/alertState'
import { ContextMenuState } from './contexts/contextmenu/contextmenuState'
import { ModalState } from './contexts/modal/modalState'
import { IndicatorOnlineState } from './contexts/indicatorOnline/indicatorOnlineState'
import { SettingsState } from './contexts/settingsPage/settingsState'

const App = () => {
  const { token, login, logout, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  document.oncontextmenu = () => false

  return (
    <ContextMenuState>
      <AlertState>
        <ModalState>
          <ContextAuth.Provider
            value={{
              token,
              login,
              logout,
              userId,
              isAuthenticated,
            }}
          >
            <IndicatorOnlineState>
              <BrowserRouter>
                <SettingsState>
                  <div className='container'>{routes}</div>
                </SettingsState>
              </BrowserRouter>
            </IndicatorOnlineState>
          </ContextAuth.Provider>
        </ModalState>
      </AlertState>
    </ContextMenuState>
  )
}

export default App
