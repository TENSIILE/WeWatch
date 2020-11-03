import distanceInWordsToNow from 'date-fns/formatDistanceToNow'
import ruLocale from 'date-fns/locale/ru'
import isToday from 'date-fns/isToday'
import format from 'date-fns/format'

import config from '../config.json'

export const getUserId = (func = () => {}) => {
    return new Promise(resolve => {
        let userID = JSON.parse(localStorage.getItem(config.nameDataLocalStorage)).userId

        if (userID === null) return func()
        resolve(userID)
    })
}

export const getUserIdSync = () => JSON.parse(localStorage.getItem(config.nameDataLocalStorage)).userId

export const searchAndFilter = (array, text) => {
    return array.filter(element => {
        let textElements
        
        if (!!element.name && !!element.lastname) {
            textElements = element.name.toLowerCase() + ' ' + element.lastname.toLowerCase()
        } else if (!!element.title) {
            textElements = element.title.toLowerCase()
        } else if (!!element.userAdditional.name && !!element.userAdditional.lastname) {
            textElements = element.userAdditional.name.toLowerCase() + ' ' + element.userAdditional.lastname.toLowerCase()
        } 
       
        return textElements.includes(text.toLowerCase())
    })
}

export const distanceInWordsToNowWrapper = (create_at = new Date("Sat, 31 Oct 2020 16:15:41 GMT")) => {
    return distanceInWordsToNow(new Date(create_at), {addSuffix: true, locale: ruLocale})
}

export const getMessageTime = create_at => {
    if (isToday(create_at)) {
        return format(create_at, 'HH:mm')
    } else {
        return format(create_at, 'dd.MM.yyyy')
    }
}