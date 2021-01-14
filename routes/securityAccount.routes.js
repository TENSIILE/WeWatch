const { Router } = require('express')
const User       = require('../models/User')
const { sendMail, subjectMessage }   = require('../utils/helpers/mail')
const { generateKeys, clearingKeys } = require('../utils/helpers/helpers')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.post('/dual_authentication/create', auth, async (req, res) => {
    try {

        const userId = req.user.userId

        const newKey = generateKeys(32)

        const user   = await User.findById(userId)

        const messageHTML = `
            <h2>Хей, ${user.login}!</h2>
            <p>Держите Ваш код доступа к учетной записи WeWatch:
                <br/>
            <h3>Код: <strong>${newKey}</strong></h3>
                <br/>
            В целях обеспечения безопасности код станет недействительным через 3 минуты.
                <br/>
            Команда WeWatch</p>
        `

        sendMail(subjectMessage.dualAuthentication, {
            to: user.email,
            text: '',
            html: messageHTML
        })

        await User.findOneAndUpdate(
            { _id: userId },
            { $set: { recoveryCode: newKey } },
            { new: false }
        )
    
        res.json({ success:true })
        
        clearingKeys(async () => {
            await User.findOneAndUpdate(
                { _id:  userId},
                { $set: { recoveryCode: "" } },
                { new: false }
            )
        })

    } catch (e) {
        res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
    }
})

router.post('/dual_authentication/compare', auth, async (req, res) => {
    try {

        const { keyAccess } = req.body

        const user = await User.findById(req.user.userId)

        if (keyAccess.toString() === user.recoveryCode.toString()) {
            return res.json({ success: true })
        }

        throw new Error('Неверный код доступа!')

    } catch (e) {
        res.status(500).json({ message: e.message ? e.message : 'Произошла ошибка, попробуйте снова!' })
    }
})


router.post('/input_devices/push', auth, async (req, res) => {
    try {
        
        const { dataIp } = req.body

        const userId = req.user.userId

        const user = await User.findById(userId)

        let data   = [...user.inputDevices, dataIp]

        if (data.length > 10) {
            data = data.slice(1)
        }
        
        await User.findOneAndUpdate(
            { _id: userId },
            { $set: { inputDevices: data } },
            { new: false }
        )

        res.json({ done: true })

    } catch (error) {
        res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
    }
})

router.get('/input_devices/get', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)

        res.json(user.inputDevices)

    } catch (error) {
        res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
    }
})

module.exports = router