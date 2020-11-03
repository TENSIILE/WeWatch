import React, { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { SwitchBtn } from '../../../../../../components/switch/Switch'
import { Item } from '../../../../../../components/itemsGroup/Item'
import { ContextChat } from '../../../../../../contexts/contextChat'

import plus from '../../../../../../static/icons/plus.svg'
import dots from '../../../../../../static/icons/three-dots-horizontal.svg'
import arrow from '../../../../../../static/icons/arrow-left.svg'

import slider from '../../../../../../static/img/img_slider.png'
import user from '../../../../../../static/img/user.jpg'

import './controllingRoom.scss'

export const ControllingRoom = () => {
    const { visibleSidebar, setVisibleSidebar } = useContext(ContextChat)

    return (
        <div className={`container-controling`}>
            <div className="wrapper-controlling">
                <div className="minimize-window" onClick={() => setVisibleSidebar(!visibleSidebar)}>
                    <ReactSVG src={arrow} className={`arrow ${visibleSidebar ? 'rotated' : ''}`}/>
                </div>
                <header>
                    <div className="title">
                        <h2>Видео просмотр комнаты</h2>
                        <span id='indicator-work-room'></span>
                    </div>
                    <ReactSVG src={dots} className='icon-settings-room'/>
                </header>
                <div className="preview-video-room">
                    <img src={slider} alt=""/>
                </div>
                <div className="change-of-status-in-room">
                    <div className="text">
                        <h3 id='personal-status-in-room'>Онлайн</h3>
                        <span>Ваш статус в комнате</span>
                    </div>
                    <div className="switch-btn">
                        <SwitchBtn size='small'/>
                    </div>
                </div>

                <div className="participants">
                    <header>
                        <h3>Участники(8)</h3>
                        <ReactSVG src={plus} className='add-new-participant'/>
                    </header>
                </div>
            </div>
            <div className="list-participants beautiful-scrollbar mini">
                <div className="wrapper-list-patricipant">
                {
                        [1,2,3,4,5,6,7].map(i => {
                            return <Item 
                                key={i}
                                src={user} 
                                text={'Имя фамилия'} 
                                dotsActive={true}
                                statusOnline={'offline'}
                                isListFriend={true}
                            />
                        })
                    }
                </div>
                    
            </div>
        </div>
    ) 
}