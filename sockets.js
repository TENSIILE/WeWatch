const app    = require('express')()
const server = require('http').createServer(app)
const io     = require('socket.io')(server)

const User     = require('./models/User')
const UserInfo = require('./models/UserInformation')

const { CLIENT__SET_STATUS, CLIENT__GET_STATUS, CLIENT__CHECK_FRIEND, CLIENT__GET_CHECKED_FRIEND, 
    REQUEST__FRIENDS_CHECK, REQUEST__FIND_OUT_INQUIRIES_FROM_FRIENDS } = require('./types/socket')

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
        const user = await User.findById(userId)

        await UserInfo.findOneAndUpdate(
            { user: user._id },
            { $set: {statusOnline: typeStatus} },
            { new: false }
        )
      
        client.broadcast.emit(CLIENT__GET_STATUS, { friend: userId })
    })

    client.on(CLIENT__CHECK_FRIEND, async ({ uID, friend }) => {
        const user = await User.findById(uID)

        const isMyFriend = !!user.friends.filter(friendId => friendId === friend).length

        client.emit(CLIENT__GET_CHECKED_FRIEND, { isMyFriend })
    })

    client.broadcast.on(REQUEST__FRIENDS_CHECK, () => {
        client.broadcast.emit(REQUEST__FIND_OUT_INQUIRIES_FROM_FRIENDS)
    })
})

module.exports = {
    app, server
}