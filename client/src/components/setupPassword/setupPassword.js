import React from 'react'
import { Button } from '../button/Button'
import { ButtonMini } from '../buttonMini/ButtonMini'
import { Input } from '../input/Input'

import plus from '../../static/icons/plus.svg'
import checked from '../../static/icons/checked.svg'
import './setupPassword.scss'

export const SetupPassword = ({ onClickAccept, successEdit = false, onClickGenerateKey, valueInput, nameInput, onChangeInput, style, disabled }) => {
    return (
        <div className='container-extra-section' style={style}>
            <div className='room-password-setting-block extra-section'>
                <div className='input-and-installation'>
                    <Input 
                        placeholder='Введите защитный ключ...'
                        value={valueInput.trim()}
                        name={nameInput}
                        onChange={onChangeInput}
                        disabled={disabled}
                    />
                    <ButtonMini 
                        icon={successEdit ? checked : plus} 
                        newClass='fly'
                        successEdit={successEdit}
                        onClick={onClickAccept}
                    />
                </div>
                <Button 
                    text='Сгенерировать' 
                    classNames='btn primary' 
                    style={{width:'100%'}}
                    onClick={onClickGenerateKey}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}
