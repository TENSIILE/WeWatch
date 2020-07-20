const {Schema, model, Types} = require('mongoose')
const config                 = require('config')

const schema = new Schema({
    user:      {type: Types.ObjectId, ref:'User'},
    name:      {type: String, default:'Новый пользователь'},
    created:   {type: String},
    languages: [{type: String}],
    country:   {type: String, default: 'Не указано'},
    city:      {type: String, default: 'Не указано'},
    avatar:    {type: String, default: config.get('hostServer') + '/upload/image/USER.jpeg'},
    header:    {type: String, default: config.get('hostServer') + '/upload/image/HEADER.png'}
})

module.exports = model('UserInformation', schema)