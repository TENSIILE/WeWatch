import { useState, useEffect } from 'react'
import { getUserToken } from '../utils/functions'

import config from '../config.json'

const getValueFromLocalStorage = (key, initialState) => {
  const localState = localStorage.getItem(key)
  const savedValue = localState !== 'undefined' && JSON.parse(localState)

  if (savedValue) return savedValue

  if (initialState instanceof Function) return initialState()

  const wrap = async () => {
    try {
      const option = {
        method: 'GET',
        headers: {
          authorization: `Bearer ${await getUserToken()}`,
        },
      }

      const response = await fetch(
        `${config.hostServer}/api/settings/get`,
        option
      )
      const data = await response.json()

      const jsonParseData = JSON.parse(data.settings)[key]

      jsonParseData !== undefined &&
        localStorage.setItem(key, JSON.stringify(jsonParseData))
      localStorage.setItem(config.lastVersionSettingsFromServer, data.settings)
    } catch (error) {}
  }

  !localStorage.getItem(key) && wrap()

  return localStorage.getItem(key) === null ||
    localStorage.getItem(key) === 'null' ||
    localStorage.getItem(key) === 'undefined' ||
    localStorage.getItem(key) === undefined
    ? initialState
    : localStorage.getItem(key)
}

export const useLocalStorage = (key, initialState) => {
  const [value, setValue] = useState(() => {
    return getValueFromLocalStorage(key, initialState)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}
