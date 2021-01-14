import React, { useContext } from 'react'
// import { Checkbox } from '../../../../../../components/checkbox/Checkbox'
import { Input } from '../../../../../../components/input/Input'
import { Button } from '../../../../../../components/button/Button'
import { ContextSettings } from '../../../../../../contexts/settingsPage/contextSettings'

export const Account = () => {
    const settings = useContext(ContextSettings)

    return (
        <div className="account">
            <ul className="clauses-tining">

                <li className="clause">
                    <div className="tuning-control direction-column">
                        <div className="text-info-detail">
                            <p className='title mb-05'>Изменение пароля</p>
                        </div>
                        <div className="w-50">
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
                                disabled={settings.passwordInput.length > 7 ? false : true || settings.loading}
                            />
                        </div>
                    </div>
                </li>

                {/* <li className="clause">
                    <div className="tuning-control direction-column">
                        <div className="text-info-detail">
                            <div className="text">
                                <p className='title'>Удаление учетной записи</p>
                                <span className='badge-mini danger mt-unset width-unset'>ВНИМАНИЕ</span>
                            </div>
                            <span>Если Вы удалите свой аккаунт WeWatch, то больше никак не сможете восстановить его. Все данные с Вашим аккаунтом будут стерты!</span> 
                        </div>
                        <Checkbox 
                            text='Я решаю удалить свой аккаунт WeWatch'
                            newClass='darken-text mt-1'
                            state={settings.checkDecideDeleteAccount}
                            setState={settings.setCheckDecideDeleteAccount}
                            
                        />
                        <Button 
                            classNames='btn danger half-opacity w-100-i mt-1-i'
                            text='Удалить аккаунт'
                            disabled={!settings.checkDecideDeleteAccount}
                        />
                    </div>
                </li> */}

            </ul>
        </div>
    )
}