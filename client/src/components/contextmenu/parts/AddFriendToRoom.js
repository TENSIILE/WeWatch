import React, { useContext, useState, useEffect } from 'react'
import { Input } from '../../input/Input'
import { Item } from '../../itemsGroup/Item'
import { useSearcher } from '../../../hooks/searcher.hook'
import { ContextCreatingRoom } from '../../../contexts/contextCreatingRoom'

import search from '../../../static/icons/Search.svg'
import '../contextmenu.scss'

export const AddFriendToRoom = () => {
  const logicCreatingRoom = useContext(ContextCreatingRoom)

  const [friends, setFriends] = useState([])

  const searcher = useSearcher(friends)

  useEffect(() => {
    setFriends(logicCreatingRoom.filterAddedFriendInRoomContextmenu())
  }, [logicCreatingRoom])

  return (
    <>
      <div className='input-form'>
        <Input
          isWithButton={false}
          icon={search}
          style={{ margin: '15px 10px 0 10px', width: '100%' }}
          placeholder='Найти друга...'
          newClass='grey-background'
          value={searcher.input}
          onChange={e => searcher.setInput(e.target.value)}
          onKeyUp={searcher.search}
        />
      </div>
      <hr />
      <ul className='beautiful-scrollbar mini'>
        {!!searcher.array.length ? (
          searcher.array.map((friend, index) => {
            return (
              <Item
                key={friend.user || index}
                src={friend.avatar}
                text={friend.name + ' ' + friend.lastname}
                onClickWrapper={() => logicCreatingRoom.inviteFriends(friend)}
              />
            )
          })
        ) : (
          <span className='empty-text'>Друзей нет</span>
        )}
      </ul>
    </>
  )
}
