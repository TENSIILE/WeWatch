import React from 'react'
import classnames from 'classnames'
import { ButtonMini } from '../buttonMini/ButtonMini'

import './input.scss'

export const Input = React.forwardRef(
  (
    {
      style,
      isWithButton = false,
      icon,
      onClick,
      placeholder,
      newClass = '',
      onChange,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      value,
      name,
      maxLength,
      disabled = false,
      parentClass = '',
      readOnly = false,
    },
    ref
  ) => (
    <>
      {!isWithButton ? (
        <input
          type='text'
          className={classnames('input-default', [newClass])}
          style={style}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onKeyPress={onKeyPress}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          ref={ref}
        />
      ) : (
        <div className={classnames('input-block', [parentClass])} style={style}>
          <input
            type='text'
            className={newClass}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            maxLength={maxLength}
            disabled={disabled}
            readOnly={readOnly}
            ref={ref}
          />

          <ButtonMini icon={icon} onClick={onClick} newClass='fly' />
        </div>
      )}
    </>
  )
)
