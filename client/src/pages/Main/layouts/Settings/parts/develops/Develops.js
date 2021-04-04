import React, { useContext, useRef } from 'react'
import classnames from 'classnames'
import { ReactSVG } from 'react-svg'
import { Link } from 'react-router-dom'
import { useHttp } from '../../../../../../hooks/http.hook'
import { useHeight } from '../../../../../../hooks/useHeight.hook'
import { Input } from '../../../../../../components/input/Input'
import { Button } from '../../../../../../components/button/Button'
import { SwitchBtn } from '../../../../../../components/switch/Switch'
import { BadgeMini } from '../../../../../../components/badge/Badge'
import { ContextSettings } from '../../../../../../contexts/settingsPage/contextSettings'
import { ContextAlert } from '../../../../../../contexts/alert/contextAlert'
import { ContextAuth } from '../../../../../../contexts/contextAuth'

import { DEVELOPER_MODE } from '../../../../../../types/settingsSwitchBtn'
import { DEVELOPS_API } from '../../../../../../types/settingsItems'

import copySvg from '../../../../../../static/icons/copy.svg'
import config from '../../../../../../config.json'
import './develops.scss'

export const Develops = () => {
  const settings = useContext(ContextSettings)
  const alert = useContext(ContextAlert)
  const auth = useContext(ContextAuth)
  const heightDev = useHeight(settings.switchBtn[DEVELOPER_MODE])
  const inputRef = useRef(null)

  const { request } = useHttp()

  const onCopyToken = () => {
    if (inputRef.current.value) {
      inputRef.current.select()
      document.execCommand('copy')
      alert.show('primary', 'Скопировано!')
    }
  }

  const onAsyncGetTokenUser = async () => {
    if (!inputRef.current.value) {
      try {
        const { tokenApi } = await request(
          `${config.hostServer}/api/getInfo/user/getTokenApi?userId=${auth.userId}`,
          'GET',
          null,
          {
            authorization: `Bearer ${auth.token}`,
          }
        )
        settings.setInputTokenApi(tokenApi)
      } catch (error) {
        alert.show('danger', error.message, 'Ошибка!')
      }
    }
  }

  return (
    <div className='develops'>
      <ul className='clauses-tining'>
        <li className='clause'>
          <div className='tuning-control'>
            <p className='title'>Стать разработчиком</p>
            <SwitchBtn
              size='mini'
              id='develops'
              value={settings.switchBtn[DEVELOPER_MODE]}
              onChange={() => settings.changeSwitchBtn(DEVELOPER_MODE)}
            />
          </div>
        </li>

        <li
          className={classnames('clause transition overflow-h', {
            hidden: !settings.switchBtn[DEVELOPER_MODE],
          })}
          ref={heightDev.ref}
        >
          <div className='tuning-control'>
            <div className='text-info-detail'>
              <div className='text'>
                <p className='title'>Получение токена</p>
                <BadgeMini
                  text='Внимание'
                  newClass='danger mt-unset width-unset'
                />
              </div>
              <span className='description'>
                Ваш токен будет нужен для индентификации ваших действий через
                WeWatch API, поэтому, пожалуйста, держите Ваш токен подальше от
                чужих глаз!
              </span>
            </div>

            <div className='w-100'>
              <div className='input-with-copy'>
                <Input
                  isWithButton={false}
                  newClass='grey-background w-100 pr-3-i'
                  placeholder='Здесь появиться Ваш токен'
                  readOnly={true}
                  value={settings.inputTokenApi}
                  ref={inputRef}
                />
                <ReactSVG
                  src={copySvg}
                  className='copy-icon'
                  onClick={onCopyToken}
                />
              </div>
              <Button
                classNames='btn primary w-100-i mt-1-i'
                text='Получить токен'
                onClick={onAsyncGetTokenUser}
              />
            </div>
          </div>
        </li>

        <li className='clause'>
          <div className='tuning-control'>
            <Link to={`/settings/${DEVELOPS_API}`}>Документация</Link>
          </div>
        </li>
      </ul>
    </div>
  )
}
