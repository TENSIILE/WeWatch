import React, { useContext } from 'react'
import classnames from 'classnames'
import { MainMenu } from './layouts/MainMenu/MainMenu'
import { Alert } from '../../components/alert/Alert'
import { Preloader } from '../../components/preloader/Preloader'
import { ModalContainer } from '../../components/modal/ModalContainer'
import { ContextGetInfo } from '../../contexts/contextGetInfo'
import { ContextAlert } from '../../contexts/alert/contextAlert'
import { ContextBadge } from '../../contexts/contextBadge'
import { ContextConMenu } from '../../contexts/contextmenu/contextConMenu'
import { ContextMain } from '../../contexts/mainPage/contextMain'
import { ContextSettings } from '../../contexts/settingsPage/contextSettings'
import { SecuritySection } from '../../components/securitySection/SecuritySection'

import {
  DARK_THEMES,
  FONT_BOLD,
  NIGHT_SHIFT,
  CONFRONTATION_WITH_DARK_THEME,
  CONFRONTATION_WITHOUT_MENU,
  MIRROR_CONTAINER,
  DUAL_AUTHENTICATION,
  PASS_USER,
} from '../../types/settingsSwitchBtn'

import './Main.scss'

export const MainPage = ({ children }) => {
  const alert = useContext(ContextAlert)
  const contextmenu = useContext(ContextConMenu)
  const settings = useContext(ContextSettings)

  const {
    infoUser,
    listRequestFriends,
    finishLoading,
    createdMyRooms,
    rerender,
    setRerender,
    ttlCountUnrMsg,
  } = useContext(ContextMain)

  return (
    <ContextGetInfo.Provider
      value={{
        infoUser,
        rerender,
        setRerender,
        listRequestFriends,
        createdMyRooms,
      }}
    >
      <ContextBadge.Provider
        value={{
          textBadge: !!listRequestFriends
            ? listRequestFriends.list.length
            : null,
          textBadgeChat: ttlCountUnrMsg,
        }}
      >
        <Alert {...alert.configAlert} />

        <div
          className={classnames(
            'wrapper',
            { 'font-bold': settings.switchBtn[FONT_BOLD] },
            { 'dark-theme': settings.switchBtn[DARK_THEMES] },
            [settings.selectedTheme],
            {
              'dark-theme-locked':
                settings.switchBtn[CONFRONTATION_WITH_DARK_THEME],
            },
            {
              'confrontation-dart-theme-with-menu':
                settings.switchBtn[CONFRONTATION_WITHOUT_MENU],
            },
            { 'night-shift': settings.switchBtn[NIGHT_SHIFT] }
          )}
          onClick={contextmenu.delegateHiddenContextmenu}
        >
          <Preloader visible={!finishLoading} />
          <ModalContainer />

          {settings.switchBtn[DUAL_AUTHENTICATION] &&
          !settings.switchBtn[PASS_USER] &&
          settings.successfulIdentification ? (
            <SecuritySection />
          ) : (
            <>
              <MainMenu />
              <div
                className={classnames('main-content', {
                  'row-reverse': settings.switchBtn[MIRROR_CONTAINER],
                })}
              >
                {children}
              </div>
            </>
          )}
        </div>
      </ContextBadge.Provider>
    </ContextGetInfo.Provider>
  )
}
