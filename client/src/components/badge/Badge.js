import React from 'react'

import './badge.scss'

export const Badge = ({ text }) => <span className={`badge ${!!text ? 'open' : ''}`}> { !!text ? text < 9 ? text : '9+' : null} </span>

