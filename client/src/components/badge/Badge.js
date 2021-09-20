import React from 'react'
import classnames from 'classnames'
import './badge.scss'

export const Badge = ({ text, newClass }) => (
  <span className={classnames('badge', { open: !!text }, [newClass])}>
    {!!text && (text < 9 ? text : '9+')}
  </span>
)

export const BadgeMini = ({ text, newClass }) => (
  <span className={classnames('badge-mini', [newClass])}>{text}</span>
)
