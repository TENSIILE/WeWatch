const express  = require('express')
const {app, server} = require('./sockets')
const mongoose = require('mongoose')
const cors     = require('cors')
const config   = require('config')

const PORT     = config.get('PORT')

app.use(express.json({ extended: true }))
app.use(cors())

app.use((req, res, next) => {
    req.header("Access-Control-Allow-Origin", "*")
    req.header('Access-Control-Allow-Credentials', true)
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/getInfo', require('./routes/getInfo.routes'))
app.use('/api/friends', require('./routes/friends.routes'))
app.use('/api/recovery', require('./routes/passwordRecovery.routes'))
app.use('/api/room', require('./routes/room.routes'))
app.use('/api/status', require('./routes/statusOnline.routes'))

app.use('/upload/image', express.static(__dirname + '/upload/image'))
app.use(require('./routes/upload.routes'))

async function start() {
    try {
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        })
        server.listen(PORT, () => console.log(`Server has been started on ${PORT}...`))
    } catch (e) {
        console.log('Server error:', e.message)
    }
}

start()