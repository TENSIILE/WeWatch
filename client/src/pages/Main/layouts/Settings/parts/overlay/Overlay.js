import React, { useContext } from 'react'
import classnames from 'classnames'
import { SwitchBtn } from '../../../../../../components/switch/Switch'
import { OverlaySettings } from '../../../../../../components/overlay/Overlay'
import { ContextSettings } from '../../../../../../contexts/settingsPage/contextSettings'

import { OVERLAY } from '../../../../../../types/settingsSwitchBtn'

export const Overlay = () => {
  const settings = useContext(ContextSettings)

  const defineHeight = () => (settings.switchBtn[OVERLAY] ? '245px' : '0px')

  return (
    <div className='overlay'>
      <ul className='clauses-tining'>
        <li className='clause'>
          <div className='tuning-control'>
            <div className='text-info-detail'>
              <p className='title'>Включить оверлей</p>
              <span className='description'>
                Включенный оверлей позволит Вам смотреть видеоролики поверх
                любых страниц
              </span>
            </div>
            <SwitchBtn
              size='mini'
              id='overlay'
              value={settings.switchBtn[OVERLAY]}
              onChange={() => settings.changeSwitchBtn(OVERLAY)}
            />
          </div>
        </li>

        <li
          className={classnames('clause transition overflow-h', {
            hidden: !settings.switchBtn[OVERLAY],
          })}
          style={{ height: defineHeight() }}
        >
          <div className='tuning-control direction-column'>
            <div className='text-info-detail'>
              <p className='title mb-05'></p>
            </div>
            <div className='w-50'>
              <OverlaySettings
                screen={settings.overlay}
                onScreen={settings.setOverlay}
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
