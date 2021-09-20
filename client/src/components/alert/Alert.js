import React, { useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ReactSVG } from 'react-svg'
import classnames from 'classnames'
import { ContextAlert } from '../../contexts/alert/contextAlert'

import error from '../../static/icons/errorIco.svg'
import success from '../../static/icons/successIco.svg'
import info from '../../static/icons/infoIco.svg'
import closeSvg from '../../static/icons/close2.svg'
import './alert.scss'

export const Alert = ({ status = null, text, heading, onClick }) => {
  const alert = useContext(ContextAlert)

  return (
    <CSSTransition
      in={alert.isOpen}
      timeout={2000}
      classNames={'animationAlert'}
      mountOnEnter
      unmountOnExit
    >
      <div className={classnames('alert', [`alert-${status}`])}>
        <div className='main-content-alert'>
          <ReactSVG
            src={
              status === 'danger'
                ? error
                : status === 'warning'
                ? error
                : status === 'info'
                ? info
                : status === 'primary'
                ? info
                : status === 'success'
                ? success
                : error
            }
            className='icon-themes'
          />
          <p>
            <strong>{heading}</strong>
            {text}
          </p>
          <ReactSVG onClick={onClick} src={closeSvg} />
        </div>
      </div>
    </CSSTransition>
  )
}
