import React from 'react'
import { Sidebar } from '../../layouts/Sidebar/Sidebar'
import { FriendList } from '../../layouts/Sidebar/parts/friendList/FriendList'
import { RecentlyInRoom } from '../../layouts/Sidebar/parts/recentlyInRoom/RecentlyInRoom'

import './home.scss'

export const Home = () => {
    return (
        <>
            <Sidebar>
                <RecentlyInRoom/>
            </Sidebar>
            <div className='main-home'>

            </div>
            <Sidebar newClass='sidebar-my-friends'>
                <FriendList isEmpty={false} textEmpty='У вас нет друзей'/>
            </Sidebar>
        </>
    )
}