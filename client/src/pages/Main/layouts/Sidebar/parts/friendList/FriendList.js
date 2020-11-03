import React from 'react'
import { Input } from '../../../../../../components/input/Input'
import { Item } from '../../../../../../components/itemsGroup/Item'
import { useSearcher } from '../../../../../../hooks/searcher.hook'

import search from '../../../../../../static/icons/Search.svg'

import '../../sidebar.scss'

export const FriendList = ({isEmpty, textEmpty = 'У Вас нет друзей', list}) => {
    const searcher = useSearcher(list)

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
                                value={searcher.input}
                                onChange={e => searcher.setInput(e.target.value)}
                                onKeyUp={searcher.search}
                                onClick={searcher.search}
                            />
                        </div>

                        <div className='zone'>
                            <p className='title-list'>Мои друзья</p>
                            <div className='list-my-friends'>
                                {
                                    !!searcher.array.length ? searcher.array.map((friend, index) => {
                                        return (
                                            <Item
                                                key={friend.user} 
                                                src={friend.avatar} 
                                                text={friend.name + ' ' + friend.lastname} 
                                                dotsActive={true}
                                                isListFriend={true}
                                                index={index}
                                                data={friend.user}
                                                statusOnline={friend.statusOnline}
                                            />
                                        )
                                    }) : <span id='empty-text'>Друг не найден</span> 
                                }
                            </div>
                        </div>
                    </>
                ) : <span id='empty-text'>{textEmpty}</span> 
            }
        </>
    ) 
}