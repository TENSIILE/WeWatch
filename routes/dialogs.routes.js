const {Router} = require('express')
const Dialog   = require('../models/Dialog')
const UserInfo = require('../models/UserInformation')
const User     = require('../models/User')
const auth     = require('../middleware/auth.middleware')

const router = Router()

router.post('/create', auth, async (req, res) => {
    try{
        
        const { partner } = req.body

        const userDataAuthor = await User.findById(req.user.userId)
        const dataAuthor     = await UserInfo.findOne({ user: userDataAuthor._id })

        const userDataPartner = await User.findById(partner)
        const dataPartner     = await UserInfo.findOne({ user: userDataPartner._id })
        
        const fullnamePartner = dataPartner.name + ' ' + dataPartner.lastname
        const fullnameAuthor  = dataAuthor.name  + ' ' + dataAuthor.lastname

        const isExistsDialogAuthor  = await Dialog.find({author: req.user.userId, partner})
        const isExistsDialogPartner = await Dialog.find({author: partner, partner: req.user.userId})

        if (!!isExistsDialogAuthor.length || !!isExistsDialogPartner.length) {
            return res.status(208).json({ message: 'Данный диалог уже существует!', dialogId: isExistsDialogAuthor[0]._id })
        }

        const dialog = new Dialog({ author: req.user.userId, partner, fullnamePartner, fullnameAuthor })
        
        await dialog.save()

        res.status(201).json({ dialogId: dialog._id })

    } catch (e) {
        res.status(500).json({ message:'Произошла ошибка, попробуйте снова!' })
    }
})

router.get('/getAllDialogs', auth, async (req, res) => {
    try {
        let myAuthorDialog  = await Dialog.find({author: req.user.userId})
        let myPartnerDialog = await Dialog.find({partner: req.user.userId})

        const dialogs = [...myAuthorDialog, ...myPartnerDialog]
        
        res.json(dialogs)

    } catch (e) {
        res.status(500).json({ message:'Произошла ошибка, попробуйте снова!' })
    }
})


module.exports = router