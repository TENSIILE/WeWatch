const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth.middleware')

const router = Router()

const { sendMail, subjectMessage } = require('../utils/helpers/mail')
const { generateKeys, clearingKeys } = require('../utils/helpers/helpers')

router.post('/getKeyByMail', async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Такой почты не существует!' })
    }

    const newKey = generateKeys(16)

    const messageHTML = `
            <h2>Здравствуйте, ${user.login}!</h2>
            <p>Это ваш код безопасности для восстановления пароля в учетной записи WeWatch:
                <br/>
            <h3>Код: <strong>${newKey}</strong></h3>
                <br/>
            Он необходим для подтверждения, что владельцем учетной записи являетесь именно вы.
                <br/>
                <br/>
            В целях обеспечения безопасности код станет недействительным через 3 минуты.
                <br/>
                <br/>
            Благодарим за внимание,
                <br/>
                <br/>
            Команда WeWatch</p>
        `

    sendMail(subjectMessage.passwordRecovery, {
      to: email,
      text: '',
      html: messageHTML,
    })

    await User.findOneAndUpdate(
      { email },
      { $set: { recoveryCode: newKey } },
      { new: false }
    )

    res.json({ message: 'Ключ восстановления пароля был отправлен на почту!' })

    clearingKeys(async () => {
      await User.findOneAndUpdate(
        { email },
        { $set: { recoveryCode: '' } },
        { new: false }
      )
    })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

router.post('/keyVerification', async (req, res) => {
  try {
    const { email, key } = req.body

    const user = await User.findOne({ email })

    if (user.recoveryCode === key) {
      return res.json({ message: 'Ключи совпали!' })
    }

    throw new Error('Ключи не совпадают!')
  } catch (e) {
    res.status(500).json({
      message: e.message ? e.message : 'Произошла ошибка, попробуйте снова!',
    })
  }
})

router.post('/assigningNewPassword', async (req, res) => {
  try {
    let { email, new_password } = req.body

    const hashedPassword = await bcrypt.hash(new_password, 12)

    if (!email)
      return res.status(400).json({ message: 'Вы не указали свою почту!' })

    if (new_password.length < 8)
      return res.status(400).json({
        message:
          'Вы ввели легкий пароль, необходимо ввести пароль больше 7 символов!',
      })

    await User.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: false }
    )

    const user = await User.findOne({ email })

    const messageHTML = `
            <h2>Приветствую, ${user.login}!</h2>
            <p>Ваш пароль был успешно изменен <strong>${new Date().toLocaleString()}</strong>.
                <br/>
            Благодарим за внимание,
                <br/>
                <br/>
            Команда WeWatch</p>
        `

    sendMail(subjectMessage.passwordСhanged, {
      to: user.email,
      text: '',
      html: messageHTML,
    })

    res.json({
      message: 'Пароль к учетной записи WeWatch был успешно изменён!',
    })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

router.post('/assigningNewPasswordFromAccount', auth, async (req, res) => {
  try {
    let { new_password } = req.body

    if (new_password.length < 8)
      return res.status(400).json({
        message:
          'Вы ввели легкий пароль, необходимо ввести пароль больше 7 символов!',
      })

    const hashedPassword = await bcrypt.hash(new_password, 12)

    await User.findOneAndUpdate(
      { _id: req.user.userId },
      { $set: { password: hashedPassword } },
      { new: false }
    )

    const user = await User.findById(req.user.userId)

    const messageHTML = `
            <h2>Приветствую, ${user.login}!</h2>
            <p>Ваш пароль был успешно изменен <strong>${new Date().toLocaleString()}</strong>.
                <br/>
            Благодарим за внимание,
                <br/>
                <br/>
            Команда WeWatch</p>
        `

    sendMail(subjectMessage.passwordСhanged, {
      to: user.email,
      text: '',
      html: messageHTML,
    })

    res.json({
      message: 'Пароль к учетной записи WeWatch был успешно изменен!',
    })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

module.exports = router
