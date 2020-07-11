import React  from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MainPage } from './pages/Main/MainPage'
import { AuthPage } from './pages/Auth/AuthPage'
import { SignUp } from './pages/Auth/blocks/SignUp'
import { RestorePass } from './pages/Auth/blocks/RestorePass'
import { LogIn } from './pages/Auth/blocks/LogIn'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <MainPage/>
                </Route>
                <Redirect to="/"/>
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
            <Route path="/signup" exact>
                <AuthPage>
                    <SignUp/>
                </AuthPage>
            </Route>
            <Route path="/login/restore" exact>
                <AuthPage>
                    <RestorePass/>
                </AuthPage>
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
}