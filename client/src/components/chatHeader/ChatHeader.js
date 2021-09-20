import React, { useState, useEffect, useContext } from 'react'
import { ReactSVG } from 'react-svg'
import classnames from 'classnames'
import { IndicatorOnline } from '../indicatorOnline/IndicatorOnline'
import { Input } from '../input/Input'
import { ContextChat } from '../../contexts/contextChat'
import icoSearch from '../../static/icons/Search.svg'
import dots from '../../static/icons/three-dots-horizontal.svg'
import './chatHeader.scss'

export const ChatHeader = ({ logo, title, status }) => {
  const logicChat = useContext(ContextChat)

  const [searchActive, setSearchActive] = useState(false)
  const [input, setInput] = useState('')

  const cancelSearch = () => {
    const messages = logicChat.wrapperMessagesDivRef.current.querySelectorAll(
      '.message'
    )

    if (!messages.length) return

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i].querySelector('.content-message')

      message.classList.contains('highlight') &&
        message.classList.remove('highlight')
    }

    logicChat.wrapperMessagesDivRef.current.scrollTo(
      0,
      logicChat.wrapperMessagesDivRef.current.scrollHeight
    )

    return { messages }
  }

  useEffect(() => {
    try {
      const { messages } = cancelSearch()

      const findedMessage = [...messages].find(message => {
        return message
          .querySelector('.text-message')
          .textContent.trim()
          .includes(input)
      })

      if (typeof findedMessage !== 'undefined') {
        logicChat.wrapperMessagesDivRef.current.scrollTo(
          0,
          findedMessage.offsetTop - 100
        )
        findedMessage
          .querySelector('.content-message')
          .classList.add('highlight')
      } else cancelSearch()
    } catch (e) {}
  }, [input, logicChat.wrapperMessagesDivRef])

  useEffect(() => {
    if (!searchActive) cancelSearch()
  }, [searchActive])

  return (
    <div className='chat-header'>
      <div className='logo-dialog'>
        <img src={logo} alt='' />
        <IndicatorOnline status={status} />
      </div>
      <div className='title-dialog'>
        <h3>{title}</h3>
      </div>
      <Input
        newClass={classnames('grey-background search-visible', {
          unvisible: !searchActive,
        })}
        onChange={e => setInput(e.target.value)}
        value={input}
      />
      <div className='action-dialog'>
        <ReactSVG
          src={icoSearch}
          className='search-message'
          onClick={() => setSearchActive(!searchActive)}
        />
        <ReactSVG src={dots} className='settings-dialog' />
      </div>
    </div>
  )
}
