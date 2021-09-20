import React from 'react'

export const ContextMain = React.createContext({
  infoUser: {},
  listRequestFriends: {},
  finishLoading: false,
  createdMyRooms: {},
  setRerender: () => {},
  rerender: false,
  infoUserDialogs: [],
  isReloading: false,
  setInfoUserDialogs: () => {},
  ttlCountUnrMsg: 0,
  setTtlCountUnrMsg: () => {},
  inputDevices: [],
  logout: async () => {},
  onSendImageProfileAsync: async (nameInput, ref) => {},
  roomsJoined: [],
  roomHook: {
    isConnected: false,
    onConnect: (roomId, userId) => {},
    onDisconnect: (roomId, userId) => {},
    onGetRoom: roomId => {},
    partyRoom: [],
    infoRoom: {},
    roomId: '',
  },
})
