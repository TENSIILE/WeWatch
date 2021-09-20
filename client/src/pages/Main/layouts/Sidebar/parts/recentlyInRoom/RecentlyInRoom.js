import React, { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { useSearcher } from '../../../../../../hooks/searcher.hook'
import { Input } from '../../../../../../components/input/Input'
import { Item } from '../../../../../../components/itemsGroup/Item'
import { ContextMain } from '../../../../../../contexts/mainPage/contextMain'
import { ContextAuth } from '../../../../../../contexts/contextAuth'

import box from '../../../../../../static/icons/open-box.svg'
import search from '../../../../../../static/icons/Search.svg'
import '../../sidebar.scss'

export const RecentlyInRoom = ({ textEmpty = 'Нет посетимых комнат' }) => {
  const { roomsJoined, roomHook } = useContext(ContextMain)
  const { userId } = useContext(ContextAuth)

  const searcher = useSearcher(roomsJoined)

  return (
    <>
      {roomsJoined.length ? (
        <>
          <div className='input-form'>
            <Input
              isWithButton={true}
              icon={search}
              style={{ margin: '15px 10px 0 10px', width: '100%' }}
              placeholder='Найти комнату...'
              value={searcher.input}
              onChange={e => searcher.setInput(e.target.value)}
              onKeyUp={searcher.search}
              onClick={searcher.search}
            />
          </div>

          <div className='zone'>
            <p className='title-list'>Список комнат</p>
            <div className='list-visited-room'>
              {!!searcher.array.length ? (
                searcher.array.map(room => (
                  <Item
                    key={room._id}
                    src={room.logo}
                    text={room.title}
                    isItemRoom={true}
                    isPasswordSetup={!!room.securityKey}
                    roomId={room._id}
                    onClickConnectToRoom={roomHook.onConnect.bind(
                      this,
                      room._id,
                      userId
                    )}
                  />
                ))
              ) : (
                <div className='room-empty'>
                  <ReactSVG src={box} className='room-empty__icon' />
                  <span>Данной комнаты не существует!</span>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className='room-empty'>
          <ReactSVG src={box} className='room-empty__icon' />
          <span>{textEmpty}</span>
        </div>
      )}
    </>
  )
}
