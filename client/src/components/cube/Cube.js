import React, { useRef } from 'react'
import { ReactSVG } from 'react-svg'
import classnames from 'classnames'

import check from '../../static/icons/checked.svg'
import './cube.scss'

export const CubeTheme = ({ 
    colors,
    id,
    mainColor,
    turnOn,
    text,
    textColor,
    onClick
}) => {
    const ref = useRef()

    return (
        <div 
            className="frame" 
            data-main-color={mainColor}
        >
            <div 
                className="contain" 
                onClick={() => onClick(ref)}
            >
                <div 
                    className="plane fill-top" 
                    style={{background: colors[0]}}
                />
                <div 
                    className="plane left" 
                    style={{background: colors[2]}}
                />
                <div 
                    className="plane right" 
                    style={{background: colors[1]}}
                />
                <div className="plane bottom"/>
            </div>
            <div 
                className={classnames('select-check', {'select-check--active': turnOn })}
                ref={ref} 
                id={id}
             >
                <ReactSVG 
                    src={check} 
                    className='select-check__icon'
                />
            </div>
            <span 
                style={{color:textColor}}
            >
                {text}
            </span>
        </div> 
    ) 
}