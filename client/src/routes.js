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

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/home">
                    <MainPage>
                        <Home/>
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