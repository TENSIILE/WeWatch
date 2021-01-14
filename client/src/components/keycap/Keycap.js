import React from 'react'
import classnames from 'classnames'

import './keycap.scss'

export const Keycap = ({ text }) => {
    return <div className="keycap">{text}</div>
}

Keycap.Container = ({ children, direction = 'horizontal' }) => {
    return <div className={classnames('keycap-container', [direction])}>{children}</div>
}