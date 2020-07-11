import React, { useEffect, useContext } from 'react'
import './verificationPass.scss'
import { ContextInput } from './../../contexts/contextInput'

export const VerificationPass = ({password}) => {
    const {classVerification, setClassVerification, 
        statusTextPass, setStatusTextPass} = useContext(ContextInput)
    
    useEffect(() => {

        if (password.length > 7) {
            setClassVerification('middle-progress')
            setStatusTextPass('Нормальный')

            if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(password)) {
                setClassVerification('full-progress')
                setStatusTextPass('Сильный')
                
            }else{
                setClassVerification('middle-progress')
                setStatusTextPass('Нормальный')
            }

        }else{
            setClassVerification('')
            setStatusTextPass('Слабый')
        }

       
    },[password])

    return (
       <div className='verification-password'>
            <div className={`verification-line ${classVerification}`}/>
            <span className='verification-label'>{statusTextPass}</span>
       </div> 
    )
}