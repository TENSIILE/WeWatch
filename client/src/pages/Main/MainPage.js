import React, { useEffect, useState, useContext } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { MainMenu } from './blocks/MainMenu/MainMenu'
import { Alert } from '../../components/alert/Alert'
import { ContextAuth } from '../../contexts/contextAuth'
import { ContextGetInfo } from '../../contexts/contextGetInfo'
import { ContextAlert } from '../../contexts/alert/contextAlert'

import config from '../../config.json'

import './Main.scss'

export const MainPage = ({children}) => {
    const auth        = useContext(ContextAuth)
    const alert       = useContext(ContextAlert)
    const { request } = useHttp()

    const [infoUser, setInfoUser] = useState(null)
    const [rerender, setRerender] = useState(false)

    const getUserId = () => {
        return new Promise(resolve => {
            let userID = auth.userId

            if (userID === null) return

            resolve(userID)
        })
    }

    useEffect(() => {
        const wrap = async () => {
            try {
                const uID = await getUserId()
                
                const response = await request(`${config.hostServer}/getInfo/user?userId=${uID}`, 'GET')   
                setInfoUser(response)
               
            } catch (e) {
                console.log("ошибка!")   
            }
        }
        wrap()
    }, [request, auth.userId, rerender])

    return (
        <ContextGetInfo.Provider value={{infoUser, rerender, setRerender}}>
            <Alert {...alert.configAlert}/>
            <div className='wrapper'>
                <MainMenu/>
                <div className='main-content'>
                    {children}
                </div>
            </div>
        </ContextGetInfo.Provider>
    )
}
