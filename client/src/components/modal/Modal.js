import React, { useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ReactSVG } from 'react-svg'
import classnames from 'classnames'
import { ContextModal } from '../../contexts/modal/contextModal'
import { Button } from '../button/Button'

import { DELETE_FRIEND } from '../../types/modal'
import closeSvg from '../../static/icons/close2.svg'
import './modal.scss'

export const Modal = ({
  title = null,
  size = 'middle',
  style,
  children,
  action,
  disabledArea,
  idMainBtn = null,
}) => {
  const modal = useContext(ContextModal)

  return (
    <CSSTransition
      in={modal.visible[action]}
      timeout={1000}
      classNames={'animationModal'}
      mountOnEnter
      unmountOnExit
    >
      <div className='modal' onClick={e => modal.hide(action, e)}>
        <div className={classnames('window', [size])} style={style}>
          <div className='head'>
            {title !== null && (
              <p
                id='title'
                className={classnames({
                  'title-center': action === DELETE_FRIEND,
                })}
              >
                {title}
              </p>
            )}

            {action !== DELETE_FRIEND && (
              <ReactSVG
                src={closeSvg}
                className='btn-close-modal'
                onClick={() => modal.hide(action)}
              />
            )}
          </div>
          <div className='body'>
            <div className='data-output'>{children}</div>
          </div>
          {disabledArea !== 'footer' && (
            <div className='footer'>
              <Button
                text='Подтвердить'
                classNames='btn success half-opacity'
                emitLabel={true}
                htmlFor={idMainBtn}
              />
            </div>
          )}
        </div>
      </div>
    </CSSTransition>
  )
}
