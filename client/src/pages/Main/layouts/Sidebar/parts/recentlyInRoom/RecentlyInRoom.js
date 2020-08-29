import React from 'react'
import { Input } from '../../../../../../components/input/Input'
import { Item } from '../../../../../../components/itemsGroup/Item'

import user from '../../../../../../static/img/user.jpg'
import search from '../../../../../../static/icons/Search.svg'

import '../../sidebar.scss'

export const RecentlyInRoom = ({isEmpty, textEmpty}) => {
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
                                placeholder='Найти комнаты...'
                            />
                        </div>

                        <div className='zone'>
                            <p className='title-list'>Недавно посещаемые комнаты</p>
                            <div className='list-visited-room'>
                                <Item src={user} text='Название'/>
                                <Item src={user} text='Название'/>
                            </div>
                        </div>
                    </>
                ) : <span id='empty-text'>{textEmpty}</span> 
            }
        </>
    ) 
}