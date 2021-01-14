import React, { useContext } from 'react'
import classnames from 'classnames'
import { useHeight } from '../../../../../../hooks/useHeight.hook'
import { SwitchBtn } from '../../../../../../components/switch/Switch'
import { ImageDirectory } from '../../../../../../components/imageDirectory/ImageDirectory'
import { CubeTheme } from '../../../../../../components/cube/Cube'
import { BadgeMini } from '../../../../../../components/badge/Badge'
import { ContextSettings } from '../../../../../../contexts/settingsPage/contextSettings'

import { 
    DARK_THEMES,
    BACKGROUND_FOR_CHAT,
    CONFRONTATION_WITH_DARK_THEME,
    CONFRONTATION_WITHOUT_MENU,
    FONT_BOLD,
    MAXIMALIZE_SIDEBAR,
    MIRROR_CONTAINER,
} from '../../../../../../types/settingsSwitchBtn'


export const Themes = () => {
    const settings       = useContext(ContextSettings)
    const confrontHeight = useHeight(settings.switchBtn[DARK_THEMES])

    return (
        <div className='themes'>
            <ul className='clauses-tining'>
                <li className='clause'>
                    <div className="tuning-control">
                        <p className='title'>Темная тема</p>
                        <SwitchBtn 
                            size='mini'
                            id='dark-themes' 
                            value={settings.switchBtn[DARK_THEMES]} 
                            onChange={() => settings.changeSwitchBtn(DARK_THEMES)}
                         />
                    </div>
                </li>

                <li className='clause background-for-chat'>
                    <div className="tuning-control">
                        <p className='title'>Фон для чата</p>
                        <SwitchBtn 
                            size='mini' 
                            id='background-for-chat'
                            value={settings.switchBtn[BACKGROUND_FOR_CHAT]}
                            onChange={() => settings.changeSwitchBtn(BACKGROUND_FOR_CHAT)}
                        />
                    </div>
                    <div className={classnames("background-for-chat", {'visible': settings.switchBtn[BACKGROUND_FOR_CHAT]})}>
                        <div className="directory-backgrounds">
                            <ImageDirectory 
                                arrayImages={settings.arrayImages}
                                setSelectImage={settings.setSelectImageBackgroundChat}
                                selectImage={settings.selectImageBackgroundChat}
                                reference={settings.imageDirectoryRef}
                                onToggle={settings.onToggleImageDirectory}
                            />
                        </div>
                    </div>
                </li>

                <li className='clause'>
                    <div className="tuning-control">
                        <div className="text">
                            <p className='title'>Кастомные темы</p>
                            <BadgeMini
                                text='Новое'
                                newClass='danger'
                            />
                        </div>
                    </div>
                    <div className={classnames("custom-themes", {'hidden-cubes': settings.switchBtn[CONFRONTATION_WITH_DARK_THEME]})}>
                        <div className="cubes">
                            {
                                settings.cubes.map((cube, i) => {
                                    return (
                                        <CubeTheme 
                                            key={i} 
                                            {...cube}
                                            onClick={settings.changeTheme}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    
                    <div 
                        className={classnames("tuning-control with-description confrontation", {'visible': settings.switchBtn[DARK_THEMES]})} 
                        ref={confrontHeight.ref}
                    >
                        <div className='tuning-control__wrapper-column'>
                            <div className="text-info-detail">
                                <p className='title'>Конфронтация темной темы</p>
                                <span className='description'>При включении данного пункта все элементы приложения будут приведены к темной теме</span>
                            </div>
                            <SwitchBtn 
                                size='mini'
                                id='confrontation-dark-theme'
                                value={settings.switchBtn[CONFRONTATION_WITH_DARK_THEME]}
                                onChange={() => settings.changeSwitchBtn(CONFRONTATION_WITH_DARK_THEME)}
                                disabled={!settings.switchBtn[DARK_THEMES]}
                            />
                        </div>
                        <div className='tuning-control__wrapper-column'>
                            <div className="text-info-detail">
                                <p className='title'>Конфронтация с меню</p>
                                <span className='description'>Вы сохраните кастомную тему с темной, но главное меню будет использовать палитру темной темы</span>
                            </div>
                            <SwitchBtn 
                                size='mini'
                                id='confrontation-without-menu'
                                value={settings.switchBtn[CONFRONTATION_WITHOUT_MENU]}
                                onChange={() => settings.changeSwitchBtn(CONFRONTATION_WITHOUT_MENU)}
                                disabled={!settings.switchBtn[DARK_THEMES] || settings.switchBtn[CONFRONTATION_WITH_DARK_THEME]}
                            />
                        </div>
                    </div>
                </li>

                <li className='clause'>
                    <div className="tuning-control">
                        <p className='title'>Жирный шрифт</p>
                        <SwitchBtn 
                            size='mini' 
                            id='bold-font'
                            value={settings.switchBtn[FONT_BOLD]}
                            onChange={() => settings.changeSwitchBtn(FONT_BOLD)}
                        />
                    </div>
                </li>

                <li className='clause'>
                    <div className="tuning-control with-description">
                        <div className="text-info-detail">
                            <p className='title'>Увеличенная боковая панель</p>
                            <span className='description'>Левая боковая панель будет увеличиваться при изменении размеров окна</span>
                        </div>
                        <SwitchBtn 
                            size='mini' 
                            id='minimalize-sidebar'
                            value={settings.switchBtn[MAXIMALIZE_SIDEBAR]}
                            onChange={() => settings.changeSwitchBtn(MAXIMALIZE_SIDEBAR)}
                        />
                    </div>
                </li>

                <li className='clause'>
                    <div className="tuning-control with-description">
                        <p className='title'>Зеркально отразить главный контейнер</p>
                        <SwitchBtn 
                            size='mini' 
                            id='mirror-container'
                            value={settings.switchBtn[MIRROR_CONTAINER]}
                            onChange={() => settings.changeSwitchBtn(MIRROR_CONTAINER)}
                        />
                    </div>
                </li>
            </ul>
        </div>
    )
}