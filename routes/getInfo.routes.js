const {Router} = require('express')
const User     = require('../models/User')
const UserInfo = require('../models/UserInformation')

const router   = Router()

router.get('/user', async (req, res) => {
    try {
        
        const userAdditional = await UserInfo.findOne({user:req.query.userId})
        const user           = await User.findById(req.query.userId)

        if (!userAdditional) {
            return res.status(400).json({ message: 'Такого пользователя не существует!' })
        }

        let tableInformation = {
            'Персональный ID:':user.login,
            'Email:':user.email,
            'Создание аккаунта:':userAdditional.created,
            'Языки:':Array(userAdditional.languages).join(', '),
            'Пароль:': '●'.repeat(user.password.length / 3),
            'Страна:':userAdditional.country,
            'Город:':userAdditional.city,
        }

        tableInformation = Object.entries(tableInformation)

        res.json({userAdditional, user, tableInformation})

    } catch (e) {
        res.status(500).json({message: 'Произошла ошибка, попробуйте снова!' + e})
    }
})

module.exports = router