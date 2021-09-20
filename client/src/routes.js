import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MainPage } from './pages/Main/MainPage'
import { AuthPage } from './pages/Auth/AuthPage'
import { SignUp } from './pages/Auth/layouts/SignUp'
import { RestorePass } from './pages/Auth/layouts/RestorePass'
import { LogIn } from './pages/Auth/layouts/LogIn'

import { Home } from './pages/Main/views/Home/Home'
import { Room } from './pages/Main/views/Room/Room'
import { Chat } from './pages/Main/views/Chat/Chat'
import { Search } from './pages/Main/views/Search/Search'
import { Settings } from './pages/Main/views/Settings/Settings'
import { Profile } from './pages/Main/views/Profile/Profile'

import { CreatingRoom } from './pages/Main/layouts/CreatingRoom/CreatingRoom'
import { LogicCreatingRoom } from './pages/Main/layouts/CreatingRoom/LogicCreatingRoom'
import { MainState } from './contexts/mainPage/MainState'
import { LogicChat } from './pages/Main/views/Chat/LogicChat'
import { SettingsState } from './contexts/settingsPage/settingsState'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <SettingsState>
        <MainState>
          <MainPage>
            <Switch>
              <Route path='/home' exact>
                <Home />
              </Route>
              <Route path='/home/creating_room'>
                <Home>
                  <LogicCreatingRoom>
                    <CreatingRoom />
                  </LogicCreatingRoom>
                </Home>
              </Route>
              <Route path='/room/:id'>
                <Room />
              </Route>
              <Route path='/chat/:id?'>
                <LogicChat>
                  <Chat />
                </LogicChat>
              </Route>
              <Route path='/search'>
                <Search />
              </Route>
              <Route path='/settings/:customization?'>
                <Settings />
              </Route>
              <Route path='/profile'>
                <Profile />
              </Route>

              <Redirect to='/home' />
            </Switch>
          </MainPage>
        </MainState>
      </SettingsState>
    )
  }

  return (
    <Switch>
      <Route path='/login' exact>
        <AuthPage>
          <LogIn />
        </AuthPage>
      </Route>
      <Route path='/signup'>
        <AuthPage>
          <SignUp />
        </AuthPage>
      </Route>
      <Route path='/login/restore'>
        <AuthPage>
          <RestorePass />
        </AuthPage>
      </Route>
      <Redirect to='/login' />
    </Switch>
  )
}
