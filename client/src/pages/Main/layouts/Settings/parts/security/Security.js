import React, { useContext } from 'react'
import classnames from 'classnames'
import { SwitchBtn } from '../../../../../../components/switch/Switch'
import { BadgeMini } from '../../../../../../components/badge/Badge'
import { Table } from '../../../../../../components/table/Table'
import { ContextSettings } from '../../../../../../contexts/settingsPage/contextSettings'
import { ContextMain } from '../../../../../../contexts/mainPage/contextMain'

import { DUAL_AUTHENTICATION } from '../../../../../../types/settingsSwitchBtn'

export const Security = () => {
    const settings         = useContext(ContextSettings)
    const { inputDevices } = useContext(ContextMain)

    return (
        <div className="security">
            <ul className="clauses-tining">

                <li className='clause'>
                    <div className="tuning-control">
                        <div className="text-info-detail">
                            <p className='title'>Двойная аутентификация</p>
                            <span className='description'>При двойной аутентификации Вы будете получать код подтверждения на почту</span>
                        </div>
                        <SwitchBtn 
                            size='mini'
                            id='dual-authentication' 
                            value={settings.switchBtn[DUAL_AUTHENTICATION]} 
                            onChange={() => settings.changeSwitchBtn(DUAL_AUTHENTICATION)}
                        />
                    </div>
                </li>

                <li className='clause'>
                    <div className="tuning-control direction-column">
                        <div className="text-info-detail">
                            <p className='title'>Просмотр входимых устройств</p>
                            <span className='description'>Здесь отображается список последних входимых устроств через Ваш аккаунт</span>
                        </div>

                        <Table newClass={classnames("table-information backlight", {'hidden': !inputDevices.length})}>
                            {
                                inputDevices && inputDevices.map((data, i) => (
                                    <Table.Row 
                                        key={i}
                                        gridTemplateColumns={'0.2fr 1fr 0.51fr 1fr 1fr'} 
                                    >
                                        <Table.Ceil>{i + 1}</Table.Ceil>
                                        <Table.Ceil>
                                            {data.ip}
                                            {data.ip === localStorage.getItem('ip') && <BadgeMini text='Ваш IP' newClass='primary'/>}
                                        </Table.Ceil>
                                        <Table.Ceil>{data.country}</Table.Ceil>
                                        <Table.Ceil>{data.org}</Table.Ceil>
                                        <Table.Ceil>{data.date}</Table.Ceil>
                                    </Table.Row>
                                ))
                            }
                        </Table>
                    </div>
                </li>

                <li className='clause'>
                    <div className="tuning-control">
                    <div className="text-info-detail">
                            <p className='title'>Подробная информация</p>
                            <span className='description'>Вы перейдете на сторонний сайт, и сможете узнать более подробную информацию о данных IP-адресах</span>
                        </div>
                        <a href='https://2ip.ru/whois/' rel="noopener noreferrer" target='_blank'>Узнать</a>
                    </div>
                </li>

            </ul>
        </div>
    )
}