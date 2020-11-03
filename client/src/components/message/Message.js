import React, { useState, useEffect } from 'react'
import { ReactSVG } from 'react-svg'
import { distanceInWordsToNowWrapper } from '../../utils/functions'

import checkedMessage from '../../static/icons/checked.svg'
import user from '../../static/img/user.jpg'

import './message.scss'

export const Message = ({ isMe }) => {
    const [timeMessage, setTimeMessage] = useState(distanceInWordsToNowWrapper())

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeMessage(distanceInWordsToNowWrapper())
        }, 25000)

        return () => clearInterval(interval) 
    }, [])

    return (
        <div className={`message ${isMe ? 'my-message' : ''}`}>
            <img src={user} className='avatar' alt=""/>
            <div className="content-message">
                <p className="fullname">Виталий Киселёв</p>
                <div className="container-message">
                    <p className='text-message'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Totam, nobis mollitia aspernatur aperiam deleniti quo perferendis unde esse natus perspiciatis.</p>
                </div>
                <span className="datetime">{timeMessage}</span>
                {isMe ? <ReactSVG src={checkedMessage} className={`isReading`}/> : null}
            </div>
        </div>
    )
}