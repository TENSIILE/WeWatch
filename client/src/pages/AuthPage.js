import React from 'react'
import imageBack from '../static/img/img_slider.png'

export const AuthPage = () => {
    return (
        <div className='wrapper_authentication'>
            <div className='leftSide'></div>
            <div className='rightSide'>
                <img src={imageBack} alt=''/>
            </div>
        </div>
    )
}
