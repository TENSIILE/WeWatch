const UserInfo = require('../../models/UserInformation')
const helpers = require('../../utils/helpers/helpers')

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const userInfo = await UserInfo.findOne({ user: req.user.id })
    const isCloseProfile = helpers.isCloseProfile(userInfo.settings)

    if (isCloseProfile) {
      return res.status(404).json({ message: 'Профиль закрыт!' })
    }

    req.userInfo = userInfo

    next()
  } catch (e) {
    res.status(400).json({ message: 'Неверный запрос!' })
  }
}
