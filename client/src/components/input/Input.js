import React from 'react'
import { ButtonMini } from '../buttonMini/ButtonMini'
import './input.scss'

export const Input = ({style, isWithButton = false, icon, onClick, placeholder}) => {
    return (
        <>
        {
           !isWithButton ?  (
                <input type='text' className='input-default' style={style} placeholder={placeholder}/>
           ) : (
                <div className='input' style={style}>
                    <input type='text' placeholder={placeholder}/>
                    <ButtonMini icon={icon} onClick={onClick} newClass='fly'/>
                </div> 
           )
        }
        </>
           
    )
}