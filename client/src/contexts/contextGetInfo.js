import React from 'react'

export const ContextGetInfo = React.createContext({
    infoUser: null,
    rerender: null,
    setRerender: null,
    listRequestFriends: null,
    createdMyRooms: {}
})