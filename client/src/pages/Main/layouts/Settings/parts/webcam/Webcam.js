import React, { useContext } from 'react'
import classnames from 'classnames'
import { Select } from '../../../../../../components/select/Select'
import { Range } from '../../../../../../components/range/Range'
import { Checkbox } from '../../../../../../components/checkbox/Checkbox'
import { SwitchBtn } from '../../../../../../components/switch/Switch'
import { SoundVisualization } from '../../../../../../components/soundVisualization/SoundVisualization'
import { ContextSettings } from '../../../../../../contexts/settingsPage/contextSettings'

import {
  NOISE_SUPPRESSION,
  VISUALIZATION,
  CONNECT_WEBCAM,
  CONNECT_MICROPHONE,
} from '../../../../../../types/settingsSwitchBtn'

export const Webcam = () => {
  const settings = useContext(ContextSettings)

  return (
    <div className='webcam'>
      <h3 className='title-support'>Настройка микрофона</h3>

      <ul className='clauses-tining'>
        <li className='clause'>
          <div className='tuning-control mt-0-i'>
            <p className='title'>Подключить микрофон</p>
            <SwitchBtn
              size='mini'
              id='connect-microphone'
              value={settings.switchBtn[CONNECT_MICROPHONE]}
              onChange={() => settings.changeSwitchBtn(CONNECT_MICROPHONE)}
            />
          </div>
        </li>
      </ul>

      <ul
        className={classnames('clauses-tining transition', {
          disabled: !settings.switchBtn[CONNECT_MICROPHONE],
        })}
      >
        <li className='clause'>
          <div className='tuning-control with-description'>
            <div className='tuning-control__wrapper-column w-50 align-items-center flex-wrap'>
              <p className='title mb-1'>Громкость ввода</p>
              <Range
                min={0}
                max={100}
                step={1}
                defaultValue={
                  settings.microphoneAndCamera.microphone.volumes[
                    'volume-input'
                  ]
                }
                onChange={value =>
                  settings.onChooseVolumeDevices('volume-input', value)
                }
                marks={{ 50: '50%' }}
                style={{ marginBottom: '1em' }}
              />
            </div>
            <div className='tuning-control__wrapper-column w-50 align-items-center flex-wrap'>
              <p className='title mb-1'>Громкость вывода</p>
              <Range
                min={0}
                max={100}
                step={1}
                defaultValue={
                  settings.microphoneAndCamera.microphone.volumes[
                    'volume-output'
                  ]
                }
                onChange={value =>
                  settings.onChooseVolumeDevices('volume-output', value)
                }
                marks={{ 50: '50%' }}
                style={{ marginBottom: '1em' }}
              />
            </div>
          </div>
        </li>

        <li className='clause'>
          <div className='tuning-control'>
            <p className='title'>Устройство ввода</p>
            <Select
              options={settings.listDevices.audio.input}
              onChange={settings.onChooseMicrophoneAndWebcamera}
              value={
                settings.microphoneAndCamera.microphone.devices['device-input']
                  .label
              }
            />
          </div>
        </li>

        <li className='clause'>
          <div className='tuning-control'>
            <p className='title'>Устройство вывода</p>
            <Select
              options={settings.listDevices.audio.output}
              onChange={settings.onChooseMicrophoneAndWebcamera}
              value={
                settings.microphoneAndCamera.microphone.devices['device-output']
                  .label
              }
            />
          </div>
        </li>

        <li className='clause'>
          <div className='tuning-control'>
            <p className='title'>Шумоподавление</p>
            <SwitchBtn
              size='mini'
              id='noise-suppression'
              value={settings.switchBtn[NOISE_SUPPRESSION]}
              onChange={() => settings.changeSwitchBtn(NOISE_SUPPRESSION)}
            />
          </div>
        </li>

        <li className='clause'>
          <div className='tuning-control'>
            <div className='text-info-detail'>
              <p className='title'>Визуализатор</p>
              <span className='description'>
                Визуализатор звука поможет Вам понять работает ли микрофон или
                нет
              </span>
            </div>
            <SwitchBtn
              size='mini'
              id='visualization'
              value={settings.switchBtn[VISUALIZATION]}
              onChange={() => settings.changeSwitchBtn(VISUALIZATION)}
            />
          </div>
          <div className='tuning-control with-description'>
            <SoundVisualization isWork={settings.switchBtn[VISUALIZATION]} />
          </div>
        </li>
      </ul>

      <h3 className='title-support'>Настройка камеры</h3>

      <ul className='clauses-tining'>
        <li className='clause'>
          <div className='tuning-control mt-0-i'>
            <p className='title'>Подключить камеру</p>
            <SwitchBtn
              size='mini'
              id='connect-webcam'
              value={settings.switchBtn[CONNECT_WEBCAM]}
              onChange={() => settings.changeSwitchBtn(CONNECT_WEBCAM)}
            />
          </div>
        </li>
      </ul>

      <ul
        className={classnames('clauses-tining transition', {
          disabled: !settings.switchBtn[CONNECT_WEBCAM],
        })}
      >
        <li className='clause'>
          <div className='tuning-control'>
            <p className='title'>Выбор камеры</p>
            <Select
              options={settings.listDevices.video}
              onChange={settings.onChooseMicrophoneAndWebcamera}
              value={settings.microphoneAndCamera.webcamera.device.label}
            />
          </div>
        </li>

        <li className='clause'>
          <div className='tuning-control direction-column'>
            <div className='text-info-detail w-100'>
              <p className='title mb-05'>Предпросмотр</p>
              <Checkbox
                text='Включить проверку камеры'
                id='use-preview-webcam'
                state={settings.isPreviewWebcamera}
                setState={settings.setIsPreviewWebcamera}
                newClass='darken-text mt-1'
              />
            </div>
            <div
              className={classnames('w-50 preview-webcamera', {
                active: settings.isPreviewWebcamera,
              })}
            >
              <video ref={settings.previewWebcamera} autoPlay></video>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
