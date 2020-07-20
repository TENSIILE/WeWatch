import React  from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MainPage } from './pages/Main/MainPage'
import { AuthPage } from './pages/Auth/AuthPage'
import { SignUp } from './pages/Auth/blocks/SignUp'
import { RestorePass } from './pages/Auth/blocks/RestorePass'
import { LogIn } from './pages/Auth/blocks/LogIn'

import { Profile } from './pages/Main/views/Profile/Profile'
import { Home } from './pages/Main/views/Home/Home'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/home">
                    <MainPage>
                        <Home/>
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
            <Route path="/login">
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