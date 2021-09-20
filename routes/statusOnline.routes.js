const { Router } = require('express')
const User = require('../models/User')
const UserInfo = require('../models/UserInformation')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.post('/status-change', auth, async (req, res) => {
  try {
    await UserInfo.findByIdAndUpdate(
      { _id: req.user.userId },
      { $set: { statusOnline: req.body.status } },
      { new: false }
    )

    res.json({ data: req.body.status })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

module.exports = router
