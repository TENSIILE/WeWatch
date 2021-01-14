import React from 'react'
import { ReactSVG } from 'react-svg'
import classnames from 'classnames'

import check from '../../static/icons/checked.svg'

import './overlay.scss'

export const Overlay = () => {
    return (
        <div className='overlay-component position-left-top'>
            <h1>HELLO WORLD</h1>
        </div>
    )
}

export const OverlaySettings = ({ screen, onScreen }) => {
    const onSelect = e => {
        onScreen({...screen, 'screen': {
            'screen-1':false, 'screen-2':false, 
            'screen-3':false, 'screen-4':false,
            [e.target.closest('div.screen').id]: true
        }})
    }

    return (
        <div className="overlay-settings">
            <div 
                className={classnames("screen left-top", {'active': screen.screen['screen-1']})} 
                onClick={onSelect}
                id='screen-1'
            >
                <ReactSVG 
                    src={check} 
                    className='screen-icon'
                />
            </div>
            <div 
                className={classnames("screen left-bottom", {'active': screen.screen['screen-2']})} 
                onClick={onSelect}
                id='screen-2'
            >
                <ReactSVG 
                    src={check} 
                    className='screen-icon'
                />
            </div>
            <div 
                className={classnames("screen right-top", {'active': screen.screen['screen-3']})} 
                onClick={onSelect}
                id='screen-3'
            >
                <ReactSVG 
                    src={check} 
                    className='screen-icon'
                />
            </div>
            <div 
                className={classnames("screen right-bottom", {'active': screen.screen['screen-4']})} 
                onClick={onSelect}
                id='screen-4'
            >
                <ReactSVG 
                    src={check} 
                    className='screen-icon'
                />
            </div>
        </div>
    )
}