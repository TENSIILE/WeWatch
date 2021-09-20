import React, { useContext, useEffect } from 'react'
import { ReactSVG } from 'react-svg'
import classnames from 'classnames'
import { Message } from '../message/Message'
import { Badge } from '../badge/Badge'
import { ContextAuth } from '../../contexts/contextAuth'
import { ContextChat } from '../../contexts/contextChat'
import { ContextSettings } from '../../contexts/settingsPage/contextSettings'
import { restrictOutsidePlaybackground } from '../../utils/functions'

import empty_message from '../../static/icons/dialog.svg'
import arrow_down from '../../static/icons/arrow-down.svg'
import './containerMessages.scss'

export const ContainerMessages = ({ messages }) => {
  const { userId } = useContext(ContextAuth)
  const logicChat = useContext(ContextChat)
  const settings = useContext(ContextSettings)

  useEffect(() => {
    logicChat.goDown()
  }, [messages])

  useEffect(() => {
    setTimeout(logicChat.goDown, 0)
  }, [])

  return (
    <div
      className='container-messages'
      style={{
        background: `url(${settings.selectImageBackgroundChat})`,
      }}
    >
      <div
        className='wrapper-messages beautiful-scrollbar mini'
        ref={logicChat.wrapperMessagesDivRef}
        onScroll={logicChat.checkPositionScroll}
      >
        {!!messages.length ? (
          messages.map((message, i) => {
            return (
              <React.Fragment key={i}>
                {logicChat.renderStickyDate(
                  message.create_at,
                  messages[restrictOutsidePlaybackground(i)].create_at
                ) && (
                  <span className='sticky-date'>
                    {new Date(message.create_at).toLocaleDateString()}
                  </span>
                )}

                <Message
                  key={!isNaN(message._id) ? message._id : i}
                  objMessage={message}
                  isMe={message.author === userId}
                />
              </React.Fragment>
            )
          })
        ) : (
          <div className='empty-message-container'>
            <ReactSVG src={empty_message} className='empty-message' />
            <span className='empty-text'>Диалог пуст</span>
          </div>
        )}
      </div>
      <div
        className={classnames('arrow-down', { show: logicChat.showBtnScroll })}
        onClick={logicChat.goDown}
      >
        <ReactSVG src={arrow_down} />
        <Badge newClass={'badge-count'} text={logicChat.countUnreadMsg} />
      </div>
    </div>
  )
}
