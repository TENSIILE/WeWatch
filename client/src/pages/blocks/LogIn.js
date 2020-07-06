import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { AuthInput } from './../../components/authInput/AuthInput'
import { Button } from './../../components/button/Button'
import {ContextInput} from '../../contexts/contextInput'


export const LogIn = ({changePath}) => {
    const {form, changeInputsHandler, loading, loginHandler} = useContext(ContextInput)

    return(
        <>
            <AuthInput 
                label='Логин'
                type='text'
                placeholder='Введите свой логин'
                name='login'
                onChange={changeInputsHandler}
                text={form.login}
            />
            <AuthInput 
                label='Пароль'
                type='password'
                placeholder='Введите свой пароль'
                name='password'
                onChange={changeInputsHandler}
                text={form.password}
            />
            <Link className='link' to='#'>Забыли пароль?</Link>

            <div className='line_buttons'>
                <Button text='Войти' classNames='btn primary' disabled={loading} onClick={loginHandler}/>
                <Button text='Регистрация' classNames='btn' onClick={() => changePath('signUp')} disabled={loading}/>
            </div>
        </>
    )
}