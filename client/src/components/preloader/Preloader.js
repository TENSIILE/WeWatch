import React from 'react'
import { Loader } from '../../components/loader/Loader'

import './preloader.scss'

export const Preloader = ({visible = true}) => {
    return (
        <div className={`preloader ${visible ? '' : 'hidden'}`}>
            <div className='sides'>
                <div className='substrate'></div>
                <div className='left block'></div>
                <div className='right block'></div>
            </div>
            <div className='content'>
                <h1>WeWatch</h1>
                <Loader style={{top:'95%', right: '0%', left: 'unset'}}/>
                <p>Подсказка: <span>Чтобы поменять цветовую тему нажмите на клавиши Shift + T</span></p>
            </div>
        </div>
    ) 
}