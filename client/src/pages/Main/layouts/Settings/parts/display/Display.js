import React, { useContext } from 'react'
import { SwitchBtn } from '../../../../../../components/switch/Switch'
import { Range } from '../../../../../../components/range/Range'
import { ContextSettings } from '../../../../../../contexts/settingsPage/contextSettings'
import { NIGHT_SHIFT } from '../../../../../../types/settingsSwitchBtn'

export const Display = () => {
  const settings = useContext(ContextSettings)

  return (
    <div className='display'>
      <ul className='clauses-tining'>
        <li className='clause'>
          <div className='tuning-control with-description'>
            <div className='tuning-control__wrapper-column w-100 align-items-center flex-wrap'>
              <p className='title mb-1'>Яркость</p>
              <Range
                min={10}
                max={100}
                step={1}
                defaultValue={settings.displayBrightness}
                onChange={value => settings.setDisplayBrightness(value)}
                marks={{ 10: '10%', 50: '50%', 100: '100%' }}
                style={{ marginBottom: '1em' }}
              />
            </div>
          </div>
        </li>

        <li className='clause'>
          <div className='tuning-control'>
            <div className='text-info-detail'>
              <p className='title'>Night Shift</p>
              <span className='description'>
                Функция Night Shift автоматически смещает цвета дисплея к более
                теплому краю спектра, чтобы снизить нагрузку на глаза.
              </span>
            </div>
            <SwitchBtn
              size='mini'
              id='night-shift'
              value={settings.switchBtn[NIGHT_SHIFT]}
              onChange={() => settings.changeSwitchBtn(NIGHT_SHIFT)}
            />
          </div>
        </li>
      </ul>
    </div>
  )
}
