import React, { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { ButtonMini } from '../../../../components/buttonMini/ButtonMini'
import { Input } from '../../../../components/input/Input'
import { Button } from '../../../../components/button/Button'
import { Checkbox } from '../../../../components/checkbox/Checkbox'
import { SetupPassword } from '../../../../components/setupPassword/setupPassword'
import { InviteFriend } from '../../../../components/inviteFriendRoom/InviteFriendRoom'
import { ListLinksVideos } from '../../../../components/listLinksVideos/ListLinksVideos'

import { ContextCreatingRoom } from '../../../../contexts/contextCreatingRoom'

import comeback from '../../../../static/icons/comeback.svg'
import photo from '../../../../static/icons/photocamera-line.svg'

import './creatingRoom.scss'

export const CreatingRoom = () => {
    const logic = useContext(ContextCreatingRoom)

    return (
        <div className='creating-room region'>

            <div className='heading'>
                <h2>Создание комнаты</h2>
                <ButtonMini 
                    icon={comeback} 
                    linkObj={{ isLink:true, path:'/home' }}
                    newClass='fly'
                    style={{right:20}}
                />
            </div>

            <hr id='title-border-bottom' className='home-sep'/>

            <div className='body-room-customization beautiful-scrollbar'>
                <Input 
                    placeholder='Введите название вашей будущей комнаты...'
                    newClass={'grey-background'}
                    style={{width:'100%', marginTop:'1em'}}
                    name='nameRoom'
                    value={logic.valuesInputs.nameRoom}
                    onChange={logic.setInputsForm}
                />

                <Checkbox 
                    text='Создать защитный ключ для комнаты' 
                    newClass={'darken-text'} style={{marginTop:'2em'}}
                    state={logic.checkboxSecurityKey}
                    setState={logic.changeCheckboxSecurityKey}
                />

                <SetupPassword 
                    style={{height: logic.checkboxSecurityKey ? 160 : 0}}
                    nameInput='textSecurityKey'
                    valueInput={logic.valuesInputs.textSecurityKey}
                    onChangeInput={logic.setInputsForm}
                    onClickAccept={logic.acceptSecurityKey}
                    disabled={logic.successEdit}
                    successEdit={logic.successEdit}
                    onClickGenerateKey={logic.pasteToTextSecurityKey}
                />

                <div className='setup-logo-room'>
                    <h3>Установка фотографии комнаты</h3>
                    <Button 
                        text='Загрузить...' 
                        classNames='btn simple' 
                        emitLabel={true} 
                        htmlFor='logo-room'
                    />
                    <input type='file' id='logo-room' ref={logic.refUploadLogo} name='logo-room' onChange={logic.uploadLogoRoomLocal} accept="image/jpeg,image/png"/>

                    <label className='image-uploading' style={{height: logic.urlLogoRoom ? '500px' : 0, marginBottom: logic.urlLogoRoom ? '2em': 0}} htmlFor='logo-room'>
                        <ReactSVG src={photo}/>
                        <img src={logic.urlLogoRoom} alt=''/>
                    </label>
                </div>
                
                <InviteFriend 
                    listFriend={logic.listAddedFriends}
                />

                <div className='link-to-video'>
                    <h3>Ссылка на видео</h3>
                    <Input 
                        placeholder='Введите ссылку на видео...'
                        newClass={'grey-background'}
                        style={{width:'100%', marginTop:'1em'}}
                        name='linkToVideo'
                        value={logic.valuesInputs.linkToVideo}
                        onChange={logic.setInputsForm}
                    />
                    <h3>Превью</h3>
                    <div className='preview'>
                        <img src={`//img.youtube.com/vi/${logic.getPreviewFromLink()}/maxresdefault.jpg`} alt=''/>
                    </div>
                </div>

                <div className='container-list-ready-links-to-video'>
                    <h3>Список ссылок</h3>
                    <Checkbox 
                        text='Включить дополнительный список видео для просмотра' 
                        newClass={'darken-text'} style={{marginTop:'.5em', marginBottom:'1em'}}
                        state={logic.checkboxReadyLinks}
                        setState={logic.changeCheckboxReadyLinks}
                        id='checkboxReadyLinks'
                    />
                    <ListLinksVideos 
                        style={{height: logic.checkboxReadyLinks ? 500 : 0}}
                        valueInput={logic.valuesInputs.linksToAllVideo}
                        nameInput='linksToAllVideo'
                        setValueInput={logic.setInputsForm}
                        listLinksVideos={logic.listAllLinksToVideos}
                        onKeyDown={logic.appendToListAllLinksToVideos}
                        onClickDelete={logic.deleteFromListAllLinksToVideos}
                    />
                </div>

                <Button
                    text='Создать комнату'
                    classNames='btn primary half-opacity'
                    style={{width:'100%'}}
                    onClick={logic.createRoomHandler}
                />
            </div>
        </div>
    )
}