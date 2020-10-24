import React, { useState, useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { useHttp } from '../../hooks/http.hook'
import { ContextAlert } from '../../contexts/alert/contextAlert'

import nonVisible from '../../static/icons/non-visible.svg'
import checked from '../../static/icons/checked.svg'
import close from '../../static/icons/close2.svg'

import config from '../../config.json'

import './authInput.scss'

export const AuthInput = ({label, type, placeholder, name, text, onChange, style=null, disabled, innerStyle, icon = null, onClickIcon = null}) => {
    const [typePassword, setTypePassword] = useState('password')
    const alert                           = useContext(ContextAlert)
    const { request }                     = useHttp()

    const changeTypePassword = () => {
        if (typePassword === 'password') {
            setTypePassword('text')
        }else{
            setTypePassword('password')
        }
    }

    const checkedLoginValid = async () => {
        if (text.trim().toString() !== '') {
            try {
                await request(`${config.hostServer}/api/auth/login/checked_valid`, 'POST', { login: text })
            } catch (e) {
                alert.show('danger', e.message, 'Ошибка!')  
            }
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
                            onBlur={name === 'login' ? checkedLoginValid : null}
                        />
                        {
                            type === 'email' ? (
                                <>
                                    <ReactSVG
                                        src={checked}
                                        className='validate-icon good'
                                    />
                                    <ReactSVG
                                        src={close}
                                        className='validate-icon bad'
                                    />
                                </>
                            ) : null
                        }
                        {
                            icon ? (
                                <ReactSVG
                                    src={icon}
                                    onClick={onClickIcon}
                                    className='icon-input'
                                />
                            ) : null
                        }
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