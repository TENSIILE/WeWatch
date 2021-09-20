import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { socketsClient } from '../sockets/sockets'
import {
  ROOM__CONNECTION,
  ROOM__DISCONNECTION,
  ROOM__USER_JOINED,
  ROOM__USER_LEAVED,
  ROOM_GET_INFO_ROOM,
  ROOM_GIVE_INFO_ROOM,
} from '../types/socket'

export const useRoom = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [roomId, setRoomId] = useState('')
  const [partyRoom, setPartyRoom] = useState([])
  const [infoRoom, setInfoRoom] = useState({})

  const history = useHistory()

  const onConnect = (roomId, userId) => {
    socketsClient.socket.emit(ROOM__CONNECTION, { roomId, userId })
    setIsConnected(true)
    onGetRoom(roomId)
    setRoomId(roomId)

    history.push(`/room/${roomId}`)
  }

  const onDisconnect = (roomId, userId) => {
    socketsClient.socket.emit(ROOM__DISCONNECTION, { roomId, userId })
    setIsConnected(false)
    setRoomId('')
    setInfoRoom({})
    history.push('/home')
  }

  const onGetRoom = roomId => {
    socketsClient.socket.emit(ROOM_GET_INFO_ROOM, { roomId })
  }

  useEffect(() => {
    if (socketsClient.socket) {
      socketsClient.socket.on(ROOM__USER_LEAVED, ({ party }) => {
        setPartyRoom(party)
      })

      socketsClient.socket.on(ROOM__USER_JOINED, ({ party }) => {
        setPartyRoom(party)
      })

      socketsClient.socket.on(ROOM_GIVE_INFO_ROOM, ({ room }) => {
        setInfoRoom(room)
      })
    }

    return () => {
      socketsClient.socket.off(ROOM__USER_LEAVED)
      socketsClient.socket.off(ROOM__USER_JOINED)
      socketsClient.socket.off(ROOM_GIVE_INFO_ROOM)
    }
  }, [socketsClient.socket])

  return {
    isConnected,
    onConnect,
    onDisconnect,
    onGetRoom,
    partyRoom,
    infoRoom,
    roomId,
  }
}
