import React, { useContext } from 'react'
import { ContextModal } from '../../contexts/modal/contextModal'
import { CSSTransition } from 'react-transition-group'
import { ReactSVG } from 'react-svg'
import { Button } from '../button/Button'
import closeSvg from '../../static/icons/close2.svg'
import { DELETE_FRIEND } from '../../types/components'

import './modal.scss'

export const Modal = ({ title = null, size = 'middle', style, children, idMainBtn = null, action, disabledArea }) => {
    const modal = useContext(ContextModal)

    return (
        <CSSTransition  
            in={modal.visible[action]}
            timeout={1000} 
            classNames={'animationModal'} 
            mountOnEnter unmountOnExit
        >
            <div className='modal' onClick={e => modal.hide(action, e)}>
                <div className={`window ${size}`} style={style}>
                    <div className='head'>
                        {
                            title !== null ? (
                                <p id='title' 
                                    className={action === DELETE_FRIEND ? 'title-center' : ''}
                                >
                                    {title}
                                </p> 
                            ) : null
                        }

                        {
                            action !== DELETE_FRIEND ? (
                                <ReactSVG
                                    src={closeSvg}
                                    className='btn-close-modal'
                                    onClick={() => modal.hide(action)}
                                />
                            ) : null
                        }

                    </div>
                    <div className='body'>
                        <div className='data-output'>
                            {children}
                        </div>
                    </div>
                    {
                        disabledArea !== 'footer' ? (
                            <div className='footer'>
                                <Button
                                    text='Подтвердить'
                                    classNames='btn success half-opacity'
                                    emitLabel={true}
                                    htmlFor={idMainBtn}
                                />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </CSSTransition>
    )
}