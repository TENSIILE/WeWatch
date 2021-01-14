import React from 'react'
import classnames from 'classnames'

import './checkbox.scss'

export const Checkbox = ({
    text,
    style = null,
    state,
    setState, 
    newClass,
    id = 'checkbox'
}) => {
    return (
        <div 
            className={classnames('checkbox', [newClass])} 
            style={style}
        >
            <input 
                className='checkbox'
                id={id}
                type='checkbox'
                checked={state}
                onChange={() => setState(!state)}
            />
            <label 
                htmlFor={id}
            >
                {text}
            </label>
        </div>
    )
}