import React, { useState } from 'react'
import classnames from 'classnames'
import { ReactSVG } from 'react-svg'

import './buttonToggle.scss'

export const ButtonToggle = ({ isTurnOn = false, icon }) => {
  const [turnOn, setTurnOn] = useState(isTurnOn)

  return (
    <div
      className={classnames('button-toggle', {
        'button-toggle--active': turnOn,
      })}
      onClick={() => setTurnOn(!turnOn)}
    >
      <ReactSVG
        src={icon}
        className='button-toggle__icon
            '
      />
    </div>
  )
}

ButtonToggle.Container = ({ children }) => (
  <div className='button-toggle__container'>{children}</div>
)
