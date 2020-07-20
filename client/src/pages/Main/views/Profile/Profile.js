import React, { useContext } from 'react'
import {useHistory} from 'react-router-dom'
import { RowInfo } from '../../../../components/rowInfo/RowInfo'
import { ButtonMini } from '../../../../components/buttonMini/ButtonMini'
import { Sidebar } from '../../blocks/Sidebar/Sidebar'
import { Button } from '../../../../components/button/Button'
import { Loader } from '../../../../components/loader/Loader'
import { ContextAuth } from '../../../../contexts/contextAuth'
import { ContextGetInfo } from '../../../../contexts/contextGetInfo'

import user from '../../../../static/img/user.jpg'
import header from '../../../../static/img/header.png'
import pictures from '../../../../static/icons/pictures.svg' 
import photoSvg from '../../../../static/icons/photoscamera.svg'


import config from '../../../../config.json'
import './profile.scss'

export const Profile = () => {
    const auth = useContext(ContextAuth)
    const { infoUser } = useContext(ContextGetInfo)

    const history = useHistory()
    
    const logoutAccount = () => {
        auth.logout()
        history.push('/login')
    }      

    

    return (
        <>
           <Sidebar/>
            <div className='user-account'>
                <div className='user-header'>
                    <img src={header} alt=''/>
                    <ButtonMini icon={pictures} newClass='fly' style={{top:15, width:40, height:40, right:15}} emitLabel={true} htmlFor='file-header'>
                        <input type='file' id='file-header' accept="image/jpeg,image/png"/>
                    </ButtonMini>
                </div>
                <div className='wrapper-user-info'>
                    <div className='user-photo-and-data'>
                        <div className='avatar'>
                            <img src={user} alt=''/>
                            <form action={`${config.hostServer}/upload`} method='POST' encType='multipart/form-data'>
                                <ButtonMini icon={photoSvg} newClass='fly circle' emitLabel={true} htmlFor='file' style={{width:30, height:30}}>
                                    <input type='file' id='file' name='avatar-input' accept="image/jpeg,image/png"/>
                                </ButtonMini>
                                <input type='submit' value='Сохранить'/>
                            </form>
                            
                        </div>
                        <p>{!!infoUser ? infoUser.userAdditional.name : null}</p>
                    </div>
                    <div className='table-information'>
                        {
                            !!infoUser ? (
                                <>
                                    {
                                        infoUser.tableInformation.map((row,index) => {
                                            return (
                                                <RowInfo key={index} label={row[0]} value={row[1]} isChange={row[0] !== 'Создание аккаунта:'}/>
                                            )
                                        })
                                    }
                                </>
                            ) : <Loader/>
                        }
                        
                    </div>
                    <div className='user-control'>
                        <Button text='Выйти' classNames='btn danger half-opacity' id='btn-exit' onClick={logoutAccount}/>
                    </div>
                </div>
            </div>
        </>
    )
}