import React from 'react'
import './authInput.scss'

export const AuthInput = ({label, type, placeholder, name, text, onChange, style=null}) => {
    return (
        <div className='authInput' style={style}>
            <label>{label}</label>
            <input 
                type={type}
                placeholder={placeholder}
                value={text}
                onChange={onChange}
                name={name}
            />
        </div>
    )
}

