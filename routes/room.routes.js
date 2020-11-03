const {Router} = require('express')
const Room     = require('../models/Room')
const auth     = require('../middleware/auth.middleware')

const router = Router()

router.post('/create', async (req, res) => {
    try{
        
        const { owner, title, party, securityKey, linkVideos, listLinkVideos } = req.body

        const room = new Room({ owner, title, party, securityKey, linkVideos, listLinkVideos })
        
        await room.save()

        res.status(201).json({ message: 'Комната была создана!', roomId: room._id })

    } catch (e) {
        res.status(500).json({ message:'Произошла ошибка, попробуйте снова!' })
    }
})

router.get('/getMyRooms', auth, async (req, res) => {
    try {
        
        const myRooms = await Room.find({ owner: req.user.userId })

        res.json( myRooms )

    } catch (e) {
        res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
    }
})

module.exports = router