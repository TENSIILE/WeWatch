import config from '../config.json'

export const getUserId = (func = () => {}) => {
    return new Promise(resolve => {
        let userID = JSON.parse(localStorage.getItem(config.nameDataLocalStorage)).userId

        if (userID === null) return func()
        resolve(userID)
    })
}

export const searchAndFilter = (array, text) => {
    return array.filter(element => {
        let textElements

        if (!!element.name && !!element.lastname) {
            textElements = element.name.toLowerCase() + ' ' + element.lastname.toLowerCase()
        } else if (!!element.title) {
            textElements = element.title.toLowerCase()
        }
       
        return textElements.includes(text.toLowerCase())
    })
}