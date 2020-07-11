const nodemailer = require("nodemailer")

export const sendMessageToMail = async email => {
    const fromPerson = '"WeWatch 👻" <wewatch.inc@mail.ru>'

    const subjectMessage = {
        passwordRecovery: 'Восстановление пароля от аккаунта WeWatch'
    }
     
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
        subject: email.subject,
        text: email.text, 
        html: email.html
    })
}