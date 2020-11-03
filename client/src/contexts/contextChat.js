import React from 'react'

export const ContextChat = React.createContext({
    visibleSidebar: false,
    setVisibleSidebar: () => {},
    urlParams: {},
    currentDialog: {},
})