import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'

import './soundVisualization.scss'

export const SoundVisualization = ({ isWork }) => {
    const LINE  = 15
    const ARRAY = new Uint8Array(LINE * 2)
    let height, reqAnimFrameId, timeout

    const context  = useRef()
    const analyser = useRef()
    const src      = useRef()

    const ref = useRef(null)

    Number.prototype.map = function(fn) {
        const array = []

        for (let i = 0; i < this; i++) {
            array.push(fn(i))
        }

        return array
    }
    //eslint-disable-next-line

    const loop = () => {
        timeout = setTimeout(() => {
            reqAnimFrameId = requestAnimationFrame(loop)

            analyser.current.getByteFrequencyData(ARRAY)
            
            if (ref.current) {
                for (let i = 0; i < LINE; i++) {
                    height = ARRAY[i + LINE]
                    ref.current.children[i].style.height = height + 'px'
                    ref.current.children[i].style.opacity = 0.008 * height
                }
            }
        }, 50)        
    }

    useEffect(() => {
        if (isWork) {
            context.current  = new AudioContext()
            analyser.current = context.current.createAnalyser()
            
            navigator.mediaDevices.getUserMedia({audio:true}).then(stream => {
                src.current = context.current.createMediaStreamSource(stream)
                src.current.connect(analyser.current)
                loop()
            })

            return () => {
                clearTimeout(timeout)
                cancelAnimationFrame(reqAnimFrameId)
            }
        }
    }, [isWork])


    return (
        <div className='sound-visualization'>
            <ul 
                className={classnames('sound-visualization__list', {'hidden': !isWork})} 
                ref={ref}
            >
                {
                    LINE.map(i => {
                        return (
                            <li 
                                key={i} 
                                className='sound-visualization__list-item'
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}