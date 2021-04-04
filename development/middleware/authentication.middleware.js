const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(400).json({ message: 'Токена не существует!' })
    }

    const decoded = jwt.verify(token, config.get('jwtTokenApi'))
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: 'Пользователь не авторизован!' })
  }
}
