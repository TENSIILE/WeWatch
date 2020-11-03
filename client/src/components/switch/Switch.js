import React from 'react'
import './switch.scss'

export const SwitchBtn = ({size = null}) => {
    return (
        <div className={`switch-btn ${size}`}>
            <input type="checkbox" id='switch'/>
            <label htmlFor="switch"></label>
        </div>
    )
}