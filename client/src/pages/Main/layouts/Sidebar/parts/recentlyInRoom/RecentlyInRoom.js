import React from 'react'
import { Input } from '../../../../../../components/input/Input'
import { Item } from '../../../../../../components/itemsGroup/Item'

import user from '../../../../../../static/img/user.jpg'
import search from '../../../../../../static/icons/Search.svg'

import '../../sidebar.scss'

export const RecentlyInRoom = ({isEmpty, textEmpty = 'Нет надавних посещаемых комнат'}) => {
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

                        <div className='zone'>
                            <p className='title-list'>Недавно посещаемые комнаты</p>
                            <div className='list-visited-room'>
                                <Item src={'https://sun9-67.userapi.com/c858236/v858236620/1d22d1/ZVnklmlf97Y.jpg'} text='Флудилка сталкеров, флеймеров? четких пацанов' isItemRoom={true} isPasswordSetup={true}/>
                                <Item src={user} text='Название' isItemRoom={true}/>
                            </div>
                        </div>
                    </>
                ) : <span id='empty-text'>{textEmpty}</span> 
            }
        </>
    ) 
}