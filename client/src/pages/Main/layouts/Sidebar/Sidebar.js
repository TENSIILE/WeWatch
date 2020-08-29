import React from 'react'
import { Item } from '../../../../components/itemsGroup/Item'
import { Input } from '../../../../components/input/Input'

import { SearchZone } from './parts/controlRequestFriends/SearchZone'

import search from '../../../../static/icons/Search.svg'
import user from '../../../../static/img/user.jpg'
import './sidebar.scss'

export const Sidebar = ({isEmpty = true, textEmpty = 'Пока у вас нет комнат', newClass = "", searchZoneActive = false, onClickAccept, onClickDelete}) => {
    return (
        <div className={`sidebar ${newClass}`}>
            {
                searchZoneActive ? (
                    <SearchZone onClickDelete={onClickDelete} onClickAccept={onClickAccept}/>
                ) : null
            }
           
            {
                !isEmpty ? (
                    <>
                        <div className='input-form'>
                            <Input 
                                isWithButton={true}
                                icon={search} 
                                style={{margin: '15px 10px 0 10px', width:'100%'}}
                                placeholder='Найти комнату...'
                            />
                        </div>
                
                        <div className='zone-my-created-room'>
                            <p className='title-list'>Мои комнаты</p>
                            <div className='list-my-room'>
                                <Item src={user} text='Название комнаты'/>
                                <Item src={user} text='Название комнаты'/>
                            </div>
                        </div>
                    </>
                ) : !searchZoneActive ? <span id='empty-text'>{textEmpty}</span> : null
            }
        </div>
    )
}