const {Schema, model, Types} = require('mongoose')
const {v4: uuidv4}           = require('uuid')

const schema = new Schema({
    author: {type: Types.ObjectId, ref: 'User', default: null},
    fullnameAuthor: {type: String, default: null},
    partner: {type: Types.ObjectId, ref: 'User', default: null},
    fullnamePartner: {type: String, default: null},
    isRoom: {type: Boolean, default: false},
    messages:[{
        messageId: {type: String, required: true, default: uuidv4()},
        author: {type: Types.ObjectId, ref: 'User'},
        create_at: {type: String, default: new Date().toUTCString()},
        attachments: {
            videos: [{type: String}],
            pictures: [{type: String}],
            audios: [{type: String}],
            files: [{type: String}]
        },
        text: {type:String},
        isReaded: {type: Boolean, default: false}
    }],
})

module.exports = model('Dialog', schema)