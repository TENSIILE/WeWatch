import React, { useContext } from 'react'
import { MainMenu } from './layouts/MainMenu/MainMenu'
import { Alert } from '../../components/alert/Alert'
import { Preloader } from '../../components/preloader/Preloader'
import { ContextGetInfo } from '../../contexts/contextGetInfo'
import { ContextAlert } from '../../contexts/alert/contextAlert'
import { ContextBadge } from '../../contexts/contextBadge'
import { ContextConMenu } from '../../contexts/contextmenu/contextConMenu'
import { ContextMain } from '../../contexts/mainPage/contextMain'

import './Main.scss'

export const MainPage = ({ children }) => {
    const alert       = useContext(ContextAlert)
    const contextmenu = useContext(ContextConMenu)

    const { infoUser, listRequestFriends,
        finishLoading, createdMyRooms, 
        rerender, setRerender } = useContext(ContextMain)

    return (
        <ContextGetInfo.Provider value={{infoUser, rerender, setRerender, listRequestFriends, createdMyRooms}}>
            <ContextBadge.Provider value={{textBadge: !!listRequestFriends ? listRequestFriends.list.length : null}}>
            <Preloader visible={!finishLoading}/>
            <Alert {...alert.configAlert}/>
            <div className='wrapper' onClick={contextmenu.delegateHiddenContextmenu}>
                <MainMenu/>
                <div className='main-content'>
                    {children}
                </div>
            </div>
            </ContextBadge.Provider>
        </ContextGetInfo.Provider>
    )
}
