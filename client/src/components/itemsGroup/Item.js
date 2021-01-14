import React, { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import classnames from 'classnames'

import { Button } from '../../components/button/Button' 
import { ButtonMini } from '../../components/buttonMini/ButtonMini'
import { IndicatorOnline } from '../../components/indicatorOnline/IndicatorOnline'
import { Contextmenu } from '../../components/contextmenu/Contextmenu'
import { ContextConMenu } from '../../contexts/contextmenu/contextConMenu'

import close from '../../static/icons/close2.svg'
import dots_icon from '../../static/icons/three-dots-horizontal.svg'
import entrance from '../../static/icons/entrance.svg'

import './item.scss'

export const Item = ({ 
    src,
    text,
    dotsActive = false,
    isOnButton,
    isButtonAccept = true, 
    isButtonDelete,  
    textButton,
    newClass = '',
    onClick,
    onClickWrapper,
    onClickDelete,
    disabledButton = false,
    isItemRoom = false,
    isPasswordSetup,
    onClickConnectToRoom,
    isListFriend,
    index,
    fullData, 
    statusOnline
}) => {
    
    const contextmenu = useContext(ContextConMenu)
    
    return (
        <div className={classnames('item', [newClass], {'item-room': isItemRoom})}>
            {
                isItemRoom ? (
                    <>
                        <img src={src} alt=''/>
                        <div className='text-area'>
                            <p>{text}</p>
                            {isPasswordSetup && <span>Необходим пароль</span>}
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
                    <div 
                        className='wrapper-item' 
                        onClick={onClickWrapper}
                    >
                        <div className='avatar'>
                            <img src={src} alt=''/>
                            {
                                isListFriend && <IndicatorOnline status={statusOnline}/>
                            }
                        </div>
                        
                        <p>{text}</p>
                        {
                            dotsActive && (
                                <div className='container-dots'>
                                    <ReactSVG 
                                        src={dots_icon}
                                        className='dots'
                                        onClick={() => contextmenu.openEachCMInFor(index)}
                                    />

                                    <Contextmenu 
                                        view='action-list-my-friends'
                                        open={contextmenu.eachContextmenu.myFriends[index]}
                                        fullData={fullData}
                                     />
                                </div>
                            )
                        }
                        {
                            isOnButton && 
                                <>
                                    {
                                        isButtonAccept && (
                                            <Button
                                                text={textButton}
                                                classNames='btn primary transparently-btn'
                                                onClick={onClick}
                                                disabled={disabledButton} 
                                            /> 
                                        )
                                    }  
                                    {
                                        isButtonDelete && (
                                            <Button
                                                text={<ReactSVG src={close}/>}
                                                classNames='btn danger transparently-btn'
                                                onClick={onClickDelete}
                                            /> 
                                        )
                                    }
                                </> 
                        }
                    </div>
                )
            }
        </div>
    )
}