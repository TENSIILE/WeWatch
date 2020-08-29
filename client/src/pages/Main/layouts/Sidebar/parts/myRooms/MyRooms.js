import React from 'react'
import { Input } from '../../../../../../components/input/Input'
import { Item } from '../../../../../../components/itemsGroup/Item'

import user from '../../../../../../static/img/user.jpg'
import search from '../../../../../../static/icons/Search.svg'

import '../../sidebar.scss'

export const MyRooms = ({isEmpty, textEmpty}) => {
    return (
        <>
            {
                !isEmpty ? 
                (
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
                ) : <span id='empty-text'>{textEmpty}</span>
            }
        </>
    ) 
}