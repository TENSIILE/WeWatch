import React from 'react'
import classnames from 'classnames'
import './switch.scss'

export const SwitchBtn = ({
  size = null,
  value,
  id,
  disabled = false,
  onChange,
}) => (
  <div className={classnames('switch-btn', [size], { disabled: disabled })}>
    <input
      type='checkbox'
      id={id}
      checked={value}
      disabled={disabled}
      onChange={onChange}
    />
    <label htmlFor={id} />
  </div>
)
