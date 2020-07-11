import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import imageBack from '../static/img/img_slider.png'
import { LogIn } from './blocks/LogIn'
import { SignUp } from './blocks/SignUp'
import { RestorePass } from './blocks/RestorePass'
import { useHttp } from '../hooks/http.hook'
import { ContextInput } from '../contexts/contextInput'
import { ContextAuth } from '../contexts/contextAuth'
import { Alert } from './../components/alert/Alert'
import { ContextAlert } from '../contexts/alert/contextAlert'

import './Auth.scss'


export const AuthPage = () => { 
    const auth = useContext(ContextAuth)

    const alert = useContext(ContextAlert)

    const [ path, setPath ]    = useState('login')
    const { loading, request, error} = useHttp()
    

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
        if(form.password !== form.password_repeat){
            return alert.show('warning', 'Ваши пароли не совпадают!', 'Предупреждение!') 
        }

        try {
            await request('api/auth/register', 'POST', {...form})
            setPath('login')
        } catch (e) {
            alert.show('danger', e.message, 'Ошибка!') 
            console.log(error)
        }
    }

    const loginHandler = async () => {
        try{
            const data = await request('api/auth/login', 'POST', { login: form.login_auth, password: form.password_auth })
            auth.login(data.token, data.userId)
        }catch(e){
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
            {/* {alert.isOpen ? <Alert {...alert.configAlert}/> : null} */}
            <Alert {...alert.configAlert}/>
            <div className='wrapper_authentication'>
                <div className='leftSide'>
                    <div className='container'>
                        <h1 className='heading'>WeWatch</h1>
                        <div className='wrapper_control'>
                            <div className='control'>
                                {
                                    path === 'login' ? 
                                        <LogIn changePath={setPath}/> : 
                                    path === 'restorePass' ? 
                                        <RestorePass changePath={setPath}/> : 
                                    <SignUp changePath={setPath}/>
                                }     
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
