import React, { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { MainMenu } from './blocks/MainMenu/MainMenu'
import { ContextGetInfo } from '../../contexts/contextGetInfo'

import config from '../../config.json'

import './Main.scss'

export const MainPage = ({children}) => {
    const { request } = useHttp()

    const [infoUser, setInfoUser] = useState(null)

    useEffect(() => {
        const wrap = async () => {
            let data = JSON.parse(localStorage.getItem('userData'))
            const response = await request(`${config.hostServer}/getInfo/user?userId=${data.userId}`, 'GET')   
            setInfoUser(response)
        }
        wrap()
    }, [request])


    return (
        <ContextGetInfo.Provider value={{infoUser}}>
            <div className='wrapper'>
                <MainMenu/>
                <div className='main-content'>
                    {children}
                </div>
            </div>
        </ContextGetInfo.Provider>
    )
}
