import React from 'react'
import { Item } from '../../../../components/itemsGroup/Item'
import { Input } from '../../../../components/input/Input'
import search from '../../../../static/icons/Search.svg'
import user from '../../../../static/img/user.jpg'
import './sidebar.scss'

export const Sidebar = () => {
    return (
        <div className='left-sidebar'>
            <div className='input-form'>
                <Input isWithButton={true} icon={search} style={{margin: '15px 10px 0 10px', width:'100%'}} placeholder='Найти комнату...'/>
            </div>
            <div className='zone-my-created-room'>
                <div className='list-my-room'>
                    <Item src={user} text='Название комнаты'/>
                    <Item src={user} text='Название комнаты'/>
                </div>
                {/* <span id='empty-text'>Пока у нас нет комнат</span> */}
            </div>
        </div>
    )
}