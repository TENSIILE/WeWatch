import React from 'react'
import classnames from 'classnames'
import './indicatorOnline.scss'

export const IndicatorOnline = ({ status, style, newClass }) => (
  <div
    style={style}
    className={classnames('indicator-online', [status], [newClass])}
  />
)
