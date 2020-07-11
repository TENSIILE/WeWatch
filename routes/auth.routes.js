const {Router} = require('express')
const bcrypt   = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt      = require('jsonwebtoken')
const User     = require('../models/User')
const config   = require('config')


const router = Router()


// api/auth
router.post('/register',
    [
        check('login', 'Некорректный логин').isLength({ min: 3 }),
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля составляет 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            
            const error = validationResult(req)

            if(!error.isEmpty()){
                return res.status(400).json({ 
                    errors: error.array(), 
                    message: "Некорректные данные при регистрации" 
                })
            }

            const {login, email, password} = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message:'Такой пользователь уже существует!' })
            }
    
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, login, password: hashedPassword})

            await user.save()

            res.status(201).json({ message: 'Пользователь создан' })

        } catch (e) {
            res.status(500).json({message: 'Произошла ошибка, попробуйте снова!'})
        }
    }
)

// api/auth/login
router.post('/login',
    [
        check('login', 'Введите корректный логин').isLength({ min: 3 }).exists(),
        check('password', 'Введите корректный пароль').isLength({ min: 6 }).exists()
    ],    
    async (req, res) => {
        try {
            const error = validationResult(req)

            if (!error.isEmpty()) {
                return res.status(400).json({ 
                    errors: error.array(), 
                    message: "Некорректные данные при авторизации" 
                })
            }

            const { login, password } = req.body

            const user = await User.findOne({ login })

            if (!user) {
                return res.status(400).json({ message: 'Такого пользователя не существует!' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова!' })
            }

            const token = jwt.sign(
                { userId: user._id },
                config.get('jwtSecret'),
                { expiresIn:'1h' }
            )
            
            res.json({ token, userId: user._id })

        } catch (e) {
            res.status(500).json({message: 'Произошла ошибка, попробуйте снова!'})
        }
    }
)

module.exports = router