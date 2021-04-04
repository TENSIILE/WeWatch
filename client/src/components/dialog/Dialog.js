import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import { Emoji } from 'emoji-mart'
import reactStringReplace from 'react-string-replace'
import classnames from 'classnames'

import { getMessageTime } from '../../utils/functions'
import { IndicatorOnline } from '../indicatorOnline/IndicatorOnline'
import { ContextChat } from '../../contexts/contextChat'
import { ContextGetInfo } from '../../contexts/contextGetInfo'
// import { ContextMain } from '../../contexts/mainPage/contextMain'

// import { Racker } from '../../utils/encoder'
import { loader } from '../../utils/functions'

import checked from '../../static/icons/checked.svg'

import './dialog.scss'

export const Dialog = ({ chatID, messages, isMe, dialogData }) => {
  const logicChat = useContext(ContextChat)
  const { infoUser } = useContext(ContextGetInfo)
  // const { ttlCountUnrMsg, setTtlCountUnrMsg }         = useContext(ContextMain)

  const [dataUserDialogs, setDataUserDialogs] = useState(null)

  const [lastMessage, setLastMessage] = useState(messages[messages.length - 1])
  const [avatarUser, setAvatarUser] = useState(null)
  const [highlightDialog, setHighlightDialog] = useState(false)
  const [countUnreadMessages, setCountUnreadMessages] = useState(null)

  // const racker                                        = new Racker()

  useEffect(() => {
    setDataUserDialogs(dialogData)
  }, [dialogData])

  useEffect(() => {
    if (chatID === logicChat.urlParams.id) {
      setHighlightDialog(true)
    } else {
      setHighlightDialog(false)
    }
  }, [logicChat.urlParams])

  useEffect(() => {
    const wrap = async () => {
      await loader(messages, wrap, 500)

      // const textDecoded = await racker.decode(lastMessage.text)
      // setLastMessage({...lastMessage, text: textDecoded })
      setLastMessage(messages[messages.length - 1])

      let counter = 0
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].author !== infoUser.user._id && !messages[i].isReaded) {
          counter++
        } else break
      }

      if (counter > 0) {
        setCountUnreadMessages(counter)
        logicChat.setCountUnreadMsg(counter)

        // let total = ttlCountUnrMsg
        // total++

        // setTtlCountUnrMsg(total)
      }
    }
    wrap()
  }, [messages])

  useEffect(() => {
    setAvatarUser(infoUser.userAdditional.avatar)
  }, [isMe])

  return (
    <Link to={`/chat/${chatID}`} className='link-dialog'>
      {!!dataUserDialogs && (
        <div className={classnames('dialog', { highlight: highlightDialog })}>
          <div className='avatar'>
            <img src={dataUserDialogs.userAdditional.avatar} alt='' />
            <IndicatorOnline
              status={dataUserDialogs.userAdditional.statusOnline}
            />
          </div>

          <div className='center-text'>
            <h3>
              {dataUserDialogs.userAdditional.name +
                ' ' +
                dataUserDialogs.userAdditional.lastname}
            </h3>
            <div className='last-message'>
              {!!messages.length ? (
                <>
                  {isMe && <img src={avatarUser} alt='' />}
                  <p className='miniature-message'>
                    {reactStringReplace(
                      lastMessage.text,
                      /:(.+?):/g,
                      (match, i) => (
                        <Emoji
                          key={match.toString() + i}
                          emoji={match}
                          set='twitter'
                          size={20}
                        />
                      )
                    )}
                  </p>
                </>
              ) : (
                <span className='empty-dialog'>Начни общаться!</span>
              )}
            </div>
          </div>

          {!!messages.length && (
            <div className='date-and-isReading'>
              <p className='last-date'>
                {getMessageTime(new Date(lastMessage.create_at))}
              </p>
              {!isMe ? (
                !!countUnreadMessages && (
                  <div className='count-received-messages'>
                    {String(countUnreadMessages).padStart(2, 0)}
                  </div>
                )
              ) : (
                <ReactSVG
                  src={checked}
                  className={classnames('checkedIsReading', {
                    readed: lastMessage.isReaded,
                  })}
                />
              )}
            </div>
          )}
        </div>
      )}
    </Link>
  )
}
