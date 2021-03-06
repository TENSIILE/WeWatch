import React, { useState, useContext, useEffect } from 'react'
import classnames from 'classnames'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { ReactSVG } from 'react-svg'
import { Loader } from '../../../../../../components/loader/Loader'
import { ContextGetInfo } from '../../../../../../contexts/contextGetInfo'
import { Item } from '../../../../../../components/itemsGroup/Item'

import friendship from '../../../../../../static/icons/friend-request.svg'
import './searchZone.scss'

export const SearchZone = ({ onClickDelete, onClickAccept }) => {
  const { listRequestFriends } = useContext(ContextGetInfo)
  const [sentInvitations, setSentInvitations] = useState(false)

  useEffect(() => {
    if (!!listRequestFriends)
      setSentInvitations(!!listRequestFriends.listMyRequestFriend.length)
  }, [listRequestFriends])

  return (
    <div className='invitation-lists'>
      <div
        className={classnames(
          'sent-applications separate-block beautiful-scrollbar',
          { visible: sentInvitations }
        )}
      >
        {!!listRequestFriends &&
          (listRequestFriends.listMyRequestFriend.length ? (
            <>
              <p className='title'>Вы отправили запросы в друзья</p>
              <div className='mySubscribers beautiful-scrollbar'>
                <TransitionGroup>
                  {!!listRequestFriends &&
                    listRequestFriends.listMyRequestFriend.map(
                      (myCandicate_friend, index) => {
                        return (
                          <CSSTransition
                            key={myCandicate_friend.user}
                            classNames='candidate_friend'
                            timeout={200}
                          >
                            <Item
                              src={myCandicate_friend.avatar}
                              newClass={`adding-new-friend list-request-friends list-send-req`}
                              text={
                                myCandicate_friend.name +
                                ' ' +
                                myCandicate_friend.lastname
                              }
                              isOnButton={true}
                              isButtonDelete={true}
                              isButtonAccept={false}
                              onClickDelete={() =>
                                onClickDelete(
                                  listRequestFriends.listMyRequestFriend[index]
                                    .user,
                                  'my'
                                )
                              }
                            />
                          </CSSTransition>
                        )
                      }
                    )}
                </TransitionGroup>
              </div>
            </>
          ) : (
            <span id='empty-text'>Отправленных заявок в друзья нет</span>
          ))}
      </div>
      <hr id='separator' />
      <div className='friend-requests separate-block'>
        {!!listRequestFriends ? (
          listRequestFriends.list.length ? (
            <>
              <p className='title'>Запросы в друзья</p>
              <div className='subscribers beautiful-scrollbar'>
                <TransitionGroup>
                  {!!listRequestFriends &&
                    listRequestFriends.list.map((candicate_friend, index) => {
                      return (
                        <CSSTransition
                          key={candicate_friend.user}
                          classNames='candidate_friend'
                          timeout={390}
                        >
                          <Item
                            src={candicate_friend.avatar}
                            newClass={`adding-new-friend list-request-friends list-send-req`}
                            text={
                              candicate_friend.name +
                              ' ' +
                              candicate_friend.lastname
                            }
                            isOnButton={true}
                            textButton='Принять'
                            isButtonDelete={true}
                            onClick={() =>
                              onClickAccept(listRequestFriends.list[index].user)
                            }
                            onClickDelete={() =>
                              onClickDelete(
                                listRequestFriends.list[index].user,
                                'other'
                              )
                            }
                          />
                        </CSSTransition>
                      )
                    })}
                </TransitionGroup>
              </div>
            </>
          ) : (
            <div className='list-future-friend'>
              <ReactSVG src={friendship} className='friend-icon' />
              <span id='empty-text'>Заявок в друзья нет</span>
            </div>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}
