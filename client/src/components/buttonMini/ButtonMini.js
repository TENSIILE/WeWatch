import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

import './buttonmini.scss'

export const ButtonMini = ({icon, id = '', linkObj={}, onClick, newClass = "", focus, style, children, emitLabel = false, htmlFor}) => {
    const [active, setActive] = useState('')

    useEffect(() => {
        focus ? setActive('active') : setActive('')
    }, [focus])
    
    return (
        <>
            {
                linkObj.isLink ? (

                    <Link 
                        to={linkObj.path}
                        className={`btn-switch-menu ${newClass} ${active}`}
                        onClick={onClick}
                        id={id}
                        style={style}
                    >
                       { icon ? <ReactSVG src={icon}/> : null }
                       {children}
                    </Link>

                ) : (

                    !emitLabel ? (

                        <button
                            className={`btn-switch-menu ${newClass} ${active}`}
                            onClick={onClick}
                            id={id}
                            style={style}
                        >
                            { icon ? <ReactSVG src={icon}/> : null }
                            {children}
                        </button>

                    ) : (
                        <label
                            className={`btn-switch-menu ${newClass} ${active}`}
                            onClick={onClick}
                            id={id}
                            style={style}
                            htmlFor={htmlFor}
                        >
                            { icon ? <ReactSVG src={icon}/> : null }
                            {children}
                        </label>
                    )
                )
            }
        </>
    )
}