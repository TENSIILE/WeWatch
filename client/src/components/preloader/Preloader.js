import React from 'react'
import { ReactSVG } from 'react-svg'
import classnames from 'classnames'
import { Loader } from '../../components/loader/Loader'

import WeWatch from '../../static/icons/WeWatch.svg'

import './preloader.scss'

export const Preloader = ({ visible = true }) => {
    return (
        <div className={classnames('preloader', {'hidden': !visible})}>
            <div className='sides'>
                <div className='substrate'></div>
                <div className='left block'></div>
                <div className='right block'></div>
            </div>
            <div className='content'>
                <ReactSVG src={WeWatch} className='logo'/>
                <Loader style={{top:'95%', right: '0%', left: 'unset'}}/>
                <p>Подсказка: <span>Чтобы поменять цветовую тему нажмите на клавиши Shift + T</span></p>
            </div>
        </div>
    ) 
}