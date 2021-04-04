const { Router } = require('express')
const Room = require('../models/Room')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.post('/create', auth, async (req, res) => {
  try {
    const { title, party, securityKey, linkVideos, listLinkVideos } = req.body

    if (!title) {
      return res
        .status(400)
        .json({ message: 'Вы забыли указать название комнаты!' })
    }

    const room = new Room({
      owner: req.user.userId,
      title,
      party,
      securityKey,
      linkVideos,
      listLinkVideos,
    })

    await room.save()

    res.status(201).json({ message: 'Комната была создана!', roomId: room._id })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

router.get('/getMyRooms', auth, async (req, res) => {
  try {
    const myRooms = await Room.find({ owner: req.user.userId })

    res.json(myRooms)
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

router.get('/getRoomsJoined', auth, async (req, res) => {
  try {
    const rooms = await Room.find(null, (_, doc) => {
      return doc.filter(room => {
        return room.party.find(userId => userId === req.user.userId)
      })
    })

    res.json(rooms)
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

router.post('/join', auth, async (req, res) => {
  try {
    const { roomId, securityKey } = req.body

    const room = await Room.findById(roomId).catch(() => {
      return res.status(400).json({ message: 'Неверный ID комнаты!' })
    })

    const finded = room.party.find(userId => userId === req.user.userId)

    if (finded) {
      return res
        .status(302)
        .json({ message: 'Вы уже находитесь в данной комнате!' })
    }

    if (!!room.securityKey) {
      if (!securityKey) {
        return res.json({ message: 'Введите защитный ключ!', isSecurity: true })
      }

      if (room.securityKey === securityKey) {
        await Room.findByIdAndUpdate(
          { _id: roomId },
          { $push: { party: req.user.userId } },
          { new: true }
        )

        return res.json({
          message: 'Вы успешно присоединились к новой комнате!',
          done: true,
        })
      }

      return res.status(400).json({ message: 'Защитный ключ неверен!' })
    }

    await Room.findByIdAndUpdate(
      { _id: roomId },
      { $push: { party: req.user.userId } },
      { new: true }
    )

    res.json({
      message: 'Вы успешно присоединились к новой комнате!',
      done: true,
    })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

module.exports = router
