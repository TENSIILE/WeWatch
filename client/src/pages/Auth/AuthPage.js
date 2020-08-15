import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useHttp } from './../../hooks/http.hook'
import { ContextInput } from './../../contexts/contextInput'
import { ContextAuth } from './../../contexts/contextAuth'
import { Alert } from './../../components/alert/Alert'
import { ContextAlert } from './../../contexts/alert/contextAlert'

import imageBack from '../../static/img/img_slider.png'
import config from '../../config.json'
import './Auth.scss'


export const AuthPage = ({children}) => { 
    const auth = useContext(ContextAuth)

    const alert = useContext(ContextAlert)

    const history = useHistory()

    const { loading, request } = useHttp()
    

    const [form, setForm] = useState({
        login:'', email:'', password:'',
        password_repeat:'', login_auth:'',
        password_auth:'', remember_password_email:'',
        codeCheck:'', new_password:''
    })

    const [stateCheckbox, setStateCheckbox] = useState(false)

    const [classVerification, setClassVerification] = useState('')
    const [statusTextPass, setStatusTextPass]       = useState('Слабый')


    const registerHandler = async () => {
        if (form.password !== form.password_repeat) {
            return alert.show('warning', 'Ваши пароли не совпадают!', 'Предупреждение!') 
        }

        try {
            await request(`${config.hostServer}/api/auth/register`, 'POST', { login: form.login, email: form.email, password: form.password })
            alert.show('success', 'Поздравляю, Вы зарегистрировали аккаунт', 'Успешно!')
            history.push('/login')
        } catch (e) {
            alert.show('danger', e.message, 'Ошибка!') 
        }
    }

    const loginHandler = async () => {
        try{
            const data = await request(`${config.hostServer}/api/auth/login`, 'POST', { login: form.login_auth, password: form.password_auth })
            alert.hide()
            auth.login(data.token, data.userId)
        }catch (e) {
            alert.show('danger', e.message, 'Ошибка!')  
        }
    }


    const changeInputsHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }


    return (
        <ContextInput.Provider value={{
            form, changeInputsHandler, loading,
            registerHandler, loginHandler, stateCheckbox,
            setStateCheckbox, classVerification, setClassVerification,
            statusTextPass, setStatusTextPass
        }}>
            <Alert {...alert.configAlert}/>
            <div className='wrapper_authentication'>
                <div className='leftSide'>
                    <div className='container'>
                        <h1 className='heading'>WeWatch</h1>
                        <div className='wrapper_control'>
                            <div className='control'>
                                {children}
                                <p className='lead-text-help'>Имеются проблемы ? &nbsp;
                                    <Link to='#' className='link link-focused'>Получить помощь</Link>
                                </p>
                            </div>
                        </div>    
                    </div>
                </div>
                <div className='rightSide'>
                    <img src={imageBack} alt=''/>
                </div>
            </div>
        </ContextInput.Provider>
    )
}