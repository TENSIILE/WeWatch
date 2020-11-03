import React from 'react'

export const ContextMain = React.createContext({
    infoUser: {},
    listRequestFriends: {},
    finishLoading: false, 
    createdMyRooms: {},
    setRerender: () => {},
    rerender: false,
    infoUserDialogs: [],
    isReloading: false
})