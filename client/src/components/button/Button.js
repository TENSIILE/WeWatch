import React from 'react'
import { Link } from 'react-router-dom'

import './Button.scss'

export const Button = ({
    text,
    classNames,
    linkObj = { isLink: false },
    onClick,
    disabled = false,
    style = null,
    id = '',
    emitLabel = false,
    htmlFor
}) => (
    <>
        {
            linkObj.isLink  ? (
                <Link 
                    id={id}
                    className={classNames}
                    to={linkObj.path} 
                    style={style}
                >
                    {text}
                </Link>
                )
                : emitLabel ? (
                    <label
                        id={id}
                        className={classNames}
                        onClick={onClick}
                        disabled={disabled}
                        style={style}
                        htmlFor={htmlFor}
                    >
                        {text}
                    </label>
                ) : (
                        <button
                            id={id}
                            className={classNames}
                            onClick={onClick}
                            disabled={disabled}
                            style={style}
                        >
                            {text}
                        </button>
                    )
        }
        
    </>
)