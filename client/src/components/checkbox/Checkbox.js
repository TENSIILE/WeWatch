import React from 'react'
import './checkbox.scss'

export const Checkbox = ({text, style=null, state, setState}) => {
    return (
        <div className='checkbox' style={style}>
            <input id='checkbox' type='checkbox' checked={state} onChange={() => setState(!state)}/>
            <label htmlFor='checkbox'>{text}</label>
        </div>
    )
}