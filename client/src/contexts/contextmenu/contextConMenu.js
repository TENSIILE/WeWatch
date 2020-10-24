import React from 'react'

export const ContextConMenu = React.createContext({
    show: name => {},
    hide: name => {},
    hideAll: () => {},
    visible: {},
    delegateHiddenContextmenu: () => {},
    setOptionsEachCM: () => {},
    eachContextmenu: [],
    openEachCMInFor: () => {},
})