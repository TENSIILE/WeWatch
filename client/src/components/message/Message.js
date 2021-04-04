import React, { useState, useEffect, useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { Emoji } from 'emoji-mart'
import reactStringReplace from 'react-string-replace'
import classnames from 'classnames'

import { ContextGetInfo } from '../../contexts/contextGetInfo'
import { ContextChat } from '../../contexts/contextChat'
import { distanceInWordsToNowWrapper } from '../../utils/functions'
// import { Racker } from '../../utils/encoder'

import checkedMessage from '../../static/icons/checked.svg'

import './message.scss'

export const Message = ({ objMessage, isMe }) => {
  const { infoUser } = useContext(ContextGetInfo)
  const { currentDialog, parserLinks } = useContext(ContextChat)
  const [timeMessage, setTimeMessage] = useState(
    distanceInWordsToNowWrapper(objMessage.create_at)
  )

  const [messageId, setMessageId] = useState(objMessage._id)
  const [fullname, setFullname] = useState('')
  const [avatar, setAvatar] = useState('')
  const [textMessage, setTextMessage] = useState('')
  const [isReaded, setIsReaded] = useState(false)

  // const racker                        = new Racker()

  useEffect(() => {
    const wrap = async () => {
      if (isMe) {
        setFullname(
          infoUser.userAdditional.name + ' ' + infoUser.userAdditional.lastname
        )
        setAvatar(infoUser.userAdditional.avatar)
      } else {
        setFullname(
          currentDialog.userAdditional.name +
            ' ' +
            currentDialog.userAdditional.lastname
        )
        setAvatar(currentDialog.userAdditional.avatar)
      }

      setIsReaded(objMessage.isReaded)
      setMessageId(objMessage.messageId)

      // setTextMessage(await racker.decode(objMessage.text))
      setTextMessage(objMessage.text)
    }
    wrap()
  }, [objMessage, currentDialog, infoUser, isMe])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeMessage(distanceInWordsToNowWrapper(objMessage.create_at))
    }, 25000)

    return () => clearInterval(interval)
  }, [])

  const messageTextJSX = () => {
    return reactStringReplace(
      parserLinks(textMessage),
      /:(.+?):/g,
      (match, i) => (
        <Emoji
          key={match.toString() + i}
          emoji={match}
          set='twitter'
          size={20}
        />
      )
    )
  }

  return (
    <div
      className={classnames('message', { 'my-message': isMe })}
      data-id={messageId}
    >
      <img src={avatar} className='avatar' alt='' />
      <div className='content-message'>
        <p className='fullname'>{fullname}</p>
        <div className='container-message'>
          <p className='text-message'>{messageTextJSX()}</p>
        </div>
        <span className='datetime'>{timeMessage}</span>
        {isMe && (
          <ReactSVG
            src={checkedMessage}
            className={classnames('isReading', { readed: isReaded })}
          />
        )}
      </div>
    </div>
  )
}
