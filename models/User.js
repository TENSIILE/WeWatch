const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    login:               {type: String, required: true, unique: true},
    email:               {type: String, required: true, unique: true},
    password:            {type: String, required: true},
    myRooms:             [{type: Types.ObjectId, ref: 'Room'}],
    friends:             [{type: String}],
    friendRequestList:   [{type: String}],
    myFriendRequestList: [{type: String}],
    recoveryCode:        {type: String}
})

module.exports = model('User', schema)