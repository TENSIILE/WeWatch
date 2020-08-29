import React from 'react'
import { ReactSVG } from 'react-svg'
import { Button } from '../../components/button/Button' 

import close from '../../static/icons/close2.svg'
import dots_icon from '../../static/icons/three-dots-horizontal.svg'

import './item.scss'

export const Item = ({src, text, dotsActive = false, isOnButton, isButtonAccept = true, isButtonDelete, textButton, newClass = '', onClick, onClickDelete, disabledButton = false}) => {
    return (
        <div className={`item ${newClass}`}>
            <img src={src} alt=''/>
            <p>{text}</p>
            {
                dotsActive ? <ReactSVG src={dots_icon} className='dots'/> : null
            }
            {
                isOnButton ? 
                    <>
                        {
                            isButtonAccept ? (
                                <Button
                                    text={textButton}
                                    classNames='btn primary transparently-btn'
                                    onClick={onClick}
                                    disabled={disabledButton} 
                                /> 
                            ) : null  
                        }  
                        {
                            isButtonDelete ? (
                                <Button
                                    text={<ReactSVG src={close}/>}
                                    classNames='btn danger transparently-btn'
                                    onClick={onClickDelete}
                                /> 
                            ) : null
                        }
                    </> 
                    : null
            }
        </div>
    )
}