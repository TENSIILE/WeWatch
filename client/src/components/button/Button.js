import React from 'react'
import './Button.scss'
import { Link } from 'react-router-dom'

export const Button = ({text, classNames, linkObj = { isLink: false }, onClick, disabled = false, style = null, id = ''}) => (
    <>
        {
            linkObj.isLink  ? <Link id={id} className={classNames} to={linkObj.path} style={style}>{text}</Link>
                            : <button id={id} className={classNames} onClick={onClick} disabled={disabled} style={style}>{text}</button>
        }
        
    </>
)