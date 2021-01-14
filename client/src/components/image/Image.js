import React, { useState, useRef, useContext, useEffect } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { ContextAuth } from '../../contexts/contextAuth'
import { parseParams } from '../../utils/functions'

import config from '../../config.json'

export const Image = ({ src, id, newClass }) => {
    const { userId, token }       = useContext(ContextAuth)
    const [imageSrc, setImageSrc] = useState(src)
    const ref                     = useRef(null)
    const { request }             = useHttp()

    useEffect(() => {
        setImageSrc(src)
    }, [src])

    useEffect(() => {
        const wrap = async () => {
            const response = await fetch(`${src}?image=${id}`, {method: 'GET'})

            if (response.status === 404) {
                const params = parseParams(response.url)

                let path

                switch (params.image) {
                    case 'header':
                        path = `${config.hostServer}/upload/image/HEADER.png`
                        break
                    case 'avatar':
                        path = `${config.hostServer}/upload/image/USER.jpeg`
                        break
                    default:
                        break
                }
                
                setImageSrc(path)
                await request(`${config.hostServer}/upload/savepath`, 'POST', { path, field: params.image }, {
                    Authorization: `Bearer ${token}`
                })
            }
        }
        wrap()
    }, [src, ref, userId, id, request])

    return (
        <img 
            src={imageSrc} 
            ref={ref}
            className={newClass}
            alt=""
        />
    )
}