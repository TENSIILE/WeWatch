import React, { useContext } from 'react'
import { Range } from '../../../../../../components/range/Range'
import { ContextSettings } from '../../../../../../contexts/settingsPage/contextSettings'

export const Other = () => {
  const settings = useContext(ContextSettings)

  return (
    <div className='other'>
      <ul className='clauses-tining'>
        <li className='clause'>
          <div className='tuning-control direction-column'>
            <p className='title mb-1'>Скорость слайдера изображений</p>
            <Range
              min={100}
              max={500}
              defaultValue={settings.speedRangeSliderImage}
              marks={{ 100: '100', 200: '200', 500: '500' }}
              step={10}
              style={{ marginBottom: '1em' }}
              onChange={value => settings.setSpeedRangeSliderImage(value)}
            />
          </div>
        </li>
      </ul>
    </div>
  )
}
