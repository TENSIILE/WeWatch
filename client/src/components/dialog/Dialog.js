import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import { getMessageTime } from '../../utils/functions'
import { IndicatorOnline } from '../indicatorOnline/IndicatorOnline'
import { ContextChat } from '../../contexts/contextChat'

import checked from '../../static/icons/checked.svg'

import './dialog.scss'

export const Dialog = ({ chatID, messages, isMe, dialogData }) => {
    const { urlParams }                         = useContext(ContextChat)
    const [dataUserDialogs, setDataUserDialogs] = useState(null)
    const [lastMessage, setLastMessage]         = useState(messages[messages.length - 1])
    const [avatarUser, setAvatarUser]           = useState(null)
    const [highlightDialog, setHighlightDialog] = useState(false)    

    useEffect(() => {
        setDataUserDialogs(dialogData.userAdditional)
    }, [])

    useEffect(() => {
        if (chatID === urlParams.id) {
            setHighlightDialog(true)
        } else {
            setHighlightDialog(false)
        }
    }, [urlParams])

    useEffect(() => {
        setLastMessage(messages[messages.length - 1])
    }, [messages])

    return (
        <Link to={`/chat/${chatID}`} className='link-dialog'>
            {
                !!dataUserDialogs ? (
                    <div className={`dialog ${highlightDialog ? 'highlight' : ''}`}> 
                        <div className="avatar">
                            <img src={dataUserDialogs.avatar} alt=""/>
                            <IndicatorOnline status={dataUserDialogs.statusOnline}/>
                        </div>
                

                        <div className="center-text">
                            <h3>{dataUserDialogs.name + ' ' + dataUserDialogs.lastname}</h3>
                            <div className="last-message">
                                {!!messages.length ? (
                                    <>
                                        {isMe ? <img src={avatarUser} alt=""/> : null}
                                        <p className='miniature-message'>{lastMessage.text}</p>
                                    </>
                                ) : <span className='empty-dialog'>Начни общаться!</span>}
                               
                            </div>
                        </div>
                        
                        {!!messages.length ? (
                            <div className="date-and-isReading">
                                <p className='last-date'>{getMessageTime(new Date(lastMessage.create_at))}</p>
                                {
                                    !isMe ? ( 
                                        <div className="count-received-messages">03</div>
                                    ) : (
                                        <ReactSVG src={checked} className='checkedIsReading'/>
                                    )
                                }
                            </div>
                        ) : null}
                    </div>
                ) : null
            }
            
        </Link>
    )
}