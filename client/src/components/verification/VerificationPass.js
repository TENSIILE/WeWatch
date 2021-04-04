import React, { useEffect, useContext } from 'react'
import classnames from 'classnames'
import { ContextInput } from './../../contexts/contextInput'
import './verificationPass.scss'

export const VerificationPass = ({ password }) => {
  const {
    classVerification,
    setClassVerification,
    statusTextPass,
    setStatusTextPass,
  } = useContext(ContextInput)

  useEffect(() => {
    if (password.length > 7) {
      setClassVerification('middle-progress')
      setStatusTextPass('Нормальный')

      if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(password)) {
        setClassVerification('full-progress')
        setStatusTextPass('Сильный')
      } else {
        setClassVerification('middle-progress')
        setStatusTextPass('Нормальный')
      }
    } else {
      setClassVerification('')
      setStatusTextPass('Слабый')
    }
  }, [password])

  return (
    <div className='verification-password'>
      <div className={classnames('verification-line', [classVerification])} />
      <span className='verification-label'>{statusTextPass}</span>
    </div>
  )
}
