import React, { useContext } from 'react'
import { Radio } from '../../../../../../components/radio/Radio'
import { SwitchBtn } from '../../../../../../components/switch/Switch'
import { ContextSettings } from '../../../../../../contexts/settingsPage/contextSettings'
import { CLOSE_PROFILE } from '../../../../../../types/settingsSwitchBtn'

export const Confidentiality = () => {
  const settings = useContext(ContextSettings)

  return (
    <div className='confidentiality'>
      <ul className='clauses-tining'>
        <li className='clause'>
          <div className='tuning-control'>
            <div className='text-info-detail'>
              <p className='title'>Закрытый профиль</p>
              <span className='description'>
                Закрытый профиль позволяет запретить просмотр информации в Вашем
                профиле
              </span>
            </div>
            <SwitchBtn
              size='mini'
              id='close-profile'
              value={settings.switchBtn[CLOSE_PROFILE]}
              onChange={() => settings.changeSwitchBtn(CLOSE_PROFILE)}
            />
          </div>
        </li>

        <li className='clause'>
          <div className='tuning-control direction-column'>
            <div className='text-info-detail'>
              <p className='title'>Добавление в друзья</p>
              <span className='description'>
                Изменив данный пункт на "Все", любой пользователь WeWatch сможет
                отправить Вам запрос в друзья. При выбранном пункте "Никто",
                больше ни один пользователь не сможет добавиться к Вам в друзья.
              </span>
            </div>
            <Radio.Container>
              <Radio
                text='Все'
                id='all'
                state={settings.addingToFriend}
                setState={settings.setAddingToFriend}
                stateElement={settings.addingToFriend['all']}
              />
              <Radio
                text='Никто'
                id='nobody'
                state={settings.addingToFriend}
                setState={settings.setAddingToFriend}
                stateElement={settings.addingToFriend['nobody']}
              />
            </Radio.Container>
          </div>
        </li>
      </ul>
    </div>
  )
}
