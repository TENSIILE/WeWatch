import React from 'react'
import { useRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { ContextAuth } from './contexts/contextAuth'

function App() {
  const {token, login, logout, userId} = useAuth()
  const isAuthenticated = !!token
  let routes = useRoutes(isAuthenticated)

  return (
    <ContextAuth.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <BrowserRouter>
        <div className="containter">
          {routes}
        </div>
      </BrowserRouter>
    </ContextAuth.Provider>
  )
}

export default App 