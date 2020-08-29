import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { MainMenu } from './layouts/MainMenu/MainMenu'
import { Alert } from '../../components/alert/Alert'
import { Preloader } from '../../components/preloader/Preloader'
import { ContextAuth } from '../../contexts/contextAuth'
import { ContextGetInfo } from '../../contexts/contextGetInfo'
import { ContextAlert } from '../../contexts/alert/contextAlert'
import { ContextBadge } from '../../contexts/contextBadge'
import { ContextConMenu } from '../../contexts/contextConMenu'

import config from '../../config.json'

import './Main.scss'

export const MainPage = ({children}) => {
    const auth        = useContext(ContextAuth)
    const alert       = useContext(ContextAlert)
    const { request } = useHttp()

    const [infoUser, setInfoUser]  = useState(null)
    const [rerender, setRerender]  = useState(false)

    const [listRequestFriends, 
            setListRequestFriends] = useState(null)

    const [finishLoading, setFinishLoading] = useState(false)

    let countErrors = 0

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
                
                const response       = await request(`${config.hostServer}/api/getInfo/user?userId=${uID}`, 'GET')   
                const requestFriends = await request(`${config.hostServer}/api/friends/listRequestFriends?userId=${uID}`, 'GET')
                
                setInfoUser(response)
                setListRequestFriends(requestFriends)

                setFinishLoading(true)

                countErrors = 0
               
            } catch (e) {
                if (countErrors > 5) return

                setRerender(!rerender)
                countErrors++
            }
        }
        wrap()
    }, [request, auth.userId, rerender])

    
    const [openContextmenu, setOpenContextmenu] = useState(false)

    const delegateHiddenContextmenu = useCallback(e => {
        const component = e.target.closest('.contextmenu')
        
        if (!component && openContextmenu) {
            setOpenContextmenu(false) 
        }
    }, [openContextmenu])

    document.addEventListener('click', delegateHiddenContextmenu)

    return (
        <ContextConMenu.Provider value={{openContextmenu, setOpenContextmenu}}>
            <ContextGetInfo.Provider value={{infoUser, rerender, setRerender, listRequestFriends}}>
                <ContextBadge.Provider value={{textBadge: !!listRequestFriends ? listRequestFriends.list.length : null}}>
                {/* <Preloader visible={!finishLoading}/> */}
                <Alert {...alert.configAlert}/>
                <div className='wrapper'>
                    <MainMenu/>
                    <div className='main-content'>
                        {children}
                    </div>
                </div>
                </ContextBadge.Provider>
            </ContextGetInfo.Provider>
        </ContextConMenu.Provider>
    )
}
