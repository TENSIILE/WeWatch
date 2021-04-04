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
  Other,
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
  OTHER,
} from '../../../../types/settingsItems'

import './settings.scss'

export const RootSettingsChildren = () => {
  const params = useParams()
  const settings = useContext(ContextSettings)

  useEffect(() => {
    return async () => await settings.onSaveSettings()
  }, [])

  switch (params.customization) {
    case ACCOUNT:
      return <Account />
    case CONFIDENTIALITY:
      return <Confidentiality />
    case THEMES:
      return <Themes />
    case SECURITY:
      return <Security />
    case DISPLAY:
      return <Display />
    case WEBCAM:
      return <Webcam />
    case OVERLAY:
      return <Overlay />
    case KEYBOARD:
      return <Hotkey />
    case DEVELOPS:
      return <Develops />
    case DEVELOPS_API:
      return <Api />
    case UPDATES:
      return <Updates />
    case OTHER:
      return <Other />
    default:
      return <Redirect to={ACCOUNT} />
  }
}
