import React from 'react'
import { Button } from '../button/Button'
import { Input } from '../input/Input'

import './listLinks.scss'

export const ListLinksVideos = ({valueInput, nameInput, setValueInput, onClickDelete, listLinksVideos, onKeyDown, style, open}) => {

    return (
        <div className='container-extra-section' style={style}>
            <div className={`list-ready-links extra-section ${open ? 'hidden' : ''}`}>
                <Input 
                    placeholder='Введите ссылку на видео...'
                    style={{width:'100%'}}
                    value={valueInput}
                    name={nameInput}
                    onChange={setValueInput}
                    onKeyDown={onKeyDown}
                />
                <hr/>
                <ul className='beautiful-scrollbar'>
                    {
                        !!listLinksVideos.length ? listLinksVideos.map(link => {
                            return (
                                <li key={link.id}>
                                    <img src={link.img} alt=''/>
                                    <p>{link.link}</p>
                                    <Button 
                                        text='Удалить' 
                                        classNames='btn danger transparently-btn'
                                        onClick={() => onClickDelete(link.link)}
                                    />
                                </li>
                            )
                        }) : <span id='empty-text'>Дополнительных видеороликов нет</span>
                    }
                </ul>
            </div>
        </div>
    )
}