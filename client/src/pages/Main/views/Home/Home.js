import React from 'react'
import { Sidebar } from '../../layouts/Sidebar/Sidebar'

import './home.scss'

export const Home = () => {
    return (
        <>
            <Sidebar/>
            <div className='main-home'>

            </div>
            <Sidebar newClass='sidebar-my-friends' textEmpty='У вас нет друзей'/>
        </>
    )
}