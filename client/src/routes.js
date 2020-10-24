import React  from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MainPage } from './pages/Main/MainPage'
import { AuthPage } from './pages/Auth/AuthPage'
import { SignUp } from './pages/Auth/layouts/SignUp'
import { RestorePass } from './pages/Auth/layouts/RestorePass'
import { LogIn } from './pages/Auth/layouts/LogIn'

import { Profile } from './pages/Main/views/Profile/Profile'
import { Home } from './pages/Main/views/Home/Home'
import { Settings } from './pages/Main/views/Settings/Settings'
import { Search } from './pages/Main/views/Search/Search'

import { CreatingRoom } from './pages/Main/layouts/CreatingRoom/CreatingRoom'
import { LogicCreatingRoom } from './pages/Main/layouts/CreatingRoom/LogicCreatingRoom'
import { MainState } from './contexts/mainPage/MainState'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <MainState>
                <Switch>
                    <Route path="/home" exact>
                        <MainPage>
                            <Home/>
                        </MainPage>
                    </Route>
                    <Route path="/home/creating_room">
                        <MainPage>
                            <Home>
                                <LogicCreatingRoom>
                                    <CreatingRoom/>
                                </LogicCreatingRoom>
                            </Home>
                        </MainPage>
                    </Route>
                    <Route path="/search">
                        <MainPage>
                            <Search/>
                        </MainPage>
                    </Route>
                    <Route path="/settings">
                        <MainPage>
                            <Settings/>
                        </MainPage>
                    </Route>
                    <Route path="/profile">
                        <MainPage>
                            <Profile/>
                        </MainPage>
                    </Route>
                    
                    <Redirect to="/home"/>
                </Switch>
            </MainState>
        )
    }

    return (
        <Switch>
            <Route path="/login" exact>
                <AuthPage>
                    <LogIn/>
                </AuthPage>
            </Route>
            <Route path="/signup">
                <AuthPage>
                    <SignUp/>
                </AuthPage>
            </Route>
            <Route path="/login/restore">
                <AuthPage>
                    <RestorePass/>
                </AuthPage>
            </Route>
            {/* <Redirect to="/login"/> */}
        </Switch>
    )
}