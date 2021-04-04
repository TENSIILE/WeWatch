import React, { useState, useEffect } from 'react'
import { ReactSVG } from 'react-svg'
import { useHttp } from '../../../../../../hooks/http.hook'
import { useSearcher } from '../../../../../../hooks/searcher.hook'
import { Input } from '../../../../../../components/input/Input'
import { Item } from '../../../../../../components/itemsGroup/Item'
import { getUserToken } from '../../../../../../utils/functions'

import box from '../../../../../../static/icons/open-box.svg'
import search from '../../../../../../static/icons/Search.svg'
import config from '../../../../../../config.json'
import '../../sidebar.scss'

export const RecentlyInRoom = ({ textEmpty = 'Нет посетимых комнат' }) => {
  const { request } = useHttp()

  const [listRooms, setListRooms] = useState([])

  const searcher = useSearcher(listRooms)

  useEffect(() => {
    const wrap = async () => {
      const rooms = await request(
        `${config.hostServer}/api/room/getRoomsJoined`,
        'GET',
        null,
        {
          Authorization: `Bearer ${await getUserToken()}`,
        }
      )

      setListRooms(rooms)
    }
    wrap()
  }, [])

  return (
    <>
      {listRooms.length ? (
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
