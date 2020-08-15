const {Router} = require('express')
const config   = require('config')
const multer   = require('multer')
const UserInfo = require('../models/UserInformation')

const router = Router()

const replaceAll = (str, find, replace) => str.replace(new RegExp(find, 'g'), replace)

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

const wrapperUploader = async (req, res, nameFieldToDB) => {
    let pathImage = replaceAll(req.file.path, "/\\/", '/')
    pathImage = config.get('hostServer') + '/' + pathImage
    
    const updated = {
        [nameFieldToDB]: pathImage
    }

    try{
        await UserInfo.findOneAndUpdate(
            {user: req.query.userId},
            {$set: updated},
            {new: false}
        )
    }catch (e){
        res.status(400).json({message: 'Не удалось загрузить картинку!'})
    }
    res.redirect('back')
}

router.post('/upload/avatar', multer(multerConfig).single('avatar-input'), async (req, res) => {
    wrapperUploader(req, res, 'avatar')
})

router.post('/upload/header', multer(multerConfig).single('header-input'), async (req, res) => {
    wrapperUploader(req, res, 'header')
})

module.exports = router