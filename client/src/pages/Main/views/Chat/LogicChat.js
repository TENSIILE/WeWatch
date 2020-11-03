import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ContextChat } from '../../../../contexts/contextChat'
import { ContextMain } from '../../../../contexts/mainPage/contextMain'

export const LogicChat = ({ children }) => {
    const { infoUserDialogs }                 = useContext(ContextMain)
    const httpParams                          = useParams()

    const [visibleSidebar, setVisibleSidebar] = useState(false)
    const [urlParams, setUrlParams]           = useState({})
    const [currentDialog, setCurrentDialog]   = useState({})

    useEffect(() => {
        setUrlParams(httpParams)

        let findedDialog = infoUserDialogs.find(dialog => dialog._id === httpParams.id)

        if (typeof findedDialog == 'undefined') {
            findedDialog = {}
        }

        setCurrentDialog(findedDialog)
        
    }, [httpParams, infoUserDialogs])

    return (
        <ContextChat.Provider value={{visibleSidebar, setVisibleSidebar, urlParams, currentDialog}}>
            { children }
        </ContextChat.Provider>
    )
}