const {Router} = require('express')
const config   = require('config')
const multer   = require('multer')

const router = Router()

const multerConfig = {
    storage: multer.diskStorage({
        destination: (req, file, next) => {
            next(null, './upload/image')
        },
        filename: (req, file, next) => {
            const ext = file.mimetype.split('/')[1]
            next(null, file.originalname + '-' + Date.now() + '.' + ext)
        },
        fileFilter: (req, file, next) => {
            if (!file) {
                next(null, true)
            }
        }
    })
}

router.post('/upload', multer(multerConfig).single('avatar-input'), (req, res) => {
    console.log(req.file)
    res.redirect(config.get('hostClient') + '/profile')
})


module.exports = router