import React from 'react'
import { Input } from '../../../../../../components/input/Input'
import { Item } from '../../../../../../components/itemsGroup/Item'

import user from '../../../../../../static/img/user.jpg'
import search from '../../../../../../static/icons/Search.svg'

import '../../sidebar.scss'

export const FriendList = ({isEmpty, textEmpty}) => {
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
                                newClass={'grey-background'}
                                style={{margin: '15px 10px 0 10px', width:'100%'}}
                                placeholder='Найти друга...'
                            />
                        </div>

                        <div className='zone'>
                            <p className='title-list'>Мои друзья</p>
                            <div className='list-my-friends'>
                                <Item src={user} text='Имя Фамилия' dotsActive={true}/>
                                <Item src={user} text='Имя Фамилия' dotsActive={true}/>
                            </div>
                        </div>
                    </>
                ) : <span id='empty-text'>{textEmpty}</span> 
            }
        </>
    ) 
}