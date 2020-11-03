import React from 'react'
import './indicatorOnline.scss'

export const IndicatorOnline = ({ status, style }) => <div style={style} className={`indicator-online ${status}`}></div>
    
