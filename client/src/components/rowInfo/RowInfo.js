import React from 'react'
import { Button } from '../button/Button'

export const RowInfo = ({label, value, isChange = true, onClick}) => {
    return (
        <div className='row'>
            <div className='ceil'>{label}</div>
            <div className='ceil'>{value}</div>
            {
                isChange ? (
                    <div className='ceil'>
                        <Button text='Изменить' onClick={onClick} classNames='btn primary transparently-btn'/>
                    </div>
                ) : null
            }
        </div>
    )
}