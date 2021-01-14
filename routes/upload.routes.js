const {Router} = require('express')
const config   = require('config')
const UserInfo = require('../models/UserInformation')
const Room     = require('../models/Room')
const Dialog   = require('../models/Dialog')
const multer   = require('../utils/multer.config')
const helpers  = require('../utils/helpers/helpers')
const auth     = require('../middleware/auth.middleware')

const router = Router()

const wrapperUploader = async (req, res, nameFieldToDB) => {
    let pathImage = helpers.replaceAll(req.file.path, "/\\/", '/')
    pathImage     = config.get('hostServer') + '/' + pathImage
    
    const updated = { [nameFieldToDB]: pathImage }

    try {
        
        await UserInfo.findOneAndUpdate(
            {user: req.body.userId},
            {$set: updated},
            {new: false}
        )

        res.json({ path: pathImage })

    } catch (e) {
        res.status(400).json({message: 'Не удалось загрузить картинку!'})
    }
}


const uploaderLogoRoom = async (req, res, nameFieldToDB) => {
    let pathImage = helpers.replaceAll(req.file.path, "/\\/", '/')
    pathImage     = config.get('hostServer') + '/' + pathImage
    
    const updated = { [nameFieldToDB]: pathImage }

    const room = await Room.findOne({ _id: req.query.roomId, owner: req.user.userId })

    if (!room) {
        return res.status(401).json({ message: 'Отказано в доступе!' })
    }

    try {

        await Room.findOneAndUpdate(
            {_id: req.query.roomId},
            {$set: updated},
            {new: false}
        )

        res.json({ message:'Аватарка для комнаты была успешно установлена!' })

    } catch (e) {
        res.status(400).json({ message: 'Не удалось загрузить картинку!' })
    }
}


const uploaderFilesInDialog = async (req, res) => {
    // Доделать(Переделать)!!!
    const wrap = async () => {
        let pathImage = helpers.replaceAll(req.file.path, "/\\/", '/')
        pathImage     = config.get('hostServer') + '/' + pathImage
    
        const dialog = await Dialog.findOne({ _id: req.query.dialogId })
    
        const findedMessage = dialog.messages.findIndex(message => message.messageId === req.query.messageId)

        if (findedMessage === -1) {
            return setTimeout(async () => await wrap(req, res), 1000)
        }
        
    
        const message = dialog.messages[findedMessage]

        message.attachments = [...message.attachments, pathImage] 

        console.log(message)
        
        const updated = { messages: [...dialog.messages, dialog.messages[findedMessage] = message]}
    
        try {
            await Dialog.findOneAndUpdate(
                {_id: req.query.dialogId},
                {$set: updated},
                {new: false}
            )
            res.json({ message:'Файл был успешно загружен!' })
        } catch (e) {
            res.status(400).json({ message: 'Не удалось загрузить файл!' })
        }
    }
    wrap()
}

const wrapperSavePath = async (req, res) => {
    const { path, field } = req.body

    const updated = { [field]: path }

    try {
        await UserInfo.findOneAndUpdate(
            {user: req.user.userId},
            {$set: updated},
            {new: false}
        )
        res.json({ done:true })
    } catch (e) {
        res.status(400).json({message: 'Не удалось загрузить картинку!'})
    }
}

router.post('/upload/avatar', auth, multer.multer(multer.multerConfig).single('avatar'), async (req, res) => {
    wrapperUploader(req, res, 'avatar')
})

router.post('/upload/header', auth, multer.multer(multer.multerConfig).single('header'), async (req, res) => {
    wrapperUploader(req, res, 'header')
})

router.post('/upload/logo_room', auth, multer.multer(multer.multerConfig).single('logo-room'), async (req, res) => {
    uploaderLogoRoom(req, res, 'logo')
})

router.post('/upload/dialogs', auth, multer.multer(multer.multerConfigDialog).single('file'), async (req, res) => {
    uploaderFilesInDialog(req, res)
})


router.post('/upload/savepath', auth, async (req, res) => {
    wrapperSavePath(req, res)
})

module.exports = router