const fs       = require('fs')
const path     = require('path')
const {Router} = require('express')
const Dialog   = require('../models/Dialog')
const User     = require('../models/User')
const auth     = require('../middleware/auth.middleware')

const router = Router()

router.post('/create', auth, async (req, res) => {
    try {
        const { partner }  = req.body

        const user         = await User.findById(req.user.userId)
        
        const friendFinded = user.friends.find(friend_id => friend_id === partner)

        if (!friendFinded) return res.status(403).json({ message: 'Данный пользователь не состоит у Вас в друзьях!' })

        const isExistsDialogAuthor  = await Dialog.find({ author: req.user.userId, partner })
        const isExistsDialogPartner = await Dialog.find({ author: partner, partner: req.user.userId })

        if (!!isExistsDialogAuthor.length || !!isExistsDialogPartner.length) {
            return res.status(208).json({ message: 'Данный диалог уже существует!', dialogId: isExistsDialogAuthor[0]._id })
        }

        const dialog = new Dialog({ author: req.user.userId, partner })
        
        await dialog.save()
        
        const dir             = path.join(__dirname, '../upload/dialogs')
        const dialogueFolders = ['audios', 'videos', 'documents','images']

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }

        fs.mkdirSync(`${dir}/${dialog._id}`)

        dialogueFolders.forEach(nameFolder => {
            if (!fs.existsSync(`${dir}/${dialog._id}/${nameFolder}`)) {
                fs.mkdirSync(`${dir}/${dialog._id}/${nameFolder}`)
            }
        })

        res.status(201).json({ dialogId: dialog._id })

    } catch (e) {
        res.status(500).json({ message:'Произошла ошибка, попробуйте снова!' })
    }
})


router.get('/getAllDialogs', auth, async (req, res) => {
    try {
        let myAuthorDialog  = await Dialog.find({ author: req.user.userId })
        let myPartnerDialog = await Dialog.find({ partner: req.user.userId })
        
        const dialogs = [...myAuthorDialog, ...myPartnerDialog]
        
        res.json(dialogs)

    } catch (e) {
        res.status(500).json({ message:'Произошла ошибка, попробуйте снова!' })
    }
})


module.exports = router