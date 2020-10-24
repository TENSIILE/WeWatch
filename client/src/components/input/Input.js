import React from 'react'
import { ButtonMini } from '../buttonMini/ButtonMini'
import './input.scss'

export const Input = ({ style, isWithButton = false, icon, onClick, placeholder, newClass = '',
    onChange, onKeyDown, onKeyUp, value, name, maxLength, disabled = false }) => {
        
    return (
        <>
        {
           !isWithButton ? (
                <input 
                    type='text'
                    className={`input-default ${newClass}`}
                    style={style} 
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    maxLength={maxLength}
                    disabled={disabled}
                    
                />
           ) : (
                <div className='input-block' style={style}>
                    <input
                        type='text'
                        className={newClass}
                        placeholder={placeholder}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                        maxLength={maxLength}
                        disabled={disabled}
                    />

                    <ButtonMini
                        icon={icon}
                        onClick={onClick}
                        newClass='fly'
                    />
                </div> 
           )
        }
        </>
           
    )
}