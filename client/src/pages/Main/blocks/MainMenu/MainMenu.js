import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Home from '../../../../static/icons/Home.svg'
import Video from '../../../../static/icons/Play.svg'
import Chat from '../../../../static/icons/Edit-tools.svg'
import Search from '../../../../static/icons/Search.svg'
import Settings from '../../../../static/icons/Settings.svg'
import { ButtonMini } from '../../../../components/buttonMini/ButtonMini'
import { ContextGetInfo } from '../../../../contexts/contextGetInfo'

import user from '../../../../static/img/user.jpg'

import './mainMenu.scss'


export const MainMenu = () => {
    const { infoUser } = useContext(ContextGetInfo)
    
    const [focus, setFocus] = useState({home:true})
    const defaultFocus = {home: false, video:false, chat:false, search:false, settings:false, profile:false}

    const location = useLocation()

    const page = location.pathname.substring(1,location.pathname.length)

    
    useCallback(useEffect(() => {
        setFocus({
            ...defaultFocus,
            [page]: true}) 
        
    }, [page]), []) 
    

    const setActiveButtonsOnClick = event => {
        setFocus({
            ...defaultFocus,
            [event.target.closest("button").id]: true}
        ) 
    }

    return (
        <div className='main-menu'>
            <div className='logo'>
                <p>Ww</p>
            </div>
            <div className='menu'>
                <Link to='/home'>
                    <ButtonMini icon={Home} id='home' onClick={setActiveButtonsOnClick} focus={focus.home}/>
                </Link>
                <Link to='/video'>
                    <ButtonMini icon={Video} id='video' onClick={setActiveButtonsOnClick} focus={focus.video}/>
                </Link>
                <Link to='/chat'>
                    <ButtonMini icon={Chat} id='chat' onClick={setActiveButtonsOnClick} focus={focus.chat}/>
                </Link>
                <Link to='/search'>
                    <ButtonMini icon={Search} id='search' onClick={setActiveButtonsOnClick} focus={focus.search}/>
                </Link>
                <Link to='/settings'>
                    <ButtonMini icon={Settings} id='settings' onClick={setActiveButtonsOnClick} focus={focus.settings}/>
                </Link>
            </div>
            <div className='profile'>
                <Link to='/profile'>
                    <ButtonMini icon="" id='profile' onClick={setActiveButtonsOnClick} focus={focus.profile} style={{width:55, height:55}}>
                        <div className='indicator-online'></div>
                        <img src={!!infoUser ? infoUser.userAdditional.avatar : user} alt=''/>
                    </ButtonMini>
                </Link>
            </div>
        </div>
    )
}