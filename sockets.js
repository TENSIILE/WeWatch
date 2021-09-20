const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const User = require('./models/User')
const UserInfo = require('./models/UserInformation')
const Dialog = require('./models/Dialog')
const Room = require('./models/Room')

const {
  CLIENT__SET_STATUS,
  CLIENT__GET_STATUS,
  CLIENT__CHECK_FRIEND,
  CLIENT__GET_CHECKED_FRIEND,
  REQUEST__FRIENDS_CHECK,
  REQUEST__FIND_OUT_INQUIRIES_FROM_FRIENDS,
  DIALOG__CONNECTION,
  DIALOG__GET_MESSAGE,
  DIALOG__SEND_MESSAGE,
  DIALOG__MESSAGE_READ,
  DIALOG__TYPING,
  DIALOG__TYPING_STOP,
  ROOM__CONNECTION,
  ROOM__DISCONNECTION,
  ROOM__USER_LEAVED,
  ROOM__USER_JOINED,
  ROOM_GET_INFO_ROOM,
  ROOM_GIVE_INFO_ROOM,
} = require('./types/socket')

io.on('connection', client => {
  console.log('Подключился!')

  client.on('disconnection-client', () => {
    client.disconnect()
  })

  client.on('disconnect', async () => {
    client.disconnect()
    console.log('Он отключился')
  })

  client.broadcast.on(CLIENT__SET_STATUS, async ({ userId, typeStatus }) => {
    await UserInfo.findOneAndUpdate(
      { user: userId },
      { $set: { statusOnline: typeStatus } },
      { new: false }
    )

    client.broadcast.emit(CLIENT__GET_STATUS, { friend: userId })
  })

  client.on(CLIENT__CHECK_FRIEND, async ({ uID, friend }) => {
    const user = await User.findById(uID)

    const isMyFriend = !!user.friends.filter(friendId => friendId === friend)
      .length

    client.emit(CLIENT__GET_CHECKED_FRIEND, { isMyFriend })
  })

  client.broadcast.on(REQUEST__FRIENDS_CHECK, () => {
    client.broadcast.emit(REQUEST__FIND_OUT_INQUIRIES_FROM_FRIENDS)
  })

  client.on(DIALOG__CONNECTION, async ({ dialogId }) => {
    if (io.sockets.adapter.sids[client.id][dialogId]) {
      console.log('Shit man, ты уже побывал в этом диалоге!')
    } else {
      console.log('Кто подключился к данному диалогу ', dialogId)
      client.join(dialogId)
    }
  })

  client.on(DIALOG__MESSAGE_READ, async ({ dialogId, userId }) => {
    const dialog = await Dialog.findById(dialogId)

    const data = dialog.messages.map(message => {
      if (message.author !== userId && !message.isReaded) {
        message.isReaded = true
      }
      return message
    })

    const result = data.find(item => item !== null)

    if (typeof result !== 'undefined' && result !== null) {
      if (!!Object.entries(result).length) {
        await Dialog.findByIdAndUpdate(
          { _id: dialogId },
          { $set: { messages: data } },
          { new: false }
        )
      }
    }

    io.sockets.to(dialogId).emit(DIALOG__MESSAGE_READ)
  })

  client.on(DIALOG__SEND_MESSAGE, async ({ dialogId, objMessage }) => {
    if (!dialogId) return

    const dialog = await Dialog.findById(dialogId)

    await Dialog.findByIdAndUpdate(
      { _id: dialog._id },
      { $push: { messages: objMessage } },
      { new: false }
    ).catch(err => console.log('ОШИБКА!', err))

    io.sockets.to(dialogId).emit(DIALOG__GET_MESSAGE, objMessage)
  })

  client.on(DIALOG__TYPING, ({ username, dialogId }) => {
    client.to(dialogId).emit(DIALOG__TYPING, { username })
  })

  client.on(DIALOG__TYPING_STOP, ({ dialogId }) => {
    client.to(dialogId).emit(DIALOG__TYPING_STOP)
  })

  client.on(ROOM__CONNECTION, async ({ roomId, userId }) => {
    client.join(roomId)

    const room = await Room.findById(roomId)

    const party = [...room.partyOnline, userId]

    await Room.findByIdAndUpdate(
      { _id: roomId },
      { $set: { partyOnline: party } },
      { new: false }
    )

    io.sockets.to(roomId).emit(ROOM__USER_JOINED, { userId, party })
  })

  client.on(ROOM__DISCONNECTION, async ({ roomId, userId }) => {
    client.leave(roomId)

    const room = await Room.findById(roomId)

    const party = [...room.partyOnline].filter(
      user => user.toString() !== userId.toString()
    )

    await Room.findByIdAndUpdate(
      { _id: roomId },
      { $set: { partyOnline: party } },
      { new: false }
    )

    io.sockets.to(roomId).emit(ROOM__USER_LEAVED, { userId, party })
  })

  client.on(ROOM_GET_INFO_ROOM, async ({ roomId }) => {
    const room = await Room.findById(roomId)

    io.sockets.to(roomId).emit(ROOM_GIVE_INFO_ROOM, { room })
  })
})

module.exports = {
  app,
  server,
}
