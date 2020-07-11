import React, {useState} from 'react'
import './authInput.scss'
import {ReactSVG} from 'react-svg'
import nonVisible from '../../static/icons/non-visible.svg'

export const AuthInput = ({label, type, placeholder, name, text, onChange, style=null, disabled, innerStyle, icon = '', onClickIcon = null}) => {
    const [typePassword, setTypePassword] = useState('password')

    const changeTypePassword = () => {
        if (typePassword === 'password') {
            setTypePassword('text')
        }else{
            setTypePassword('password')
        }
    }

    return (
        <div className='authInput' style={style}>
            <label>{label}</label>
            {
                type !== 'password' ? (
                    <>
                        <input 
                            type={type}
                            placeholder={placeholder}
                            value={text}
                            onChange={onChange}
                            name={name}
                            disabled={disabled}
                            style={innerStyle}
                        />
                        <ReactSVG
                            src={icon}
                            onClick={onClickIcon}
                            className='icon-input'
                        />
                    </>
                ) : (
                    <>
                        <input 
                            type={typePassword}
                            placeholder={placeholder}
                            value={text}
                            onChange={onChange}
                            name={name}
                            disabled={disabled}
                            style={innerStyle}
                        />
                        <ReactSVG
                            src={nonVisible}
                            onClick={changeTypePassword}
                            className='icon-input'
                        />
                    </>
                )
            }
            
        </div>
    )
}