import React from 'react'
import { ReactSVG } from 'react-svg'
import dots_icon from '../../static/icons/three-dots-horizontal.svg'

import './item.scss'

export const Item = ({src, text, dotsActive = false}) => {
    return (
        <div className='item item-room'>
            <img src={src} alt=''/>
            <p>{text}</p>
            {
                dotsActive ? <ReactSVG src={dots_icon} className='dots'/> : null
            }
        </div>
    )
}