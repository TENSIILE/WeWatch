import React, { useEffect, useContext } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { ContextSettings } from '../../../../contexts/settingsPage/contextSettings'

import { 
    Account,
    Confidentiality,
    Themes, 
    Security,
    Display,
    Webcam,
    Overlay,
    Hotkey,
    Develops,
    Api,
    Updates,
    Other
} from './parts'

import { 
    ACCOUNT,
    CONFIDENTIALITY,
    THEMES,
    SECURITY,
    DISPLAY,
    WEBCAM,
    OVERLAY,
    KEYBOARD,
    DEVELOPS,
    DEVELOPS_API,
    UPDATES,
    OTHER
} from '../../../../types/settingsItems'

import './settings.scss'

export const RootSettingsChildren = () => {
    const params   = useParams()
    const settings = useContext(ContextSettings)

    useEffect(() => {
        return async () => await settings.onSaveSettings()
    }, [])
   
    return (
        <>
            {
                params.customization === ACCOUNT ? <Account/> :
                params.customization === CONFIDENTIALITY ? <Confidentiality/> :
                params.customization === THEMES ? <Themes/> :
                params.customization === SECURITY ? <Security/> :
                params.customization === DISPLAY ? <Display/> :
                params.customization === WEBCAM ? <Webcam/> :
                params.customization === OVERLAY ? <Overlay/> :
                params.customization === KEYBOARD ? <Hotkey/> :
                params.customization === DEVELOPS ? <Develops/> :
                params.customization === DEVELOPS_API ? <Api/> :
                params.customization === UPDATES ? <Updates/> :
                params.customization === OTHER ? <Other/> :
                <Redirect to={ACCOUNT}/>
            }
        </>
    )
}