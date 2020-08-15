import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ReactSVG } from 'react-svg'
import { Button } from '../button/Button'
import { Input } from '../input/Input'
import arrow from '../../static/icons/arrow-left.svg'
import closeSvg from '../../static/icons/close2.svg'
import settings from '../../static/icons/Settings.svg'

import './modal.scss'

export const Modal = ({title = null, isShowCustomizationZoneImage = false, size = 'middle', children, eventOpen = {}, idMainBtn = null, options}) => {
    const [openCustomization, setOpenCustomization] = useState(false)
    const [valueUrlToPicture, setValueUrlToPicture] = useState('')

    //https://sun1-29.userapi.com/c857736/v857736923/1cf0d6/Ggmc2yQfr50.jpg
    const toggleSettingsHandler = () => setOpenCustomization(!openCustomization)
 
    return (
        <CSSTransition in={eventOpen.openModal} timeout={1000} classNames={'animationModal'} mountOnEnter unmountOnExit>
            <div className='modal'>
                <div className={`window ${size}`}>
                    <div className='head'>
                        <p id='title'>{title}</p>

                        <ReactSVG
                            src={closeSvg}
                            className='btn-close-modal'
                            onClick={() => eventOpen.setOpenModal(false)}
                        />

                    </div>
                    <div className='body'>
                        {
                            isShowCustomizationZoneImage ? (
                                <div id='customization' className={openCustomization ? 'open' : null}>
                                    <h3 id='settings-label'>Настройки</h3>

                                    <Input
                                        placeholder='Введите url до картинки'
                                        text={valueUrlToPicture}
                                        onChange={e => setValueUrlToPicture(e.target.value)}
                                        className='input'
                                        style={{width:'100%'}}
                                    />

                                    <Button
                                        text='Установить картинку'
                                        classNames='btn primary half-opacity'
                                        style={{marginTop:'1em', width:'100%'}}
                                    />

                                </div>
                            ) : null 
                        }
                    
                        <div className='data-output'>
                            {children}
                        </div>
                    </div>
                    <div className='footer'>
                        {
                            isShowCustomizationZoneImage ? (
                                <div className='btn-toggle-customs' onClick={toggleSettingsHandler}>
                                    <ReactSVG src={settings} id='settings'/>
                                    <ReactSVG src={arrow} id='arrow' className={openCustomization ? 'open' : null}/>
                                </div>
                            ) : null
                        }

                        <Button
                            text='Подтвердить'
                            classNames='btn success half-opacity'
                            emitLabel={true}
                            htmlFor={idMainBtn}
                        />
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}