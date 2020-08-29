const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    login:               {type: String, required: true, unique: true},
    email:               {type: String, required: true, unique: true},
    password:            {type: String, required: true},
    rooms:               [{type: Types.ObjectId, ref: 'Room'}],
    friends:             [{type: String}],
    friendRequestList:   [{type: String}],
    myFriendRequestList: [{type: String}],
    statusOnline:        {type: String, required: true, default: 'offline'},
    recoveryCode:        {type: String}
})

module.exports = model('User', schema)