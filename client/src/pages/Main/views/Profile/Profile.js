import React, { useContext, useState, useEffect } from 'react'
import { ReactSVG } from 'react-svg'
import { useHttp } from '../../../../hooks/http.hook'
import { RowInfo } from '../../../../components/rowInfo/RowInfo'
import { ButtonMini } from '../../../../components/buttonMini/ButtonMini'
import { Sidebar } from '../../layouts/Sidebar/Sidebar'
import { Button } from '../../../../components/button/Button'
import { Loader } from '../../../../components/loader/Loader'
import { Modal } from '../../../../components/modal/Modal'
import { ContextAuth } from '../../../../contexts/contextAuth'
import { ContextGetInfo } from '../../../../contexts/contextGetInfo'
import { ContextAlert } from '../../../../contexts/alert/contextAlert'
import { MyRooms } from '../../layouts/Sidebar/parts/myRooms/MyRooms'

import user from '../../../../static/img/user.jpg'
import header from '../../../../static/img/header.png'

import pictures from '../../../../static/icons/pictures.svg'
import photoSvg from '../../../../static/icons/photoscamera.svg'
import pen from '../../../../static/icons/pen.svg'

import config from '../../../../config.json'
import './profile.scss'



export const Profile = () => {
    const { infoUser, rerender,
         setRerender } = useContext(ContextGetInfo)

    const auth         = useContext(ContextAuth)
    const alert        = useContext(ContextAlert)
    const { request }  = useHttp()

    const [openModal, setOpenModal]         = useState(false)
    const [srcUrlImage, setSrcUrlImage]     = useState(false)
    const [idBtnSetImage, setIdBtnSetImage] = useState('')
    const [languages, setLanguages]         = useState([])
    
    useEffect(() => {
        if (!!infoUser && infoUser.userAdditional.languages.toString() !== 'Не указано') {
            setLanguages(infoUser.userAdditional.languages)
        }
    }, [infoUser])
    

    const [changeProfile, setChangeProfile]         = useState(false)
    const [changeDataProfile, setChangeDataProfile] = useState({
        'Имя:':"", 'Фамилия:':"", 'Статус:':"", 'Ник:':"",
        'Языки:':"", 'Страна:':"", 'Город:':""
    })

    const maxLengthСhangeDataProfile = {
        'Имя:':20, 'Фамилия:':25, 'Статус:':250, 'Ник:':20,
        'Языки:':20, 'Страна:':25, 'Город:':25
    }


    const saveDataProfile = async () => {
        try {
            
            trimDataProfile()

            const readyData = { ...changeDataProfile, 'languages': [...languages] } 
            await request(`${config.hostServer}/api/getInfo/user/savedata`, 'POST', { userId:auth.userId, userInfo:readyData })

            cancelDataProfile()
            
        } catch (e) {
            alert.show('danger', e.message, 'Ошибка!') 
        }
    }

    const cancelDataProfile = () => {
        setChangeProfile(false)
        clearDataProfile()
        setRerender(!rerender)
    }

    const clearDataProfile = () => {
        let clearingDataInputs
        for(const data in changeDataProfile)
            clearingDataInputs = { ...clearingDataInputs, [data]:changeDataProfile[data] = "" }     

        setChangeDataProfile(clearingDataInputs)
    }

    const trimDataProfile = () => {
        for(const data in changeDataProfile)
            changeDataProfile[data] = changeDataProfile[data].trim()
    }

    const controlInputsProfile = e => {
       return setChangeDataProfile({ ...changeDataProfile, [e.target.name]: e.target.value })
    }     

    const onClickBtnSetImage = ( nameInput, e ) => {
        try {
            const file = e.target.files[0]
            const url  = URL.createObjectURL(file)
            
            setSrcUrlImage(url)
            setOpenModal(true)

            if (nameInput === 'avatar') {
                setIdBtnSetImage('submit-save-avatar')

            } else if (nameInput === 'header') {
                setIdBtnSetImage('submit-save-header')
            }  

        } catch (e) {}
    }

    return (
        <>
            <Modal 
                size='large' 
                title='Установить изображение' 
                eventOpen={{openModal, setOpenModal}} 
                idMainBtn={idBtnSetImage}
            >
                <img src={!!srcUrlImage ? srcUrlImage : header} alt=''/>
            </Modal>

            <Sidebar>
                <MyRooms isEmpty={false}/>
            </Sidebar>
            <div className='user-account'>
                <div className='user-header'>
                    <img src={!!infoUser ? infoUser.userAdditional.header : header} alt=''/>
                    
                    <form action={`${config.hostServer}/upload/header?userId=${auth.userId}`} method='POST' encType='multipart/form-data'>

                        <ButtonMini 
                            icon={pictures}
                            newClass='fly'
                            style={{top:15, width:40, height:40, right:15}}
                            emitLabel={true}
                            htmlFor='file-header'
                        >
                            <input type='file' id='file-header' name='header-input' onChange={e => onClickBtnSetImage('header', e)} accept="image/jpeg,image/png"/>
                        </ButtonMini>
                        
                        <input type='submit' id='submit-save-header' className='input-hidden' value='Save'/>
                    </form>

                </div>
                <div className='wrapper-user-info'>
                    <div className='user-photo-and-data'>
                        <div className='avatar'>
                            <img src={!!infoUser ? infoUser.userAdditional.avatar : user} alt=''/>

                            <form action={`${config.hostServer}/upload/avatar?userId=${auth.userId}`} method='POST' encType='multipart/form-data' className='input-hidden'>

                                <ButtonMini
                                    icon={photoSvg}
                                    newClass='fly circle'
                                    emitLabel={true}
                                    htmlFor='file'
                                    style={{width:40, height:40, margin:0}}
                                >
                                    <input type='file' id='file' name='avatar-input' onChange={e => onClickBtnSetImage('avatar', e)} accept="image/jpeg,image/png"/>
                                </ButtonMini>
                                
                                <input type='submit' id='submit-save-avatar' className='input-hidden' value='Сохранить' />
                            </form>
                            
                        </div>
                        <div className='user-fullname'>
                            <div className='username'>
                                {
                                    !! infoUser ? (
                                        <>
                                        {
                                            !changeProfile ? 
                                                <ReactSVG
                                                    src={pen}
                                                    className='penEdit'
                                                    onClick={() => setChangeProfile(true)}
                                                /> : null
                                        }
                                            <p>{infoUser.userAdditional.name + ' ' + infoUser.userAdditional.lastname}</p>
                                        </>
                                    ) : null
                                }
                            </div>
                            <p 
                                id='status-text' 
                                className={changeDataProfile['Статус:'] && changeProfile ? 'edit-status' : null}
                            >   
                                {
                                    changeDataProfile['Статус:'] ?
                                    changeDataProfile['Статус:'] : !!infoUser ? infoUser.userAdditional.status : null
                                }
                            </p>
                        </div>
                    </div>
                    <div className='table-information'>
                        {
                            !!infoUser ? 
                            changeProfile ? (
                                <>
                                    {
                                        infoUser.tableInformationEdit.map((row, index) => {
                                            return (
                                                <RowInfo
                                                    key={index}
                                                    label={row[0]}
                                                    value={row[1]}
                                                    isChange={true}
                                                    onChange={controlInputsProfile}
                                                    text={changeDataProfile[row[0]]}
                                                    setText={{changeDataProfile, setChangeDataProfile}}
                                                    options={{languages, setLanguages, maxLengthСhangeDataProfile}}
                                                />
                                            )
                                        })
                                    }
                                </>
                            ) : (
                                <>
                                    {
                                        infoUser.tableInformation.map((row, index) => {
                                            return (
                                                <RowInfo
                                                    key={index}
                                                    label={row[0]}
                                                    value={row[1]}
                                                />
                                            )
                                        })
                                    }
                                </>
                            ) : <Loader/>
                        }
                    </div>
                    <div className='user-control'>
                        {
                            changeProfile ?
                                <div style={{display:'flex'}}>
                                    <Button
                                        text='Сохранить данные'
                                        classNames='btn primary half-opacity'
                                        id='btn-save-data'
                                        onClick={saveDataProfile}
                                    /> 
                                    <Button
                                        text='Отмениить'
                                        classNames='btn half-opacity simple'
                                        id='btn-cancel-data'
                                        onClick={cancelDataProfile}
                                    /> 
                                </div>
                            : null
                        }
                        <Button
                            text='Выйти'
                            classNames='btn danger half-opacity'
                            id='btn-exit'
                            onClick={auth.logout}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}