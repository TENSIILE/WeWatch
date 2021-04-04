import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSearcher } from '../../../../../../hooks/searcher.hook'
import { Input } from '../../../../../../components/input/Input'
import { SettingsItems } from '../../../../../../components/itemsGroup/SettingsItems'

import {
  ACCOUNT,
  CONFIDENTIALITY,
  THEMES,
  SECURITY,
  WEBCAM,
  OVERLAY,
  DISPLAY,
  KEYBOARD,
  DEVELOPS,
  UPDATES,
  OTHER,
} from '../../../../../../types/settingsItems'

import {
  account,
  confidentiality,
  themes,
  overlay,
  security,
  webcam,
  display,
  keyboard,
  develops,
  updates,
  other,
} from '../../../../../../static/icons/settings'

import search from '../../../../../../static/icons/Search.svg'
import './settingItems.scss'

export const SettingItems = () => {
  const [settingItem] = useState([
    { title: 'Учетная запись', icon: account, type: ACCOUNT },
    {
      title: 'Конфиденциальность',
      icon: confidentiality,
      type: CONFIDENTIALITY,
    },
    { title: 'Внешний вид', icon: themes, type: THEMES },
    { title: 'Безопасность', icon: security, type: SECURITY },
    { title: 'Дисплей', icon: display, type: DISPLAY },
    { title: 'Микрофон и камера', icon: webcam, type: WEBCAM },
    { title: 'Оверлей', icon: overlay, type: OVERLAY },
    { title: 'Горячие клавиши', icon: keyboard, type: KEYBOARD },
    { title: 'Режим разработчика', icon: develops, type: DEVELOPS },
    { title: 'Список изменений', icon: updates, type: UPDATES },
    { title: 'Прочее', icon: other, type: OTHER },
  ])

  const searcher = useSearcher(settingItem)
  const history = useHistory()

  const onSelectSetting = item => {
    history.push(`/settings/${item.type}`)
  }

  return (
    <>
      <div className='input-form'>
        <Input
          isWithButton={true}
          icon={search}
          style={{ margin: '15px 10px 0 10px', width: '100%' }}
          placeholder='Найти настройку'
          value={searcher.input}
          onChange={e => searcher.setInput(e.target.value)}
          onKeyUp={searcher.search}
          onClick={searcher.search}
        />
      </div>
      <ul className='settings-list beautiful-scrollbar mini'>
        {searcher.array.length ? (
          searcher.array.map((item, i) => {
            return (
              <SettingsItems
                key={i}
                {...item}
                onClick={() => onSelectSetting(item)}
              />
            )
          })
        ) : (
          <span className='empty-text'>Настройка не найдена</span>
        )}
      </ul>
    </>
  )
}
