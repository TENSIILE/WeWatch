import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { Input } from '../input/Input'
import { Button } from '../button/Button'
import { ContextSettings } from '../../contexts/settingsPage/contextSettings'
import { ContextAlert } from '../../contexts/alert/contextAlert'
import { ContextAuth } from '../../contexts/contextAuth'
import { getUserId } from '../../utils/functions'
import { PASS_USER } from '../../types/settingsSwitchBtn'
import config from '../../config.json'
import './securitySection.scss'

export const SecuritySection = () => {
  const [input, setInput] = useState('')
  const { request, loading } = useHttp()

  const settings = useContext(ContextSettings)
  const alert = useContext(ContextAlert)
  const { token } = useContext(ContextAuth)

  useEffect(() => {
    const wrap = async () => {
      const userId = await getUserId()

      if (userId) {
        await request(
          `${config.hostServer}/api/securityAccount/dual_authentication/create`,
          'POST',
          { userId },
          {
            authorization: `Bearer ${token}`,
          }
        )
      }
    }
    wrap()
  }, [])

  const onAcceptKeyDualAuthentication = async () => {
    try {
      const { success } = await request(
        `${config.hostServer}/api/securityAccount/dual_authentication/compare`,
        'POST',
        { keyAccess: input },
        {
          Authorization: `Bearer ${token}`,
        }
      )
      settings.changeSwitchBtn(PASS_USER, true)
      settings.setSuccessfulIdentification(success)
    } catch (error) {
      alert.show('danger', error.message, 'Ошибка!')
    }
  }

  return (
    <div className='security-section'>
      <div className='security-section__form w-50'>
        <h1 className='security-section__title'>WeWatch</h1>
        <h3 className='security-section__description'>
          Пожалуйста, введите код активации, чтобы продолжить...
        </h3>
        <Input
          isWithButton={false}
          newClass='grey-background mt-1 w-100'
          placeholder='Введите код'
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button
          classNames='btn primary half-opacity w-100-i mt-1-i'
          text='Подтвердить'
          onClick={onAcceptKeyDualAuthentication}
          disabled={input.length < 1 || loading}
        />
      </div>
    </div>
  )
}
