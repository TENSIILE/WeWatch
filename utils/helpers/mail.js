const nodemailer = require("nodemailer")

const fromPerson = '"WeWatch 👻" <wewatch.inc@mail.ru>'

const subjectMessage = {
    passwordRecovery: 'Восстановление пароля от аккаунта WeWatch',
    passwordСhanged: 'Изменился пароль от Вашего аккаунта WeWatch',
    dualAuthentication: 'WeWatch Secret | Ключ доступа!'
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

module.exports = {
    subjectMessage,
    sendMail
}