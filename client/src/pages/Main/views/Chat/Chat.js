import React, { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { Input } from '../../../../components/input/Input'
import { Loader } from '../../../../components/loader/Loader'
import { ContainerMessages } from '../../../../components/containerMessages/ContainerMessages'
import { ChatHeader } from '../../../../components/chatHeader/ChatHeader'
import { Sidebar } from '../../layouts/Sidebar/Sidebar'
import { DialogsChat } from '../../layouts/Sidebar/parts/dialogsChat/DialogsChat'
import { ControllingRoom } from '../../layouts/Sidebar/parts/controllingRoom/ControllingRoom'
import { ContextChat } from '../../../../contexts/contextChat'
import { ContextMain } from '../../../../contexts/mainPage/contextMain'

import icoSend from '../../../../static/icons/sendMessage.svg'
import smile from '../../../../static/icons/smileys.svg'
import attachments from '../../../../static/icons/to-attach.svg'

import dialogsChat from '../../../../static/icons/dialogChat.svg'

import './chat.scss'

export const Chat = () => {
    const logicChat  = useContext(ContextChat)
    const main       = useContext(ContextMain)

    return (
        <>  
            <Sidebar>
                <DialogsChat/>
            </Sidebar>

            <div className='container-chat'>
                {
                    !!main.infoUserDialogs.length ? (
                        !!logicChat.urlParams.id && !!Object.keys(logicChat.currentDialog).length ? (
                            <>
                                <ChatHeader 
                                    logo={logicChat.currentDialog.userAdditional.avatar} 
                                    title={logicChat.currentDialog.userAdditional.name + ' ' + logicChat.currentDialog.userAdditional.lastname}
                                    status={logicChat.currentDialog.userAdditional.statusOnline}
                                />
                                <ContainerMessages messages={logicChat.currentDialog.messages}/> 
                                <div className="im-chat-input">
                                    <div className="management-my-message">
                                        <label htmlFor="input-attachments">
                                            <ReactSVG src={attachments} className='react-svg attachments-files'/>
                                        </label>
                                        <input type="file" id='input-attachments'/>
                                        <Input 
                                            isWithButton={true}
                                            icon={icoSend} 
                                            newClass='grey-background'
                                            parentClass='btn-mess-send'
                                            placeholder='Напишите сообщение...'
                                        />
                                        <ReactSVG src={smile} className='react-svg smile'/>
                                    </div>
                                    
                                    <p id='notification'>Виталий Киселёв печатает сообщение...</p>
                                </div>
                            </>
                        ) : (
                            <div className='no-dialogue-selected'>
                                <ReactSVG src={dialogsChat} className='dialog-chat'/>
                                <span className='empty-text'>Диалог не выбран</span>
                            </div>
                        )
                    ) : <Loader/>
                        
                    
                }
            </div>
            {false ? (
                <Sidebar newClass={`controlling-current-room ${logicChat.visibleSidebar ? 'rollUp': ''}`}>
                    <ControllingRoom/>
                </Sidebar>
            ) : null}
            
        </>
    )
}