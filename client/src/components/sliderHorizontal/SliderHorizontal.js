import React, { useState, useEffect, useRef, useContext } from 'react'
import classnames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { ReactSVG } from 'react-svg'
import { ContextSettings } from '../../contexts/settingsPage/contextSettings'
import { debounce } from '../../utils/functions'

import arrowLeft from '../../static/icons/arrow-left.svg'
import './sliderHorizontal.scss'

export const SliderHorizontal = ({
  newClass = '',
  isVisible = false,
  children,
  isVisibleButton = true,
}) => {
  const settings = useContext(ContextSettings)
  const [position, setPosition] = useState(0)
  const [visibleBtn, setVisibleBtn] = useState(false)
  const [offset] = useState(settings.speedRangeSliderImage)
  const sliderRef = useRef(null)

  const swiperHandler = side => {
    switch (side) {
      case 'left':
        if (position >= 0 && position - offset >= 0) {
          setPosition(position - offset)
        } else setPosition(0)
        break
      default:
        if (
          position <
          sliderRef.current.scrollWidth -
            sliderRef.current.offsetLeft -
            sliderRef.current.offsetWidth
        )
          setPosition(position + offset)
        break
    }
  }

  const resize = debounce(() => {
    if (
      sliderRef.current &&
      sliderRef.current.offsetWidth < sliderRef.current.scrollWidth
    ) {
      setVisibleBtn(true)
    } else setVisibleBtn(false)
  }, 1000)

  useEffect(resize, [children])

  useEffect(() => {
    sliderRef.current && sliderRef.current.scrollTo(position, 0)
  }, [position])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <CSSTransition
      in={isVisible}
      timeout={400}
      classNames={'slider-horizontal'}
      mountOnEnter
      unmountOnExit
    >
      <div className={`slider ${newClass}`}>
        <div className='slide-path' ref={sliderRef}>
          {children}
        </div>
        {isVisibleButton && (
          <div
            className={classnames('btn-slider-container', {
              visible: visibleBtn,
            })}
          >
            <button
              className='btn-slider-contain'
              onClick={() => swiperHandler('left')}
            >
              <ReactSVG src={arrowLeft} className='btn-slider left' />
            </button>

            <button
              className='btn-slider-contain'
              onClick={() => swiperHandler('right')}
            >
              <ReactSVG src={arrowLeft} className='btn-slider right' />
            </button>
          </div>
        )}
      </div>
    </CSSTransition>
  )
}
