import React, { useState } from 'react'
import { ContextAlert } from './contextAlert'


export const AlertState = ({children}) => {

    const [isOpen, setIsOpen]           = useState(false)
    const [configAlert, setConfigAlert] = useState({}) 

    const show = (status=null, text, heading) => {
        setConfigAlert({status, text, heading, onClick:hide})
        setIsOpen(true)
    }

    const hide = () => {setIsOpen(false)}


    return (
        <ContextAlert.Provider value={{ show, hide, isOpen, configAlert }}>
            {children}
        </ContextAlert.Provider>
    )
}