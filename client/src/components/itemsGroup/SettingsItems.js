import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import classnames from 'classnames'

export const SettingsItems = ({ 
    disabled,
    icon, 
    title,
    onClick, 
    type
}) => {
    const [highlight, setHighlight] = useState(false)
    const params                    = useParams()

    useEffect(() => {
        if (params.customization === type) {
            setHighlight(true)
        } else {
            setHighlight(false)
        }
    }, [params])

    return (
        <button 
            className={classnames('settings-list__option', {'highlight': highlight})}
            disabled={disabled ? true : false}
            onClick={onClick}
        >
            <ReactSVG 
                src={icon} 
                className='settings-list__icon'
            />
            <li>{title}</li>
        </button>
    )
}