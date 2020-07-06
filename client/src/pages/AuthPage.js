import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import imageBack from '../static/img/img_slider.png'
// import { Button } from '../components/button/Button'
import { LogIn } from './blocks/LogIn'
import { SignUp } from './blocks/SignUp'
import { useHttp } from '../hooks/http.hook'
import { ContextInput } from '../contexts/contextInput'
import { ContextAuth } from '../contexts/contextAuth'
import { Alert } from './../components/alert/Alert'



export const AuthPage = () => { 
    const auth = useContext(ContextAuth)

    const [path, setPath]    = useState('login')
    const {loading, request} = useHttp()

    const [form, setForm] = useState({
        login:'', email:'', password:'', password_repeat:''
    })

    const [stateCheckbox, setStateCheckbox] = useState(false)



    const [isOpen, setIsOpen] = useState(false)
    const [configAlert, setConfigAlert] = useState({})



    
    const registerHandler = async () => {
        if(form.password !== form.password_repeat){
            console.log('Пароли не совпали')
            return
        }

        try {
            await request('api/auth/register', 'POST', {...form})
            setPath('login')
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try{
            const data = await request('api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        }catch(e){
            
            setConfigAlert({status:'alert-danger', text:e.message, heading:'Ошибка!',onClick:() => setIsOpen(false)})
            setIsOpen(true)
        }
    }

    
    const changeInputsHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    

    return (
        <ContextInput.Provider value={{
            form, changeInputsHandler, loading, registerHandler, loginHandler, stateCheckbox, setStateCheckbox
        }}>
            {isOpen ? <Alert {...configAlert}/> : null}
            <div className='wrapper_authentication'>
                <div className='leftSide'>
                    <div className='container'>
                        <h1 className='heading'>WeWatch</h1>
                        <div className='wrapper_control'>
                            <div className='control'>
                                <div className='social'>

                                </div>

                                {
                                    path === 'login' ? <LogIn changePath={setPath}/> 
                                                     : <SignUp changePath={setPath}/>
                                }
                                
                                <p className='lead-text'>Имеются проблемы ? &nbsp;
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
