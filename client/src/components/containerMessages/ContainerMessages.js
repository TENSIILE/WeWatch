import React from 'react'
import { ReactSVG } from 'react-svg'
import { Message } from '../message/Message'

import empty_message from '../../static/icons/dialog.svg'

import './containerMessages.scss'

export const ContainerMessages = ({ messages }) => {
    return (
        <div className="container-messages">
            <div className="wrapper-messages beautiful-scrollbar mini">
                <div className="empty-message-container">
                    {
                        !!messages.length ? (
                            null
                        ) : (
                            <>
                                <ReactSVG src={empty_message} className='empty-message'/>
                                <span className='empty-text'>Диалог пуст</span>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}