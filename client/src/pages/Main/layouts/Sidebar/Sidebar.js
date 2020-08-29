import React from 'react'
import './sidebar.scss'

export const Sidebar = ({newClass = "", children = null}) => (
    <div className={`sidebar ${newClass}`}>
        {
            children ? children : null
        }
    </div>
)