const app    = require('express')()
const server = require('http').createServer(app)
const io     = require('socket.io')(server)

const User     = require('./models/User')
const UserInfo = require('./models/UserInformation')

io.on('connection', client => {
    console.log('Подключился!')

    client.on('disconnection-client', () => {
        client.disconnect()
    })
    
    client.on('disconnect', async () => {
        client.disconnect()
        console.log('Он отключился')
    })

    client.on('CLIENT::SET-STATUS', async ({ userId, typeStatus }) => {
        const user = await User.findById(userId)

        await UserInfo.findOneAndUpdate(
            { user: user._id },
            { $set: {statusOnline: typeStatus} },
            { new: false }
        )
      
        client.broadcast.emit('CLIENT::GET-STATUS', { friend: userId })
    })

    client.on('CLIENT::CHECK_FRIEND', async ({ uID, friend }) => {
        const user = await User.findById(uID)

        const isMyFriend = !!user.friends.filter(friendId => friendId === friend)

        client.emit('CLIENT::GET_CHECKED_FRIEND', { isMyFriend })
    })
})

module.exports = {
    app, server
}