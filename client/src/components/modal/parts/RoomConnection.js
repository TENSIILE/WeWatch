import React from 'react'
import { Input } from '../../input/Input'


export const RoomConnection = () => {
    return (
        <>
            <Input 
                style={{width:'100%'}} 
                placeholder='Введите ID комнаты'
            />
            <div style={{width:'100%', background:'red', transition:'.4s', height: 200, marginTop:'1em'}}></div>
        </>  
    ) 
}