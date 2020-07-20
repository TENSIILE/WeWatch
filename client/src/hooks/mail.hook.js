const nodemailer = require("nodemailer")

export const useSendMail = () => {
    const fromPerson = '"WeWatch 👻" <wewatch.inc@mail.ru>'

    const subjectMessage = {
        passwordRecovery: 'Восстановление пароля от аккаунта WeWatch'
    }

    const sendMail = async (email, subjectMail) => {
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
    }
    

    return { subjectMessage, sendMail }
}