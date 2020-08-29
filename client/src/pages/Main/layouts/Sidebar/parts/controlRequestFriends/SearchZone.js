import React, { useState, useContext, useEffect } from 'react'
import { Loader } from '../../../../../../components/loader/Loader'
import { ContextGetInfo } from '../../../../../../contexts/contextGetInfo'
import { Item } from '../../../../../../components/itemsGroup/Item'

import './searchZone.scss'

export const SearchZone = ({ onClickDelete, onClickAccept }) => {
    const { listRequestFriends }                = useContext(ContextGetInfo)
    const [sentInvitations, setSentInvitations] = useState(false)

    useEffect(() => {
        if (!!listRequestFriends) 
            listRequestFriends.listMyRequestFriend.length ? setSentInvitations(true) : setSentInvitations('')
    },[listRequestFriends])

    return (
        <div className='invitation-lists'>
            <div className={`sent-applications ${sentInvitations ? 'visible' : ''} separate-block beautiful-scrollbar`}>
                {
                    !!listRequestFriends ? (
                        listRequestFriends.listMyRequestFriend.length ? (
                            (
                                <>
                                    <p className='title'>Вы отправили запросы в друзья</p>
                                    <div className='mySubscribers beautiful-scrollbar'>
                                        {   
                                            !!listRequestFriends ? listRequestFriends.listMyRequestFriend.map((myCandicate_friend, index) => {
                                                return(
                                                    <Item 
                                                        key={index}
                                                        src={myCandicate_friend.avatar} 
                                                        newClass={`adding-new-friend list-request-friends`}
                                                        text={myCandicate_friend.name + ' ' + myCandicate_friend.lastname}
                                                        isOnButton={true} 
                                                        isButtonDelete={true}
                                                        isButtonAccept={false}
                                                        onClickDelete={() => onClickDelete(listRequestFriends.listMyRequestFriend[index].user, 'my')}
                                                    />
                                                ) 
                                            }) : null
                                        } 
                                    </div>
                                </>
                            )
                        ) : <span id='empty-text'>Отправленных заявок в друзья нет</span>
                    ) : null
                }
            </div>
            <hr id='separator'/>
            <div className='friend-requests separate-block'>
                {
                    !!listRequestFriends ? (
                        listRequestFriends.list.length ? (
                            (
                                <>
                                    <p className='title'>Запросы в друзья</p>
                                    <div className='subscribers beautiful-scrollbar'>
                                        {
                                            !!listRequestFriends ? listRequestFriends.list.map((candicate_friend, index) => {
                                                return(
                                                    <Item 
                                                        key={index}
                                                        src={candicate_friend.avatar} 
                                                        newClass={`adding-new-friend list-request-friends`}
                                                        text={candicate_friend.name + ' ' + candicate_friend.lastname}
                                                        isOnButton={true} 
                                                        textButton='Принять'
                                                        isButtonDelete={true}
                                                        onClick={() => onClickAccept(listRequestFriends.list[index].user)}
                                                        onClickDelete={() => onClickDelete(listRequestFriends.list[index].user, 'other')}
                                                    />
                                                ) 
                                            }) : null
                                        } 
                                    </div>
                                </>
                            )
                        ) : <span id='empty-text'>Заявок в друзья нет</span>
                    ) : <Loader/>
                }
            </div>
        </div>
    )
}