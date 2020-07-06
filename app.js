const express  = require('express')
const config   = require('config')
const mongoose = require('mongoose')

const PORT = config.get('PORT')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))

async function start() {
    try {
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
        app.listen(PORT, () => console.log(`Server has been started on ${PORT}...`))
    } catch (e) {
        console.log('Server error', e.message)
    }
}

start()
