const {Router} = require('express')
const User     = require('../models/User')
const UserInfo = require('../models/UserInformation')
const auth     = require('../middleware/auth.middleware')

const router   = Router()

router.post('/status-change', auth, async (req, res) => {
    try {

        const userInfo = await UserInfo.findOne({ user: req.user.userId })

        const changeStatus = async status => {
            await UserInfo.findByIdAndUpdate( 
                { _id: userInfo._id },
                { $set: {statusOnline: status} },
                { new: false }
            )
        }

        await changeStatus(req.body.status)

        res.json({ data: req.body.status })

    } catch (e) {
        res.status(500).json({ message:'Произошла ошибка, попробуйте снова!' })
    }
})

module.exports = router