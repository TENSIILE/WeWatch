import React, { useContext, useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ReactSVG } from 'react-svg'
import classnames from 'classnames'
import { ButtonMini } from '../buttonMini/ButtonMini'
import { Contextmenu } from '../contextmenu/Contextmenu'
import { ContextConMenu } from '../../contexts/contextmenu/contextConMenu'
import { ContextCreatingRoom } from '../../contexts/contextCreatingRoom'
import plus from '../../static/icons/plus.svg'
import trash from '../../static/icons/trash.svg'
import user from '../../static/img/user.jpg'
import './inviteFriend.scss'

export const InviteFriend = ({ style, listFriend }) => {
  const contextmenu = useContext(ContextConMenu)
  const logicCreatingRoom = useContext(ContextCreatingRoom)

  const ref = React.createRef()

  const [offsetMenu, setOffsetMenu] = useState('')

  useEffect(() => {
    setOffsetMenu(ref.current.offsetLeft)
  }, [ref])

  return (
    <div className='container-list-friends-added-to-room' style={style}>
      <h3>Пригласить друзей</h3>
      <div className='list-added-to-room'>
        <TransitionGroup className='my-friends-invited-to-room'>
          {!!listFriend &&
            listFriend.map(friend => {
              return (
                <CSSTransition
                  key={friend._id}
                  classNames='invited-friend'
                  timeout={800}
                >
                  <div
                    className='container-avatar-user tooltip tooltip-simple'
                    title-tooltip={friend.name + ' ' + friend.lastname}
                    onClick={() => logicCreatingRoom.kickOutFromRoom(friend)}
                  >
                    <img src={friend.avatar || user} alt='' />
                    <ReactSVG src={trash} />
                  </div>
                </CSSTransition>
              )
            })}
        </TransitionGroup>

        <ButtonMini
          icon={plus}
          newClass='fly circle'
          style={{
            position: 'relative',
            border: 'none',
            top: 0,
            width: 45,
            height: 45,
            margin: '.5em',
            cursor: 'default',
          }}
          onClickRightButton={() => contextmenu.show('addFriendToRoom')}
          onClick={() => contextmenu.show('addFriendToRoom')}
          ref={ref}
        >
          <Contextmenu
            view='add-friend-to-room'
            style={{ left: '50%', top: '50%', position: 'absolute' }}
            newClass={classnames({
              'reverse-right-side': offsetMenu - 20 > 200,
            })}
            open={contextmenu.visible.addFriendToRoom}
          />
        </ButtonMini>
      </div>
    </div>
  )
}
