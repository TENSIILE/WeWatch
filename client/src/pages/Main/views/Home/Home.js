import React, { useContext, useState, useEffect } from 'react'
import { InfoBlockRoom } from '../../../../components/infoBlockRoom/infoBlockRoom'
import { Sidebar } from '../../layouts/Sidebar/Sidebar'
import { FriendList } from '../../layouts/Sidebar/parts/friendList/FriendList'
import { RoomConnection } from '../../../../components/modal/parts/RoomConnection'
import { RecentlyInRoom } from '../../layouts/Sidebar/parts/recentlyInRoom/RecentlyInRoom'
import { ContextGetInfo } from '../../../../contexts/contextGetInfo'
import { ContextModal } from '../../../../contexts/modal/contextModal'

import { CONNECT_TO_ROOM } from '../../../../types/modal'
import men from '../../../../static/icons/men.svg'
import men_plus from '../../../../static/icons/people-plus.svg'

import './home.scss'

export const Home = ({ children }) => {
    const { listRequestFriends } = useContext(ContextGetInfo)
    const modal                  = useContext(ContextModal)

    const [haveFriends, setHaveFriends] = useState(false)

    useEffect(() => {
        if (!!listRequestFriends) {
            !!listRequestFriends.userFriends.length ? setHaveFriends(true) : setHaveFriends(false)
        }
    },[listRequestFriends])

    const connectToRoom = () => {
        modal.setType(CONNECT_TO_ROOM)
        modal.setChild(RoomConnection)
        modal.changeTitle(CONNECT_TO_ROOM, 'Подключение к комнате')
        modal.changeStyle(CONNECT_TO_ROOM, 'little height-unset')
        modal.show(CONNECT_TO_ROOM)
    }
    
    return (
        <>  
            <Sidebar>
                <RecentlyInRoom isEmpty={false}/>
            </Sidebar>
            <div className='main-home'>
                <div className='blocks-controller-rooms'>
                    {
                        children ? children : (
                            <>
                                <InfoBlockRoom
                                    icon={men}
                                    text='Эй, хотите создать новую комнату? Окей'
                                    linkObj={{isLink:true, path:'/home/creating_room'}}
                                    textButton='Создать'
                                />
                                <InfoBlockRoom 
                                    icon={men_plus} 
                                    text='Что, хочешь присоединиться к видео-чату?'
                                    textButton='Присоединиться'
                                    onClickButton={connectToRoom}
                                />
                            </>
                        )
                    }
                </div>
            </div>
            <Sidebar newClass='sidebar-my-friends'>
                <FriendList 
                    isEmpty={!haveFriends} 
                    list={!!listRequestFriends ? listRequestFriends.userFriends : null}
                />
            </Sidebar>
        </>
    )
}