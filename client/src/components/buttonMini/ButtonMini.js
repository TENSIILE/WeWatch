import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import classnames from 'classnames'

import './buttonmini.scss'

export const ButtonMini = React.forwardRef(({ 
    icon, 
    id = '',
    linkObj = {},
    onClick,
    onClickRightButton,
    newClass = "",
    focus,
    style,
    children,
    emitLabel = false,
    htmlFor,
    successEdit
}, ref) => {

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
                        className={classnames('btn-switch-menu', [newClass], [active])}
                        onClick={onClick}
                        onContextMenu={onClickRightButton}
                        id={id}
                        style={style}
                    >
                       {icon && <ReactSVG src={icon}/>}
                       {children}
                    </Link>

                ) : (

                    !emitLabel ? (

                        <button
                            className={classnames('btn-switch-menu', [newClass], [active], {'success-light': successEdit})}
                            onClick={onClick}
                            onContextMenu={onClickRightButton}
                            id={id}
                            style={style}
                            ref={ref}
                        >
                            {icon && <ReactSVG src={icon}/>}
                            {children}
                        </button>

                    ) : (
                        <label
                            className={classnames('btn-switch-menu', [newClass], [active])}
                            onClick={onClick}
                            onContextMenu={onClickRightButton}
                            id={id}
                            style={style}
                            htmlFor={htmlFor}
                        >
                            {icon && <ReactSVG src={icon}/>}
                            {children}
                        </label>
                    )
                )
            }
        </>
    )
})