import React from 'react'
import { ReactSVG } from 'react-svg'
import { IndicatorOnline } from '../indicatorOnline/IndicatorOnline'

import icoSearch from '../../static/icons/Search.svg'
import dots from '../../static/icons/three-dots-horizontal.svg'

import './chatHeader.scss'


export const ChatHeader = ({ logo, title, status }) => {
    return (
        <div className="chat-header">
            <div className="logo-dialog">
                <img src={logo} alt=""/>
                <IndicatorOnline status={status}/>
            </div>
            <div className="title-dialog">
                <h3>{title}</h3>
            </div>
            <div className="action-dialog">
                <ReactSVG src={icoSearch} className='search-message'/>
                <ReactSVG src={dots} className='settings-dialog'/>
            </div>
        </div>
    ) 
}