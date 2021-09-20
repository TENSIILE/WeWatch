import distanceInWordsToNow from 'date-fns/formatDistanceToNow'
import ruLocale from 'date-fns/locale/ru'
import isToday from 'date-fns/isToday'
import format from 'date-fns/format'

import config from '../config.json'

export const getUserId = (func = () => {}) => {
  return new Promise(resolve => {
    let userID = JSON.parse(localStorage.getItem(config.nameDataLocalStorage))
      ?.userId

    if (userID === null) return func()
    resolve(userID)
  })
}

export const getUserToken = (func = () => {}) => {
  return new Promise(resolve => {
    let token = JSON.parse(localStorage.getItem(config.nameDataLocalStorage))
      ?.token

    if (token === null) return func()
    resolve(token)
  })
}

export const getUserIdSync = () =>
  JSON.parse(localStorage.getItem(config.nameDataLocalStorage)).userId

export const searchAndFilter = (array, text) => {
  return array.filter(element => {
    let textElements

    if (element === Object(element)) {
      if (!!element.name && !!element.lastname) {
        textElements =
          element.name.toLowerCase() + ' ' + element.lastname.toLowerCase()
      } else if (!!element.title) {
        textElements = element.title.toLowerCase()
      } else if (
        !!element.userAdditional.name &&
        !!element.userAdditional.lastname
      ) {
        textElements =
          element.userAdditional.name.toLowerCase() +
          ' ' +
          element.userAdditional.lastname.toLowerCase()
      }
    } else textElements = element.toLowerCase()

    return textElements.includes(text.toLowerCase())
  })
}

export const distanceInWordsToNowWrapper = create_at => {
  const datetime = new Date(create_at)

  if (!isToday(datetime)) {
    return format(datetime, 'HH:mm')
  }

  return distanceInWordsToNow(datetime, { addSuffix: true, locale: ruLocale })
}

export const getMessageTime = create_at => {
  const datetime = new Date(create_at)

  if (isToday(datetime)) {
    return format(datetime, 'HH:mm')
  }

  return format(datetime, 'dd.MM.yyyy')
}

export const isTodayDay = datetime => {
  return (
    new Date().toLocaleDateString() === new Date(datetime).toLocaleDateString()
  )
}

export const compareDates = (datetime1, datetime2) => {
  return (
    new Date(datetime1).toLocaleDateString() ===
    new Date(datetime2).toLocaleDateString()
  )
}

export const restrictOutsidePlaybackground = (
  num,
  step = 1,
  vector = 'back'
) => {
  switch (vector) {
    case 'back':
      return num - step < 0 ? 0 : num - step
    default:
      return num + step < 0 ? 0 : num + step
  }
}

export const replaceAll = (str, find, replace) =>
  str.replace(new RegExp(find, 'g'), replace)

export const debounce = (fn, ms) => {
  let timeout
  return function () {
    const fnCall = () => fn.apply(this, arguments)
    clearTimeout(timeout)
    timeout = setTimeout(fnCall, ms)
  }
}

export const loader = async (object, wrap, ms) => {
  await new Promise(resolve => {
    if (typeof object !== 'undefined' && object !== null) {
      if (!Object.keys(object).length) {
        return setTimeout(() => wrap(), ms)
      } else resolve(object)
    } else return setTimeout(() => wrap(), ms)
  })
}

export const randomRange = (min, max) => {
  return Math.abs(Math.floor(min - 0.5 + Math.random() * (max - min + 1)))
}

export const determiningFileSize = size => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  for (let i = 1; i < sizes.length; i++) {
    if (size < Math.pow(1024, i)) {
      return (
        Math.round((size / Math.pow(1024, i - 1)) * 100) / 100 +
        ' ' +
        sizes[i - 1]
      )
    }
  }

  return size
}

export const uploaderFiles = async (file, dialogId, messageId = '') => {
  const formData = new FormData()
  formData.append('file', file)

  const token = await getUserToken()

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const data = await (
    await fetch(
      `${config.hostServer}/upload/dialogs?dialogId=${dialogId}&messageId=${messageId}`,
      options
    )
  ).json()

  return data
}

export const matrix = () => {
  const pattern = [
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    '=',
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '_',
    '+',
    '`',
    '.',
    ',',
    '>',
    '<',
    '?',
    '"',
    ':',
    ';',
    '|',
  ]

  let result = ''

  for (let i = 0; i < 40; i++) {
    const randomNum = randomRange(0, pattern.length - 1)
    const isUpper = randomRange(0, 1)

    let letter

    if (isUpper) {
      letter = pattern[randomNum].toUpperCase()
    } else {
      letter = pattern[randomNum]
    }

    result += letter
  }

  return result
}

export const generateRandomKeys = () => {
  const symbols =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let password = ''
  for (let i = 0; i < 20; i++) {
    password += symbols.charAt(Math.floor(Math.random() * symbols.length))
  }
  return password
}

export const parseParams = url => {
  const params = url.split('?')[1]
  const obj = {}

  const paramsArray = params.split('&').map(param => param.split('='))

  paramsArray.forEach(array => {
    const value = parseInt(array[1])

    if (isNaN(value)) {
      obj[array[0]] = array[1]
    } else {
      obj[array[0]] = value
    }
  })

  return obj
}
