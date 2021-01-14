import React, { useState, useContext, useRef, useEffect } from 'react'
import { ReactSVG } from 'react-svg'
import { ContextChat } from '../../../../contexts/contextChat'

import close from '../../../../static/icons/close2.svg'
import docs_ico from '../../../../static/icons/documents.svg'

import video_ico from '../../../../static/icons/youtube (1).svg'
import audio_ico from '../../../../static/icons/speaker.svg'

import './attachedFile.scss'

export const AttachedFile = ({ 
    img,
    title,
    size,
    type
}) => {
    const logicChat   = useContext(ContextChat)
    const reference   = useRef(null)
    const [typeFile,
         setTypeFile] = useState(null)

    useEffect(() => {
        switch (type.split('/')[0]) {
            case 'image':
                setTypeFile('image')
                break
            case 'audio':
                setTypeFile('audio')
                break
            case 'video':
                setTypeFile('video')
                break
            default:
                setTypeFile('documents')
        }
    }, [type])

    return (
        <div 
            className='file' 
            ref={reference}
            id={`${title}/${type}`}
        >
            <div className='data'>
                {
                    typeFile === 'image' ? <img src={img} alt=''/> :
                    typeFile === 'audio' ? (
                        <div className='background-image color--blue'>
                            <ReactSVG src={audio_ico} className='background-image--ico'/>
                        </div>
                    ) :
                    typeFile === 'video' ? (
                        <div className='background-image color--red'>
                            <ReactSVG src={video_ico} className='background-image--ico'/>
                        </div>
                    ) : (
                        <div className='background-image color--green'>
                            <ReactSVG src={docs_ico} className='background-image--ico'/>
                        </div>
                    )
                }
                <div className="text-info">
                    <span>{title}</span>
                    <small>{size}</small>
                </div>
            </div>
            <ReactSVG 
                src={close} 
                className='file--remove'
                onClick={() => logicChat.onRemoveAttachedFiles(reference.current.id)}
            />
        </div>
    )
}