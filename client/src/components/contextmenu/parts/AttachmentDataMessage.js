import React, { useRef, useContext } from 'react'
import { ContextChat } from '../../../contexts/contextChat'
import { ContextConMenu } from '../../../contexts/contextmenu/contextConMenu'

import '../contextmenu.scss'

export const AttachmentDataMessage = () => {
    const logicChat   = useContext(ContextChat)
    const contextmenu = useContext(ContextConMenu)

    const images    = useRef(null)
    const videos    = useRef(null)
    const audios    = useRef(null)
    const documents = useRef(null)

    const onUploadedFiles = type => {
        contextmenu.hide('attachmentDataMessage')

        switch (type) {
            case 'image':
                logicChat.setImagesUpload([...logicChat.imagesUpload, ...images.current.files])
                break
            case 'video':
                logicChat.setVideosUpload([...logicChat.videosUpload, ...videos.current.files])
                break
            case 'audio':
                logicChat.setAudiosUpload([...logicChat.audiosUpload, ...audios.current.files])
                break
            default:
                logicChat.setDocumentsUpload([...logicChat.documentsUpload, ...documents.current.files])
                break
        }
    }
    
    return (
        <>
            <ul>
                <li>
                    <label htmlFor="image">
                        Фотографии 
                        {!!logicChat.imagesUpload.length && <span className='badge-counter'>{logicChat.imagesUpload.length}</span>}
                    </label>
                </li>
                <li>
                    <label htmlFor="videos">
                        Видео
                        {!!logicChat.videosUpload.length && <span className='badge-counter'>{logicChat.videosUpload.length}</span>}
                    </label>
                </li>
                <li>
                    <label htmlFor="documents">
                        Файлы
                        {!!logicChat.documentsUpload.length && <span className='badge-counter'>{logicChat.documentsUpload.length}</span>}
                    </label>
                </li>
                <li>
                    <label htmlFor="audio">
                        Аудио
                        {!!logicChat.audiosUpload.length && <span className='badge-counter'>{logicChat.audiosUpload.length}</span>}
                    </label>
                </li>
            </ul>
            <input 
                ref={images} 
                type="file" 
                id='image' 
                accept='image/png, image/jpg, image/jpeg, image/bmp'
                multiple={true}
                onChange={() => onUploadedFiles('image')}
            />
            <input 
                ref={videos} 
                type="file" 
                id='videos' 
                accept='video/mp4, video/avi' 
                multiple={true}
                onChange={() => onUploadedFiles('video')}
            />
            <input 
                ref={documents} 
                type="file" 
                id='documents' 
                accept='*' 
                multiple={true}
                onChange={() => onUploadedFiles('*')}
            />
            <input 
                ref={audios} 
                type="file" 
                id='audio' 
                accept='audio/wav, audio/mp3' 
                multiple={true}
                onChange={() => onUploadedFiles('audio')}
            />
        </>
    )
}