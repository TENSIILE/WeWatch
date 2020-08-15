import React, { useContext, useState } from 'react'
import { AuthInput } from './../../../components/authInput/AuthInput'
import { Button } from './../../../components/button/Button'
import { ContextInput } from './../../../contexts/contextInput'
import { VerificationPass } from './../../../components/verification/VerificationPass'
import { ContextAlert } from './../../../contexts/alert/contextAlert'


export const RestorePass = () => {
    const alert = useContext(ContextAlert)
    const {form, changeInputsHandler, loading, statusTextPass} = useContext(ContextInput)
    const [codeEntryInputRecovery, setCodeEntryInputRecovery]  = useState(false)
    const [activeInputNewPassword, setActiveInputNewPassword]  = useState(true)

    const sendCodeToEmail = async () => {
        setCodeEntryInputRecovery(true)
    }
        
    // -----------------------------------


    const confirmPassword = () => {

    }

    const confirmCode = () => {
        if (form.codeCheck === '') {
            alert.show('warning', 'Вы забыли ввести код подтверждения!', 'Предупреждение! ')
        }else{
            setActiveInputNewPassword(false)
        }
    }


    return (
        <div className='remember_password'>
            {
                !codeEntryInputRecovery ? 
                <>
                    <AuthInput 
                        label='Почта'
                        type='text'
                        placeholder='Введите почту для восстановления пароля'
                        name='remember_password_email'
                        onChange={changeInputsHandler}
                        text={form.remember_password_email}
                    />
            
                    <div className='line_buttons' style={{marginTop:'1em'}}>
                        <Button 
                            text='Восстановить пароль'
                            style={{width:'200%'}}
                            classNames='btn primary'
                            disabled={loading}
                            onClick={sendCodeToEmail}
                        />
                        <Button
                            text='Назад'
                            classNames='btn'
                            linkObj={{isLink:true, path:'/login'}}
                            disabled={loading}
                        />
                    </div>
                
                </> :

                <>
                    <div className='code_container' style={{ display:'flex', alignItems:'center', width:'360px', justifyContent:'center'}}>
                        <AuthInput 
                            label='Код'
                            type='text'
                            placeholder='Введите код подтверждения'
                            name='codeCheck'
                            onChange={changeInputsHandler}
                            text={form.codeCheck}
                            style={{width:'80%', marginBottom:0}}
                            innerStyle={{width:220}}
                            disabled={!activeInputNewPassword}
                        />
                        <Button text='ОК'
                            classNames='btn'
                            onClick={confirmCode}
                            style={{padding:0, width:'20%', zIndex:10, marginTop:23}}
                            disabled={!activeInputNewPassword || loading}
                        />
                    </div>
                    

                    <AuthInput 
                        label='Новый пароль'
                        type='password'
                        placeholder='Введите новый пароль'
                        name='new_password'
                        onChange={changeInputsHandler}
                        text={form.new_password}
                        disabled={activeInputNewPassword}
                    />

                    <VerificationPass password={form.new_password}/>

                    <Button 
                        text='Подтвердить'
                        style={{width:'100%'}} 
                        classNames='btn primary'
                        disabled={statusTextPass === 'Слабый' || loading}
                        onClick={confirmPassword}
                    />
                </>
            } 
            
        </div>
    )
}