import React from 'react'
import { ReactSVG } from 'react-svg'
import { Button } from '../button/Button'

import './infoBlockRoom.scss'

export const InfoBlockRoom = ({ 
    icon,
    text,
    textButton,
    linkObj,
    onClickButton
}) => (
    <div className='room-creation-information-block information-block beautiful-scrollbar'>
        <ReactSVG 
            src={icon}
        />

        <p className='information-block__text'>{text}</p>

        <Button 
            text={textButton} 
            classNames='btn primary' 
            style={{width:400}} 
            linkObj={linkObj}
            onClick={onClickButton}
        />
    </div>
)
    