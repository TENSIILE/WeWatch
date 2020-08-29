import React from 'react'
import { ButtonMini } from '../buttonMini/ButtonMini'
import './input.scss'

export const Input = ({style, isWithButton = false, icon, onClick, placeholder, newClass = null, onChange, onKeyDown, value, name, maxLength}) => {
    return (
        <>
        {
           !isWithButton ?  (
                <input 
                    type='text'
                    className={`input-default ${newClass}`}
                    style={style} 
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    maxLength={maxLength}
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
                        maxLength={maxLength}
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