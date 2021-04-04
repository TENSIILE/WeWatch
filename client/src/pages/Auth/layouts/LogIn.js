import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthInput } from './../../../components/authInput/AuthInput'
import { Button } from './../../../components/button/Button'
import { ContextInput } from './../../../contexts/contextInput'

export const LogIn = () => {
  const { form, changeInputsHandler, loading, loginHandler } = useContext(
    ContextInput
  )

  return (
    <>
      <div className='LogIn'>
        <AuthInput
          label='Логин'
          type='text'
          placeholder='Введите свой логин'
          name='login_auth'
          onChange={changeInputsHandler}
          text={form.login_auth}
        />
        <AuthInput
          label='Пароль'
          type='password'
          placeholder='Введите свой пароль'
          name='password_auth'
          onChange={changeInputsHandler}
          text={form.password_auth}
        />

        <Link
          className='link'
          id='link-forget-password'
          to='/login/restore'
          style={{ margin: '1em 0' }}
        >
          Забыли пароль?
        </Link>

        <div className='line_buttons' style={{ marginTop: '1.5em' }}>
          <Button
            text='Войти'
            style={{ width: '100%' }}
            classNames='btn primary'
            disabled={loading}
            onClick={loginHandler}
          />
          <Button
            text='Регистрация'
            classNames='btn simple'
            linkObj={{ isLink: true, path: '/signup' }}
            disabled={loading}
          />
        </div>
      </div>
    </>
  )
}
