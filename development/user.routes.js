const { Router } = require('express')
const auth = require('./middleware/authentication.middleware')
const isExistUser = require('./middleware/isExistUser.middleware')
const isCloseProfile = require('./middleware/isCloseProfile.middleware')

const router = Router()

router.get(
  '/getInfo/email',
  auth,
  isExistUser,
  isCloseProfile,
  async (req, res) => {
    try {
      res.json({ email: req.user.email })
    } catch (e) {
      res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
    }
  }
)

router.get(
  '/getInfo/fullInformation',
  auth,
  isExistUser,
  isCloseProfile,
  async (req, res) => {
    try {
      const userInfoObj = {
        name: req.userInfo.name,
        lastname: req.userInfo.lastname,
        created: req.userInfo.created,
        status: req.userInfo.status,
        country: req.userInfo.country,
        city: req.userInfo.city,
        languages: req.userInfo.languages,
        avatar: req.userInfo.avatar,
        header: req.userInfo.header,
        statusOnline: req.userInfo.statusOnline,
      }

      res.json(userInfoObj)
    } catch (e) {
      res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
    }
  }
)

module.exports = router
