import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../../../../../../components/input/Input'
import { Item } from '../../../../../../components/itemsGroup/Item'
import { ContextGetInfo } from '../../../../../../contexts/contextGetInfo'
import { useSearcher } from '../../../../../../hooks/searcher.hook'

import search from '../../../../../../static/icons/Search.svg'

import '../../sidebar.scss'

export const MyRooms = () => {
    const { createdMyRooms }    = useContext(ContextGetInfo)
    const [isEmpty, setIsEmpty] = useState(true)
    
    useEffect(() => {
        !!createdMyRooms.length ? setIsEmpty(false) : setIsEmpty(true)
    }, [createdMyRooms])

    const searcher = useSearcher(createdMyRooms)

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
                                value={searcher.input}
                                onChange={e => searcher.setInput(e.target.value)}
                                onKeyUp={searcher.search}
                                onClick={searcher.search}
                            />
                        </div>
                
                        <div className='zone-my-created-room'>
                            <p className='title-list'>Мои комнаты</p>
                            <div className='list-my-room'>
                                {
                                    !!searcher.array.length ? searcher.array.map((room, index) => {
                                        return (
                                            <Item 
                                                key={index} 
                                                src={room.logo} 
                                                text={room.title}
                                            />
                                        ) 
                                    }) : <span id='empty-text'>Комната не найдена</span>
                                }
                            </div>
                        </div>
                    </>
                ) : <span id='empty-text'>Комнат созданных Вами не существует</span>
            }
        </>
    ) 
}