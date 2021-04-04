const { app } = require('../sockets')

app.use('/development/api/', require('./user.routes'))
