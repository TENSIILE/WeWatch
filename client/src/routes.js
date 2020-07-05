import React  from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { AuthPage } from './pages/AuthPage'
import { SignUpPage } from './pages/SignUpPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/">
                    <MainPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/login" exact>
                <AuthPage/>
            </Route>
            <Route path="/signup" exact>
                <SignUpPage/>
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
}