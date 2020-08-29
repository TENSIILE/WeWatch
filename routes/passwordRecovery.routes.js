const {Router}   = require('express')
const nodemailer = require("nodemailer")
const User       = require('../models/User')
const bcrypt     = require('bcryptjs')

const router = Router()

const fromPerson = '"WeWatch 👻" <wewatch.inc@mail.ru>'

const subjectMessage = {
    passwordRecovery: 'Восстановление пароля от аккаунта WeWatch'
}

const sendMail = async (subjectMail, email) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
            user: "wewatch.inc@mail.ru", 
            pass: "messenger2020",
        },
        
    }, {
        from: 'Mailer WeWatch <wewatch.inc@mail.ru>'
    })

    await transporter.sendMail({
        from: fromPerson,
        to: email.to, 
        subject: subjectMail,
        text: email.text, 
        html: email.html
    })

    return true
}

const generateKeys = len => {
    const symbols  = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let password   = ""
    for (let i = 0; i < len; i++) {
        password += symbols.charAt(Math.floor(Math.random() * symbols.length)) 
    }
    return password
}

const clearingKeys = email => {
    setTimeout(async () => {
        await User.findOneAndUpdate(
            { email },
            { $set: { recoveryCode: "" } },
            { new: false }
        )
    }, 300_000)
}

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
                В целях обеспечения безопасности код станет недействительным через 5 минут.
                    <br/>
                    <br/>
                Благодарим за внимание,
                    <br/>
                    <br/>
                Команда WeWatch</p>`

        sendMail(subjectMessage.passwordRecovery, {
            to: email,
            text: '',
            html: messageHTML
        })

        await User.findOneAndUpdate(
            { email },
            { $set: { recoveryCode: newKey } },
            { new: false }
        )
    
        res.json({ message: 'Ключ восстановления пароля был выстан на почту!' })
        
        clearingKeys(email)

    } catch (e) {
        res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
    }
})

router.post('/keyVerification', async (req, res) => {
    try {

        const { email, key } = req.body

        const user = await User.findOne({ email })

        if (user.recoveryCode === key) {

            res.json({ message:'Ключи совпали!' })

        } else {
            throw new Error('Ключи не совпадают!')
        }

    } catch (e) {
        res.status(500).json({ message: e.message ? e.message : 'Произошла ошибка, попробуйте снова!' })
    }
})

router.post('/AssigningNewPassword', async (req, res) => {
    try {
        
        const { email, new_password } = req.body

        const hashedPassword = await bcrypt.hash(new_password, 12)

        await User.findOneAndUpdate(
            { email },
            { $set: { password: hashedPassword } },
            { new: false }
        )

        res.json({ message: 'Пароль в учетной записи WeWatch был успешно изменен!' })

    } catch (e) {
        res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
    }
})

module.exports = router