import React from 'react'
import './item.scss'

export const Item = ({src, text}) => {
    return (
        <div className='item-room'>
            <img src={src} alt=''/>
            <p>{text}</p>
        </div>
    )
}