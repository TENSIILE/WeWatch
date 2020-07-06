import React from 'react'
import './alert.scss'

export const Alert = ({status=null, text, heading, onClick}) => {
    return (
        <div className={`alert ${status}`}>
            <p> <strong>{heading}</strong> &nbsp; {text} </p>
            <span onClick={onClick}> &times; </span>
        </div>
    ) 
}