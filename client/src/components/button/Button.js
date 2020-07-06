import React from 'react'
import './Button.scss'
import { Link } from 'react-router-dom'

export const Button = ({text, classNames, linkObj = {isLink:false}, onClick, disabled=false, style=null}) => (
    <>
        {
            linkObj.isLink  ? <Link className={classNames} to={linkObj.path} style={style}>{text}</Link>
                            : <button className={classNames} onClick={onClick} disabled={disabled} style={style}>{text}</button>
        }
        
    </>
)