import React, { useEffect } from 'react'
import { ReactSVG } from 'react-svg'

import check from '../../static/icons/checked.svg'

import './imageDirectory.scss'

export const ImageDirectory = ({ 
    arrayImages,
    selectImage,
    setSelectImage,
    onToggle,
    reference
}) => {
    const onSelect = (e, img) => {
        const link = e && e.target.closest('.image-directory__photo-container').querySelector(`.image-directory__set-background[data-url='${img}']`)

        const { background, classActive } = init()

        if (!e) {
            background.forEach(item => { 
                if (item.dataset.url === img && !item.classList.contains(classActive)) {
                    return item.classList.add(classActive)
                }
            })
        }
        
        if (link && link.dataset.url === img) {
            clearSelect({ background, classActive })

            if (!link.classList.contains(classActive)) {
                link.classList.add(classActive)
            } 
        }

        setSelectImage(img)
    }

    const init = () => {
        const background  = reference.current.querySelectorAll(`.image-directory__set-background`)
        const classActive = 'image-directory__set-background--active'
        return { background, classActive }
    }

    const clearSelect = ({ background, classActive }) => {
        background.forEach(photo => photo.classList.remove(classActive))
    }

    useEffect(() => onSelect(null, selectImage), [])
    useEffect(() => {
        if (!selectImage) clearSelect({...init()})
    }, [selectImage])
    
    return (
        <div className='image-directory'>
            <div 
                className="image-directory__list-photos" 
                ref={reference}
            >
                {
                    arrayImages.map((image, i) => {
                        return (
                            <div 
                                className='image-directory__photo-container' 
                                key={i}
                                onClick={e => onSelect(e, image)}
                            >
                                <div 
                                    className='image-directory__set-background'
                                    data-url={image}
                                >
                                    <ReactSVG 
                                        src={check} 
                                        className='image-directory__icon'
                                    />
                                </div>
                                <img 
                                    className='image-directory__photo'
                                    src={image} 
                                    alt=""
                                />
                            </div>
                           
                        )
                    })
                }
            </div>
            <div 
                className="image-directory__uncover" 
                onClick={onToggle}
            />
        </div>
    ) 
}