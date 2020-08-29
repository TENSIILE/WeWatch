import React, { useContext } from 'react'
import { AuthInput } from './../../../components/authInput/AuthInput'
import { Button } from './../../../components/button/Button'
import { Checkbox } from './../../../components/checkbox/Checkbox'
import { ContextInput } from './../../../contexts/contextInput'
import { VerificationPass } from './../../../components/verification/VerificationPass'


export const SignUp = () => {
    const {form, changeInputsHandler, loading, registerHandler,
        stateCheckbox, setStateCheckbox, statusTextPass} = useContext(ContextInput)

    return(
        <div className='SignUp'>
            <AuthInput 
                label='Логин'
                type='text'
                placeholder='Введите свой логин'
                name='login'
                onChange={changeInputsHandler}
                text={form.login}
            />
            <AuthInput 
                label='Почта'
                type='text'
                placeholder='Введите свою почту'
                name='email'
                onChange={changeInputsHandler}
                text={form.email}
            />
            <AuthInput 
                label='Пароль'
                type='password'
                placeholder='Введите свой пароль'
                name='password'
                onChange={changeInputsHandler}
                text={form.password}
            />

            <VerificationPass password={form.password}/>

            <AuthInput 
                label='Повторный Пароль'
                type='password'
                placeholder='Введите свой пароль еще раз'
                name='password_repeat'
                onChange={changeInputsHandler}
                text={form.password_repeat}
            />

            <Checkbox 
                style={{marginBottom:'2em', marginTop:'0.5em'}} 
                text='Я принимаю условия пользовательского соглашения'
                state={stateCheckbox}
                setState={setStateCheckbox}
            />

            <div className='line_buttons' style={{marginTop:'1em'}}>
                <Button 
                    text='Зарегистрироваться'
                    classNames='btn primary' 
                    disabled={!stateCheckbox || statusTextPass === 'Слабый' || loading}
                    onClick={registerHandler}
                />
                <Button 
                    text='Назад'
                    classNames='btn simple'
                    linkObj={{isLink:true, path:'/login'}}
                    disabled={loading}
                />
            </div>
        </div>
    )
}