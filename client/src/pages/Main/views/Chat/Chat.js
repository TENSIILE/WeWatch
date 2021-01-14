import React, { useContext } from 'react'
import { ReactSVG } from 'react-svg'
// import classnames from 'classnames'
import { Loader } from '../../../../components/loader/Loader'
import { ContainerMessages } from '../../../../components/containerMessages/ContainerMessages'
import { ChatHeader } from '../../../../components/chatHeader/ChatHeader'
import { WriteMessage } from '../../../../components/writeMessage/WriteMessage'
import { Sidebar } from '../../layouts/Sidebar/Sidebar'
import { DialogsChat } from '../../layouts/Sidebar/parts/dialogsChat/DialogsChat'
// import { ControllingRoom } from '../../layouts/Sidebar/parts/controllingRoom/ControllingRoom'
import { ContextChat } from '../../../../contexts/contextChat'
import { ContextMain } from '../../../../contexts/mainPage/contextMain'

import chatIcon from '../../../../static/icons/placeholders_chat2.svg'

import './chat.scss'

export const Chat = () => {
    const logicChat = useContext(ContextChat)
    const main      = useContext(ContextMain)

    return (
        <>  
            <Sidebar>
                <DialogsChat/>
            </Sidebar>

            <div className='container-chat'>
                {
                    !!main.infoUserDialogs.length || main.infoUserDialogs.length === 0 ? (
                        !!logicChat.urlParams.id && !!Object.keys(logicChat.currentDialog).length ? (
                            <>
                                <ChatHeader 
                                    logo={logicChat.currentDialog.userAdditional.avatar} 
                                    title={logicChat.currentDialog.userAdditional.name + ' ' + logicChat.currentDialog.userAdditional.lastname}
                                    status={logicChat.currentDialog.userAdditional.statusOnline}
                                />
                                <ContainerMessages messages={logicChat.messages}/> 
                                <WriteMessage/>
                            </>
                        ) : (
                            <div className='no-dialogue-selected'>
                                <ReactSVG src={chatIcon} className='dialog-chat'/>
                                <span className='empty-text'>Диалог не выбран</span>
                            </div>
                        )
                    ) : <Loader/>
                }
            </div>
            {/* {false ? (
                <Sidebar newClass={classnames('controlling-current-room', {'rollUp': logicChat.visibleSidebar})}>
                    <ControllingRoom/>
                </Sidebar>
            ) : null} */}
            
        </>
    )
}