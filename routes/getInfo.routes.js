const { Router } = require('express')
const User = require('../models/User')
const UserInfo = require('../models/UserInformation')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.get('/user', auth, async (req, res) => {
  try {
    const userAdditional = await UserInfo.findOne({ user: req.user.userId })
    const user = await User.findById(req.user.userId)

    if (!userAdditional) {
      return res
        .status(400)
        .json({ message: 'Такого пользователя не существует!' })
    }

    let tableInformation = {
      'Ник:': user.login,
      'Email:': user.email,
      'Создание аккаунта:': userAdditional.created,
      'Языки:': userAdditional.languages.join(', '),
      'Пароль:': '●'.repeat(user.password.length / 3),
      'Страна:': userAdditional.country,
      'Город:': userAdditional.city,
    }

    let tableInformationEdit = {
      'Имя:': userAdditional.name,
      'Фамилия:': userAdditional.lastname,
      'Статус:': userAdditional.status,
      'Ник:': user.login,
      'Языки:': userAdditional.languages.join(', '),
      'Страна:': userAdditional.country,
      'Город:': userAdditional.city,
    }

    tableInformation = Object.entries(tableInformation)
    tableInformationEdit = Object.entries(tableInformationEdit)

    delete user.password

    res.json({ userAdditional, user, tableInformation, tableInformationEdit })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

const filterObject = obj => {
  Object.entries(obj).map(array =>
    Object.entries(array[1]).filter(val => val[1].length).length
      ? array
      : delete obj[array[0]]
  )
}

router.post('/user/basicInfo', auth, async (req, res) => {
  try {
    const { login } = req.body

    const user = await User.findOne({ login })
    const userAdditional = await UserInfo.findOne({ user: user._id })

    const newUser = {
      login: user.login,
    }

    res.json({ userAdditional, user: newUser })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

router.post('/user/byId', auth, async (req, res) => {
  try {
    const { id } = req.body

    let user = await User.findById(id)
    const userAdditional = await UserInfo.findOne({ user: user._id })

    delete user.password

    res.json({ userAdditional, user })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

router.post('/user/savedata', auth, async (req, res) => {
  try {
    const { userId, userInfo } = req.body

    const updatedUserInfo = {
      name: userInfo['Имя:'],
      lastname: userInfo['Фамилия:'],
      status: userInfo['Статус:'],
      languages: !!userInfo.languages.length
        ? userInfo.languages
        : 'Не указано',
      country: userInfo['Страна:'],
      city: userInfo['Город:'],
    }

    const updatedUser = { login: userInfo['Ник:'] }

    filterObject(updatedUserInfo)
    filterObject(updatedUser)

    try {
      await UserInfo.findOneAndUpdate(
        { user: userId },
        { $set: updatedUserInfo },
        { new: false }
      )
      await User.findByIdAndUpdate(
        { _id: userId },
        { $set: updatedUser },
        { new: false }
      )
    } catch (e) {
      res.status(400).json({ message: 'Данные не сохранились!' })
    }

    res.json({ message: 'Данные были успешно сохранены!' })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

router.get('/user/getTokenApi', auth, async (req, res) => {
  try {
    let user = await User.findById(req.query.userId)

    if (!user.tokenApi) {
      res.status(404).json({
        message:
          'Вашего токена как разработчика не существует. Подождите некоторое время, чтобы мы исправили эту проблему или же сообщите нам о ней!',
      })
    }

    res.json({ tokenApi: user?.tokenApi })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

module.exports = router
