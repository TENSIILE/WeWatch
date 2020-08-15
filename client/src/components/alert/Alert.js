import React, { useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ReactSVG } from 'react-svg'
import { ContextAlert } from '../../contexts/alert/contextAlert'
import closeSvg from '../../static/icons/close2.svg'
import './alert.scss'

export const Alert = ({status=null, text, heading, onClick}) => { 
    const alert = useContext(ContextAlert)
    //&nbsp;
    return (
        <CSSTransition in={alert.isOpen} timeout={3000} classNames={'animationAlert'} mountOnEnter unmountOnExit>
            <div className={`alert alert-${status}`}>
                <p> <strong>{heading}</strong> {text} </p>
                <ReactSVG onClick={onClick} src={closeSvg}/>
            </div>
        </CSSTransition>
    ) 
}