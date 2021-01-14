import React, { useContext, useState, useEffect, useRef } from 'react'
import { ReactSVG } from 'react-svg'
import classnames from 'classnames'
import { useHttp } from '../../../../hooks/http.hook'
import { RowInfo } from '../../../../components/rowInfo/RowInfo'
import { ButtonMini } from '../../../../components/buttonMini/ButtonMini'
import { Sidebar } from '../../layouts/Sidebar/Sidebar'
import { Button } from '../../../../components/button/Button'
import { Loader } from '../../../../components/loader/Loader'
import { Table } from '../../../../components/table/Table'
import { Image } from '../../../../components/image/Image'
import { ContextAuth } from '../../../../contexts/contextAuth'
import { ContextGetInfo } from '../../../../contexts/contextGetInfo'
import { ContextAlert } from '../../../../contexts/alert/contextAlert'
import { ContextMain } from '../../../../contexts/mainPage/contextMain'
import { MyRooms } from '../../layouts/Sidebar/parts/myRooms/MyRooms'

import user from '../../../../static/img/user.jpg'
import header from '../../../../static/img/header.png'

import pictures from '../../../../static/icons/pictures.svg'
import photoSvg from '../../../../static/icons/photoscamera.svg'
import pen from '../../../../static/icons/pen.svg'

import config from '../../../../config.json'
import './profile.scss'

export const Profile = () => {
    const { infoUser } = useContext(ContextGetInfo)

    const auth         = useContext(ContextAuth)
    const alert        = useContext(ContextAlert)
    const main         = useContext(ContextMain)
    const { request }  = useHttp()

    const [languages, setLanguages] = useState([])

    const [changeProfile, setChangeProfile]         = useState(false)
    const [changeDataProfile, setChangeDataProfile] = useState({
        'Имя:':"", 'Фамилия:':"", 'Статус:':"", 'Ник:':"",
        'Языки:':"", 'Страна:':"", 'Город:':""
    })

    const refAvatar = useRef(null)
    const refHeader = useRef(null)

    const maxLengthСhangeDataProfile = {
        'Имя:':20, 'Фамилия:':25, 'Статус:':250, 'Ник:':20,
        'Языки:':20, 'Страна:':25, 'Город:':25
    }

    const saveDataProfile = async () => {
        try {
            trimDataProfile()

            const readyData = { ...changeDataProfile, 'languages': [...languages] } 
            await request(`${config.hostServer}/api/getInfo/user/savedata`, 'POST', { userId:auth.userId, userInfo:readyData }, {Authorization: `Bearer ${auth.token}`})

            cancelDataProfile()
            
        } catch (e) {
            alert.show('danger', e.message, 'Ошибка!') 
        }
    }

    const cancelDataProfile = () => {
        setChangeProfile(false)
        clearDataProfile()
    }

    const clearDataProfile = () => {
        let clearingDataInputs
        for(const data in changeDataProfile)
            clearingDataInputs = { ...clearingDataInputs, [data]:  changeDataProfile[data] = "" }     

        setChangeDataProfile(clearingDataInputs)
    }

    const trimDataProfile = () => {
        for(const data in changeDataProfile)
            changeDataProfile[data] = changeDataProfile[data].trim()
    }

    const controlInputsProfile = e => {
       return setChangeDataProfile({ ...changeDataProfile, [e.target.name]: e.target.value })
    }     

    useEffect(() => {
        if (!!infoUser && infoUser.userAdditional.languages.toString() !== 'Не указано') {
            setLanguages(infoUser.userAdditional.languages)
        }
    }, [infoUser])

    return (
        <>
            <Sidebar>
                <MyRooms/>
            </Sidebar>
            
            <div className='user-account beautiful-scrollbar mini'>
                <div className='user-header'>
                    <Image src={!!infoUser ? infoUser.userAdditional.header : header} id='header'/>
                        <ButtonMini 
                            icon={pictures}
                            newClass='fly'
                            style={{top:15, width:40, height:40, right:15}}
                            emitLabel={true}
                            htmlFor='file-header'
                        >   
                            <input 
                                type='file'
                                id='file-header' 
                                onChange={() => main.onSendImageProfileAsync('header', refHeader)} 
                                accept="image/jpeg,image/png,image/gif"
                                ref={refHeader}
                            />
                        </ButtonMini>
                </div>
                <div className='wrapper-user-info'>
                    <div className='user-photo-and-data'>
                        <div className='avatar'>
                            <Image src={!!infoUser ? infoUser.userAdditional.avatar : user} id='avatar'/>
                                <ButtonMini
                                    icon={photoSvg}
                                    newClass='fly circle'
                                    emitLabel={true}
                                    htmlFor='file'
                                    style={{width:40, height:40, margin:0}}
                                >
                                    <input 
                                        type='file' 
                                        id='file' 
                                        onChange={() => main.onSendImageProfileAsync('avatar', refAvatar)} 
                                        accept="image/jpeg,image/png,image/gif"
                                        ref={refAvatar}
                                    />
                                </ButtonMini>
                        </div>
                        <div className='user-fullname'>
                            <div className='username'>
                                {
                                    !!infoUser && (
                                        <>
                                            {
                                                !changeProfile && (
                                                    <ReactSVG
                                                        src={pen}
                                                        className='penEdit'
                                                        onClick={() => setChangeProfile(true)}
                                                    />
                                                )
                                            }
                                            <p>{infoUser.userAdditional.name + ' ' + infoUser.userAdditional.lastname}</p>
                                        </>
                                    )
                                }
                            </div>
                            <p 
                                id='status-text' 
                                className={classnames({'edit-status': changeDataProfile['Статус:'] && changeProfile})}
                            >   
                                {
                                    changeDataProfile['Статус:'] ?
                                    changeDataProfile['Статус:'] : !!infoUser && infoUser.userAdditional.status
                                }
                            </p>
                        </div>
                    </div>

                    <Table>
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
                    </Table>

                    <div className='user-control'>
                        {
                            changeProfile && (
                                <div className='d-flex'>
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
                            )
                        }
                        {
                            !changeProfile && (
                                <Button
                                    text='Выйти'
                                    classNames='btn danger half-opacity'
                                    id='btn-exit'
                                    onClick={main.logout}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}