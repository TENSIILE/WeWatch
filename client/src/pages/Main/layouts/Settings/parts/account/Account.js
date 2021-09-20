import React, { useContext } from 'react'
import { Input } from '../../../../../../components/input/Input'
import { Button } from '../../../../../../components/button/Button'
import { ContextSettings } from '../../../../../../contexts/settingsPage/contextSettings'

export const Account = () => {
  const settings = useContext(ContextSettings)

  return (
    <div className='account'>
      <ul className='clauses-tining'>
        <li className='clause'>
          <div className='tuning-control direction-column'>
            <div className='text-info-detail'>
              <p className='title mb-05'>Изменение пароля</p>
            </div>
            <div className='w-50'>
              <Input
                isWithButton={false}
                newClass='grey-background mt-1 w-100'
                placeholder='Введите ваш новый пароль'
                value={settings.passwordInput}
                onChange={e => settings.setPasswordInput(e.target.value)}
              />
              <Button
                classNames='btn primary half-opacity w-100-i mt-1-i'
                text='Изменить пароль'
                onClick={settings.changePasswordUser}
                disabled={
                  settings.passwordInput.length > 7
                    ? false
                    : true || settings.loading
                }
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
