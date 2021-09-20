const { Router } = require('express')
const UserInfo = require('../models/UserInformation')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.post('/save', auth, async (req, res) => {
  try {
    const { settings } = req.body

    await UserInfo.findOneAndUpdate(
      { user: req.user.userId },
      { $set: { settings: JSON.stringify(settings) } },
      { new: false }
    )

    res.json({ done: true })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

router.get('/get', auth, async (req, res) => {
  try {
    const userInfo = await UserInfo.findOne({ user: req.user.userId })

    res.json({ settings: userInfo.settings })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

module.exports = router
