const User = require('../../models/User')

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const login = req.query.login
    const user = await User.findOne({ login })

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден!' })
    }

    req.user = user

    next()
  } catch (e) {
    res.status(400).json({ message: 'Неверный запрос!' })
  }
}
