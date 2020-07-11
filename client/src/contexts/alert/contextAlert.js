import React from 'react'

export const ContextAlert = React.createContext({
    show: () => {},
    hide: () => {},
    isOpen: null,
    configAlert:null
})