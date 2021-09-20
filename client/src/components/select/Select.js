import React, { useState, useRef, useEffect, useCallback } from 'react'
import classnames from 'classnames'
import { ReactSVG } from 'react-svg'
import arrowDownSvg from '../../static/icons/arrow-down.svg'
import './select.scss'

export const Select = ({ options, value, onChange }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [heightMenu, setHeightMenu] = useState()
  const [selectedTitle, setSelectedTitle] = useState('')
  const ref = useRef(null)
  const refList = useRef(null)
  const refMain = useRef(null)
  const HEIGHT_MENU = useRef()

  const listDelegation = (el, e) => {
    if (el && !el.contains(e.target)) {
      setIsOpenMenu(false)
    }
  }

  const onSelectItem = item => {
    try {
      setSelectedTitle(item.label)
      onChange(item)
    } catch (e) {}
  }

  const delegation = useCallback(e => {
    listDelegation.call(this, refMain.current, e)
  }, [])

  useEffect(() => {
    value && setSelectedTitle(value)
  }, [value])

  useEffect(() => {
    document.addEventListener('click', delegation)
    return () => document.removeEventListener('click', delegation)
  }, [delegation])

  useEffect(() => {
    HEIGHT_MENU.current = refList.current.getBoundingClientRect().height + 10
  }, [refList, options])

  useEffect(() => {
    isOpenMenu ? setHeightMenu(HEIGHT_MENU.current) : setHeightMenu(0)
  }, [isOpenMenu])

  return (
    <div
      className={classnames('select', { 'select--focus': isOpenMenu })}
      onClick={() => setIsOpenMenu(!isOpenMenu)}
      ref={refMain}
    >
      {!selectedTitle ? (
        <span className='select__placeholder'>Выберите...</span>
      ) : (
        <p className='select__label'>{selectedTitle}</p>
      )}

      <span className='select__separator' />

      <ReactSVG src={arrowDownSvg} className='select__icon' />
      <div
        className={classnames('select__menu', {
          'select__menu--show': isOpenMenu,
        })}
        ref={ref}
        style={{ height: heightMenu + 'px' }}
      >
        <ul ref={refList}>
          {options &&
            options.map((item, i) => {
              return (
                <li
                  key={i}
                  onClick={() => onSelectItem(item)}
                  className={classnames('select__menu-item', {
                    disabled: item.disabled,
                  })}
                >
                  {item.icon && (
                    <ReactSVG
                      src={item.icon}
                      className='select__menu-item-icon'
                    />
                  )}
                  {item.label}
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}
