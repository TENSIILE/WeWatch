import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './range.scss'

export const Range = ({
  min,
  max,
  defaultValue,
  marks,
  style,
  step = null,
  onChange,
}) => {
  return (
    <Slider
      min={min}
      defaultValue={defaultValue}
      max={max}
      marks={marks}
      style={style}
      step={step}
      trackStyle={{ background: 'var(--menu-color)' }}
      activeDotStyle={{ borderColor: 'var(--menu-color)' }}
      handleStyle={{ borderColor: 'var(--menu-color)' }}
      dotStyle={{ background: 'var(--white-dark-background)' }}
      railStyle={{ background: 'var(--second-background)' }}
      onChange={onChange}
    />
  )
}
