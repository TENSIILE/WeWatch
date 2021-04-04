import React, { useState, useEffect, useRef, useContext } from 'react'
import { v4 } from 'uuid'
import { useHttp } from '../../hooks/http.hook'
import { useLocalStorage } from '../../hooks/localStorage.hook'
import { ContextSettings } from './contextSettings'
import { ContextAlert } from '../../contexts/alert/contextAlert'
import { ContextAuth } from '../../contexts/contextAuth'

import {
  BACKGROUND_FOR_CHAT,
  NOISE_SUPPRESSION,
} from '../../types/settingsSwitchBtn'

import {
  SWITCH_BTN,
  ADDING_TO_FRIEND,
  DISPLAY_BRIGHTNESS,
  SELECT_IMAGE_BACKGROUND_CHAT,
  IS_BACKGROUND_CHAT_OPEN,
  SELECTED_THEME,
  CUBES,
  MICROPHONE_AND_WEBCAMERA,
  LIST_DEVICES,
  OVERLAY,
  SPEED_RANGE_SLIDER_IMAGE,
} from '../../types/settingsNames'

import config from '../../config.json'

export const SettingsState = ({ children }) => {
  // Контексты
  const alert = useContext(ContextAlert)
  const { userId, token } = useContext(ContextAuth)

  const [switchBtn, setSwitchBtn] = useLocalStorage(SWITCH_BTN, {
    // Конфиденциальность
    closeProfile: false,

    // Внешний Вид
    darkThemes: false,
    backgroundForChat: false,
    confrontationWithDarkTheme: false,
    confrontationWithoutMenu: false,
    fontBold: false,
    maximalizeSidebar: false,
    mirrorContainer: false,

    // Безопасность
    dualAuthentication: false,
    passUser: true,

    // Дисплей
    nightShift: false,

    // Микрофон и камера
    noiseSuppression: false,
    visualization: false,
    connectWebcam: false,
    connectMicrophone: false,

    // Оверлей
    overlay: false,

    // Режим разработчика
    developerMode: false,
  })

  // Аккаунт

  const { request, loading } = useHttp()

  const [passwordInput, setPasswordInput] = useState('')

  // Конфиденциальность

  const [addingToFriend, setAddingToFriend] = useLocalStorage(
    ADDING_TO_FRIEND,
    {
      all: true,
      nobody: false,
    }
  )

  // Внешний Вид

  const [
    selectImageBackgroundChat,
    setSelectImageBackgroundChat,
  ] = useLocalStorage(SELECT_IMAGE_BACKGROUND_CHAT, '')

  const [backgroundChatOpen, setBackgroundChatOpen] = useLocalStorage(
    IS_BACKGROUND_CHAT_OPEN,
    false
  )

  const [selectedTheme, setSelectedTheme] = useLocalStorage(
    SELECTED_THEME,
    'blue-theme'
  )

  const [cubes, setCubes] = useLocalStorage(CUBES, [
    {
      id: v4(),
      colors: ['#ED5563', '#C73D4A', '#DC3545'],
      turnOn: false,
      text: 'Красная',
      textColor: '#DC3545',
      nameClassName: 'red-theme',
    },
    {
      id: v4(),
      colors: ['#72EB87', '#42CB59', '#53D769'],
      turnOn: false,
      text: 'Зеленая',
      textColor: '#53D769',
      nameClassName: 'green-theme',
    },
    {
      id: v4(),
      colors: ['#47A0FF', '#0074F0', '#007BFF'],
      turnOn: true,
      text: 'Синяя',
      textColor: '#007BFF',
      nameClassName: 'blue-theme',
    },
    {
      id: v4(),
      colors: ['#FFD24A', '#EBB000', '#FFC107'],
      turnOn: false,
      text: 'Желтая',
      textColor: '#FFC107',
      nameClassName: 'yellow-theme',
    },
    {
      id: v4(),
      colors: ['#FF9D42', '#F37500', '#eb8628'],
      turnOn: false,
      text: 'Оранжевая',
      textColor: '#eb8628',
      nameClassName: 'orange-theme',
    },
    {
      id: v4(),
      colors: ['#2EB8CE', '#1396AB', '#17A2B8'],
      turnOn: false,
      text: 'Голубая',
      textColor: '#17A2B8',
      nameClassName: 'sky-theme',
    },
    {
      id: v4(),
      colors: ['#B778D1', '#9244B1', '#9B59B6'],
      turnOn: false,
      text: 'Фиолетовая',
      textColor: '#9B59B6',
      nameClassName: 'purple-theme',
    },
  ])

  const imageDirectoryRef = useRef(null)

  // Безопасность

  const [successfulIdentification, setSuccessfulIdentification] = useState(
    false
  )

  // Дисплей

  const [displayBrightness, setDisplayBrightness] = useLocalStorage(
    DISPLAY_BRIGHTNESS,
    100
  )

  // Микрофон и камера

  const [microphoneAndCamera, setMicrophoneAndCamera] = useLocalStorage(
    MICROPHONE_AND_WEBCAMERA,
    {
      microphone: {
        volumes: {
          'volume-input': 10,
          'volume-output': 10,
        },
        devices: {
          'device-input': {},
          'device-output': {},
        },
      },
      webcamera: {
        device: {},
      },
    }
  )

  const [listDevices, setListDevices] = useLocalStorage(LIST_DEVICES, {
    audio: {
      output: [],
      input: [],
    },
    video: [],
  })

  const [isPreviewWebcamera, setIsPreviewWebcamera] = useState(false)

  const previewWebcamera = useRef(null)

  // Оверлей

  const [overlay, setOverlay] = useLocalStorage(OVERLAY, {
    screen: {
      'screen-1': false,
      'screen-2': false,
      'screen-3': false,
      'screen-4': true,
    },
  })

  // Режим разработчика

  const [inputTokenApi, setInputTokenApi] = useState('')

  // Прочее

  const [speedRangeSliderImage, setSpeedRangeSliderImage] = useLocalStorage(
    SPEED_RANGE_SLIDER_IMAGE,
    200
  )

  // Методы

  const onChangeVolume = () => {
    if (previewWebcamera.current) {
      previewWebcamera.current.volume =
        microphoneAndCamera.microphone.volumes['volume-input'] / 100
    }
  }

  const usingDevices = stream => {
    if (!isPreviewWebcamera && previewWebcamera.current)
      return (previewWebcamera.current.srcObject = null)

    if (previewWebcamera.current && 'srcObject' in previewWebcamera.current) {
      previewWebcamera.current.srcObject = stream
    }
  }

  const onChooseVolumeDevices = (device, value) => {
    setMicrophoneAndCamera({
      ...microphoneAndCamera,
      microphone: {
        volumes: { ...microphoneAndCamera.microphone.volumes, [device]: value },
        devices: { ...microphoneAndCamera.microphone.devices },
      },
    })
  }

  const onChooseMicrophoneAndWebcamera = device => {
    switch (device.kind) {
      case 'audiooutput':
        setMicrophoneAndCamera({
          ...microphoneAndCamera,
          microphone: {
            volumes: { ...microphoneAndCamera.microphone.volumes },
            devices: {
              ...microphoneAndCamera.microphone.devices,
              'device-output': device,
            },
          },
        })
        break
      case 'audioinput':
        setMicrophoneAndCamera({
          ...microphoneAndCamera,
          microphone: {
            volumes: { ...microphoneAndCamera.microphone.volumes },
            devices: {
              ...microphoneAndCamera.microphone.devices,
              'device-input': device,
            },
          },
        })
        break
      case 'videoinput':
        setMicrophoneAndCamera({
          ...microphoneAndCamera,
          webcamera: {
            ...microphoneAndCamera.webcamera,
            device: device,
          },
        })
        break
      default:
        break
    }
  }

  const onSetMicroAndCameraByDefault = arrayDevices => {
    const listKinds = ['audioinput', 'audiooutput', 'videoinput']

    if (
      !Object.entries(microphoneAndCamera.microphone.devices['device-input'])
        .length
    ) {
      const findedDevice = arrayDevices.find(
        device => device.deviceId === 'default' && device.kind === listKinds[0]
      )
      onChooseMicrophoneAndWebcamera(findedDevice)
    }

    if (
      !Object.entries(microphoneAndCamera.microphone.devices['device-output'])
        .length
    ) {
      const findedDevice = arrayDevices.find(
        device => device.deviceId === 'default' && device.kind === listKinds[1]
      )
      onChooseMicrophoneAndWebcamera(findedDevice)
    }

    if (!Object.entries(microphoneAndCamera.webcamera.device).length) {
      const findedDevice = arrayDevices.find(
        device => device.kind === listKinds[2]
      )
      onChooseMicrophoneAndWebcamera(findedDevice)
    }
  }

  const changePasswordUser = async () => {
    try {
      const { message } = await request(
        `${config.hostServer}/api/recovery/assigningNewPasswordFromAccount`,
        'POST',
        { new_password: passwordInput },
        {
          authorization: `Bearer ${token}`,
        }
      )
      alert.show('success', message, 'Успешно!')
      setPasswordInput('')
    } catch (e) {
      alert.show('danger', e.message, 'Ошибка!')
    }
  }

  const changeSwitchBtn = (nameSwitch, value = NaN) => {
    setSwitchBtn({
      ...switchBtn,
      [nameSwitch]: !isNaN(value) ? value : !switchBtn[nameSwitch],
    })
  }

  const changeTheme = ref => {
    const index = cubes.findIndex(cube => cube.id === ref.current.id)

    setCubes(
      cubes.map(cube => {
        if (cubes[index].id === cube.id) {
          cube.turnOn = true

          return cube
        }

        cube.turnOn = false
        return cube
      })
    )

    setSelectedTheme(cubes[index].nameClassName)
  }

  const onToggleImageDirectory = action => {
    const top = imageDirectoryRef.current.lastElementChild.getBoundingClientRect()
      .top
    const MIN_HEIGHT_COMPONENT = 130

    if (typeof action === 'boolean' && !action) {
      imageDirectoryRef.current.style.height = MIN_HEIGHT_COMPONENT + 'px'
      return setBackgroundChatOpen(false)
    }

    if (!backgroundChatOpen) {
      imageDirectoryRef.current.style.height = top + 'px'
      setBackgroundChatOpen(true)
    } else {
      imageDirectoryRef.current.style.height = MIN_HEIGHT_COMPONENT + 'px'
      setBackgroundChatOpen(false)
    }
  }

  const onSaveSettings = async () => {
    const settings = {
      [SWITCH_BTN]: JSON.parse(localStorage.getItem(SWITCH_BTN)),
      [ADDING_TO_FRIEND]: JSON.parse(localStorage.getItem(ADDING_TO_FRIEND)),
      [SELECT_IMAGE_BACKGROUND_CHAT]: JSON.parse(
        localStorage.getItem(SELECT_IMAGE_BACKGROUND_CHAT)
      ),
      [IS_BACKGROUND_CHAT_OPEN]: JSON.parse(
        localStorage.getItem(IS_BACKGROUND_CHAT_OPEN)
      ),
      [SELECTED_THEME]: JSON.parse(localStorage.getItem(SELECTED_THEME)),
      [CUBES]: JSON.parse(localStorage.getItem(CUBES)),
      [DISPLAY_BRIGHTNESS]: JSON.parse(
        localStorage.getItem(DISPLAY_BRIGHTNESS)
      ),
      [MICROPHONE_AND_WEBCAMERA]: JSON.parse(
        localStorage.getItem(MICROPHONE_AND_WEBCAMERA)
      ),
      [LIST_DEVICES]: JSON.parse(localStorage.getItem(LIST_DEVICES)),
      [OVERLAY]: JSON.parse(localStorage.getItem(OVERLAY)),
      [SPEED_RANGE_SLIDER_IMAGE]: JSON.parse(
        localStorage.getItem(SPEED_RANGE_SLIDER_IMAGE)
      ),
    }

    const settingsStringifyJSON = JSON.stringify(settings)

    if (!localStorage.getItem(config.lastVersionSettingsFromServer)) {
      const option = {
        method: 'GET',
        headers: { authorization: `Bearer ${token}` },
      }

      const data = await (
        await fetch(
          `${config.hostServer}/api/settings/get?userId=${userId}`,
          option
        )
      ).json()
      localStorage.setItem(config.lastVersionSettingsFromServer, data.settings)
    }

    if (
      localStorage.getItem(config.lastVersionSettingsFromServer) ===
      settingsStringifyJSON
    )
      return

    await request(
      `${config.hostServer}/api/settings/save`,
      'POST',
      { settings },
      {
        authorization: `Bearer ${token}`,
      }
    )
    localStorage.setItem(
      config.lastVersionSettingsFromServer,
      settingsStringifyJSON
    )
  }

  // LifeCycle Hooks

  useEffect(() => {
    if (!switchBtn[BACKGROUND_FOR_CHAT]) {
      setBackgroundChatOpen(false)
      setSelectImageBackgroundChat('')

      if (imageDirectoryRef.current) {
        onToggleImageDirectory(false)
      }
    }
  }, [switchBtn[BACKGROUND_FOR_CHAT]])

  useEffect(() => {
    document.body.style.filter = `brightness(${displayBrightness / 100})`
  }, [displayBrightness])

  useEffect(() => {
    const index = cubes.findIndex(cube => cube.turnOn && cube)
    setSelectedTheme(cubes[index].nameClassName)

    const wrap = async () => {
      await navigator.mediaDevices
        .getUserMedia({
          audio: {
            deviceId:
              microphoneAndCamera.microphone.devices['device-input'].deviceId,
            noiseSuppression: switchBtn[NOISE_SUPPRESSION],
          },
          video: {
            deviceId: microphoneAndCamera.webcamera.device.deviceId,
          },
        })
        .then(stream => usingDevices(stream))

      let devices = await navigator.mediaDevices.enumerateDevices()

      const newDevices = []

      devices.forEach(device => {
        let index = newDevices.findIndex(findDevice => {
          return (
            findDevice.groupId === device.groupId &&
            findDevice.kind === device.kind
          )
        })

        if (index === -1) newDevices.push(device)
      })

      setListDevices({
        audio: {
          output: newDevices.filter(device => device.kind === 'audiooutput'),
          input: newDevices.filter(device => device.kind === 'audioinput'),
        },
        video: newDevices.filter(device => device.kind === 'videoinput'),
      })

      onSetMicroAndCameraByDefault(newDevices)

      onChangeVolume()
    }
    wrap()
  }, [])

  useEffect(() => {
    const wrap = async () => {
      await navigator.mediaDevices
        .getUserMedia({
          audio: {
            deviceId:
              microphoneAndCamera.microphone.devices['device-input'].deviceId,
            noiseSuppression: switchBtn[NOISE_SUPPRESSION],
          },
          video: {
            deviceId: microphoneAndCamera.webcamera.device.deviceId,
          },
        })
        .then(stream => usingDevices(stream))
    }
    wrap()
  }, [microphoneAndCamera, isPreviewWebcamera, switchBtn[NOISE_SUPPRESSION]])

  useEffect(() => {
    onChangeVolume()
  }, [microphoneAndCamera.microphone.volumes['volume-input']])

  // Статика

  const arrayImages = [
    'https://sun9-39.userapi.com/impg/mKk9wfOyophh5VC7ak_PiZNghPLlbEM5QhHtwg/IJyMgcNj4SE.jpg?size=2560x1440&quality=96&proxy=1&sign=aff22dbacc1cc459668119463a6972c7&type=album',
    'https://sun9-11.userapi.com/impg/NcqrSaTREifRgVlKwIWC98MJyj5fu1d-XT8kqA/uqZrkxSDdr8.jpg?size=2560x1440&quality=96&proxy=1&sign=39b054bc09306d1bf772809646658111&type=album',
    'https://sun9-32.userapi.com/impg/OC5xeAP744Mc--D1Lhm_ugYLHzAXMlbPgLqwmA/2TN0ZE5VjOQ.jpg?size=2560x1440&quality=96&proxy=1&sign=0dcdd7cbd211e584b4de9705ca948c83&type=album',
    'https://sun9-62.userapi.com/impg/K3KxQwRgRPu5qRS8HVTk7r5zdJgnJ0Y_lPTKpg/FsPOn5RFmX8.jpg?size=2560x1440&quality=96&proxy=1&sign=42bc48a2abe3a48c9546acade3394d7a&type=album',
    'https://sun9-22.userapi.com/impg/YBmAJv_t2fiY7ihumIDyR5EGPjNG2N-8p0jPcA/nBPGqHh-ijk.jpg?size=2560x1440&quality=96&proxy=1&sign=218ee18133b1ad3ac4b367c8e3b672b8&type=album',
    'https://sun9-39.userapi.com/impg/1GsGlACufUa5gfErBJ5wFOZyzvI8y0FHV_DBqQ/mpXuEXccPAU.jpg?size=2560x1440&quality=96&proxy=1&sign=d67e0bececc25375d6568d227d9925d3&type=album',
    'https://sun9-30.userapi.com/impg/5MCR4Be9o2GV52yYZDBMy81lGqrCHllixzqBFQ/wia8dONFrqk.jpg?size=2560x1440&quality=96&proxy=1&sign=336c021683f73c34a60c019c2797b2ff&type=album',
    'https://sun9-4.userapi.com/impg/KRPoC-nw6xAv6ML4JdSN89rNIpOd5zp8JFkuFw/abVJdna1lTo.jpg?size=2560x1440&quality=96&proxy=1&sign=14ad4fdd7969746fd7c9cbd22da7ee1c&type=album',
    'https://sun9-6.userapi.com/impg/vB9x6jXO1JLYGzylgQnQjtQSwrcwpMZQgX9iQw/4Z60pu0x2q0.jpg?size=2560x1440&quality=96&proxy=1&sign=d1999a8dbe925941c5a8977d314ae3a1&type=album',
    'https://sun9-58.userapi.com/impg/u7pbwOM4zYi7wFUQbpnLJ1l8e7MNU2v6pRurdw/eoPOV6laBjg.jpg?size=2560x1440&quality=96&proxy=1&sign=974d4700645180672aed0a3b7aa24ad3&type=album',
    'https://sun9-25.userapi.com/impg/ucorIwAZotex1y6Uf4tnLmzr80svt0suwSc2hw/18vst7INpeQ.jpg?size=2560x1440&quality=96&proxy=1&sign=9c89e7bd9b0003436409bbcc9e33c4ca&type=album',
    'https://sun9-44.userapi.com/impg/To-siu1aDtrewemPEqS2P4q6oYuZ0s2-xGKfSQ/HBOnNAsH2aI.jpg?size=2560x1440&quality=96&proxy=1&sign=abb86fa8399af02e2da652ee92884449&type=album',
  ]

  return (
    <ContextSettings.Provider
      value={{
        cubes,
        changeTheme,
        arrayImages,
        selectImageBackgroundChat,
        setSelectImageBackgroundChat,
        changeSwitchBtn,
        switchBtn,
        backgroundChatOpen,
        setBackgroundChatOpen,
        imageDirectoryRef,
        onToggleImageDirectory,
        selectedTheme,
        addingToFriend,
        setAddingToFriend,
        speedRangeSliderImage,
        setSpeedRangeSliderImage,
        passwordInput,
        setPasswordInput,
        changePasswordUser,
        onSaveSettings,
        overlay,
        setOverlay,
        listDevices,
        onChooseMicrophoneAndWebcamera,
        microphoneAndCamera,
        previewWebcamera,
        isPreviewWebcamera,
        setIsPreviewWebcamera,
        onChooseVolumeDevices,
        loading,
        inputTokenApi,
        setInputTokenApi,
        displayBrightness,
        setDisplayBrightness,
        successfulIdentification,
        setSuccessfulIdentification,
      }}
    >
      {children}
    </ContextSettings.Provider>
  )
}
