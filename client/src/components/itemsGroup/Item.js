import React, { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { Button } from '../../components/button/Button' 
import { ButtonMini } from '../../components/buttonMini/ButtonMini'
import { IndicatorOnline } from '../../components/indicatorOnline/IndicatorOnline'
import { Contextmenu } from '../../components/contextmenu/Contextmenu'
import { ContextConMenu } from '../../contexts/contextmenu/contextConMenu'

import close from '../../static/icons/close2.svg'
import dots_icon from '../../static/icons/three-dots-horizontal.svg'
import entrance from '../../static/icons/entrance.svg'

import './item.scss'

export const Item = ({ src, text, dotsActive = false, isOnButton, isButtonAccept = true, isButtonDelete, textButton, newClass = '',
        onClick, onClickWrapper, onClickDelete, disabledButton = false, isItemRoom = false, isPasswordSetup,
        onClickConnectToRoom, isListFriend, index, data, statusOnline }) => {
    
    const contextmenu = useContext(ContextConMenu)
    
    return (
        <div className={`item ${newClass} ${isItemRoom ? 'item-room' : ''}`}>
            {
                isItemRoom ? (
                    <>
                        <img src={src} alt=''/>
                        <div className='text-area'>
                            <p>{text}</p>
                            { isPasswordSetup ? <span>Необходим пароль</span> : null }
                        </div>
                        <ButtonMini 
                            icon={entrance} 
                            newClass='fly enlarge-size'
                            successEdit={false}
                            onClick={onClickConnectToRoom}
                            style={{position:'relative', border:'none', top:0, left: 0, width:50, height:50, marginLeft:'auto'}}
                        />
                        
                    </>
                ) : (
                    <div className='wrapper-item' onClick={onClickWrapper}>
                        <div className='avatar'>
                            <img src={src} alt=''/>
                            {
                                 isListFriend ? <IndicatorOnline status={statusOnline}/> : null
                            }
                        </div>
                        
                        <p>{text}</p>
                        {
                            dotsActive ? (
                                <div className='container-dots'>
                                    <ReactSVG 
                                        src={dots_icon}
                                        className='dots'
                                        // onClick={() =>contextmenu.show('actionOverMyFriends')}
                                        onClick={() => contextmenu.openEachCMInFor(index)}
                                    />

                                    <Contextmenu 
                                        view='action-list-my-friends'
                                        // open={contextmenu.visible.actionOverMyFriends}
                                        open={contextmenu.eachContextmenu.myFriends[index]}
                                        data={data}
                                     />
                                </div>
                            ) : null
                        }
                        {
                            isOnButton ? 
                                <>
                                    {
                                        isButtonAccept ? (
                                            <Button
                                                text={textButton}
                                                classNames='btn primary transparently-btn'
                                                onClick={onClick}
                                                disabled={disabledButton} 
                                            /> 
                                        ) : null  
                                    }  
                                    {
                                        isButtonDelete ? (
                                            <Button
                                                text={<ReactSVG src={close}/>}
                                                classNames='btn danger transparently-btn'
                                                onClick={onClickDelete}
                                            /> 
                                        ) : null
                                    }
                                </> 
                                : null
                        }
                    </div>
                )
            }
        </div>
    )
}