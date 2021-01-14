import React, { useState, useContext, useEffect } from 'react'
import { ReactSVG } from 'react-svg'
import { Table } from '../../../components/table/Table'
import { ContextModal } from '../../../contexts/modal/contextModal'
import { SWITCH_BTN } from '../../../types/settingsNames'

import lock from '../../../static/icons/padlock.svg'

import './parts.scss'

export const ViewProfile = () => {
    const { data }          = useContext(ContextModal)
    const [info, setInfo]   = useState([])
    const [settingsProfile, 
        setSettingsPrifile] = useState({})

    const whiteList = ['name','lastname', 'created', 'status', 'languages', 'country', 'city']

    const filterBySubField = obj => {
        let result = {}

        for (let k of Object.keys(obj)) {
            for (let el of whiteList) {
                if (k.toString() === el.toString()) {
                    switch (k) {
                        case 'name':
                            result['Имя'] = obj[k]
                            break
                        case 'lastname':
                            result['Фамилия'] = obj[k]
                            break
                        case 'status':
                            result['Статус'] = obj[k]
                            break
                        case 'languages':
                            result['Языки'] = obj[k].join(', ')
                            break
                        case 'country':
                            result['Страна'] = obj[k]
                            break
                        case 'city':
                            result['Город'] = obj[k]
                            break
                        case 'created':
                            result['Дата регистрации'] = obj[k]
                            break
                        default: break
                    }
                }
            }
        }
        
        return Object.entries(result)
    }

    useEffect(() => {
        !!data.settings && setSettingsPrifile(JSON.parse(data.settings))
        setInfo(filterBySubField(data))
    }, [])
    
    return (
        <>
            {
                !Object.keys(settingsProfile).length || (Object.keys(settingsProfile).length && !settingsProfile[SWITCH_BTN].closeProfile) ? (
                    <div className='profile-user'>
                        <div className="user-header">
                            <img src={data.header} alt=""/>
                        </div>
                        <div className="detailed-info">
                            <div className="user-avatar">
                                <img src={data.avatar} alt=""/>
                            </div>
                            <Table newClass='beautiful-scrollbar'>
                                {
                                    info.map((row, i) => (
                                        <Table.Row key={i} gridTemplateColumns='1fr 1fr'>
                                            <Table.Ceil>{row[0]}:</Table.Ceil>
                                            <Table.Ceil>{row[1]}</Table.Ceil>
                                        </Table.Row>
                                    ))
                                }
                            </Table>
                        </div>
                    </div>
                ) : (
                    <div className='profile-lock'>
                        <ReactSVG src={lock} className='profile-lock-icon'/>
                        <span id='text-empty'>Данный профиль закрыт!</span>
                    </div>
                )
            }
        </>
    )
}