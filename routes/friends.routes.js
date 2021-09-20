const { Router } = require('express')
const User = require('../models/User')
const UserInfo = require('../models/UserInformation')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.post('/request', auth, async (req, res) => {
  try {
    const { toUser, fromUser } = req.body

    const senderUser = await User.findOne({ _id: fromUser })
    const recipientUser = await User.findOne({ _id: toUser })

    const data = {
      friendRequestList: [
        ...new Set([...recipientUser.friendRequestList, senderUser._id]),
      ],
    }
    const myData = {
      myFriendRequestList: [
        ...new Set([...senderUser.myFriendRequestList, recipientUser._id]),
      ],
    }

    try {
      await User.findOneAndUpdate(
        { _id: recipientUser._id },
        { $set: data },
        { new: false }
      )

      await User.findOneAndUpdate(
        { _id: senderUser._id },
        { $set: myData },
        { new: false }
      )
    } catch (e) {
      res.status(500).json({ message: 'Не удалось сделать запрос в друзья!' })
    }

    res.json({ message: 'Запрос в друзья был успешно выполнен!' })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

router.post('/accept', auth, async (req, res) => {
  try {
    const { toUser, fromUser } = req.body

    const adoptedUser = await User.findOne({ _id: fromUser })
    const recipientUser = await User.findOne({ _id: toUser })

    const candidate = adoptedUser.friendRequestList.find(req => req === toUser)

    if (!candidate) {
      return res
        .status(403)
        .json({
          message: 'Невозможно добавить человека в друзья без его согласия!',
        })
    }

    const dataAdopted = {
      friends: [...new Set([...adoptedUser.friends, recipientUser._id])],
      friendRequestList: adoptedUser.friendRequestList.filter(
        friend => friend.toString() !== recipientUser._id.toString()
      ),
    }

    const dataRecipient = {
      friends: [...new Set([...recipientUser.friends, adoptedUser._id])],
      myFriendRequestList: recipientUser.myFriendRequestList.filter(
        friend => friend.toString() !== adoptedUser._id.toString()
      ),
    }

    await User.findByIdAndUpdate(
      { _id: recipientUser._id },
      { $set: dataRecipient },
      { new: false }
    )

    await User.findByIdAndUpdate(
      { _id: adoptedUser._id },
      { $set: dataAdopted },
      { new: false }
    )

    res.json({ message: 'Пользователь был успешно добавлен в друзья!' })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

router.post('/request/delete', auth, async (req, res) => {
  try {
    const { userId, toUser, typeRequestFriend } = req.body

    const user = await User.findOne({ _id: userId })
    const userStranger = await User.findOne({ _id: toUser })

    if (typeRequestFriend === 'other') {
      const data = user.friendRequestList.filter(
        friend => friend.toString() !== userStranger._id.toString()
      )
      const result = { friendRequestList: data }

      const senderData = userStranger.myFriendRequestList.filter(
        friend => friend.toString() !== user._id.toString()
      )
      const resultSender = { myFriendRequestList: senderData }

      await User.findByIdAndUpdate(
        { _id: user._id },
        { $set: result },
        { new: false }
      )

      await User.findByIdAndUpdate(
        { _id: userStranger._id },
        { $set: resultSender },
        { new: false }
      )

      res.json({ message: 'Заявка в друзья была успешно отклонена!' })
    } else {
      const data = user.myFriendRequestList.filter(
        friend => friend.toString() !== userStranger._id.toString()
      )
      const result = { myFriendRequestList: data }

      const dataStranger = userStranger.friendRequestList.filter(
        friend => friend.toString() !== user._id.toString()
      )
      const resultForStranger = { friendRequestList: dataStranger }

      await User.findByIdAndUpdate(
        { _id: user._id },
        { $set: result },
        { new: false }
      )

      await User.findByIdAndUpdate(
        { _id: userStranger._id },
        { $set: resultForStranger },
        { new: false }
      )

      res.json({ message: 'Ваша заявка в друзья была успешно отменена!' })
    }
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

router.get('/listRequestFriends', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId })
    const listRequestFriend = await User.find({ _id: user.friendRequestList })
    const myListRequestFriend = await User.find({
      _id: user.myFriendRequestList,
    })
    const userFriendsList = await User.find({ _id: user.friends })

    const listSubscribers = []
    const listMyRequestFriend = []

    const listMyFriends = []

    for (const itemUser of listRequestFriend) {
      listSubscribers.push(...(await UserInfo.find({ user: itemUser._id })))
    }

    for (const itemUser of myListRequestFriend) {
      listMyRequestFriend.push(...(await UserInfo.find({ user: itemUser._id })))
    }

    for (const itemUser of userFriendsList) {
      listMyFriends.push(...(await UserInfo.find({ user: itemUser._id })))
    }

    res.json({
      list: listSubscribers,
      listMyRequestFriend,
      userFriends: listMyFriends,
    })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

router.post('/remove', auth, async (req, res) => {
  try {
    const { friendId } = req.body
    const userId = req.user.userId

    const user = await User.findById(userId)
    const userFriend = await User.findById(friendId)

    const dataUser = user.friends.filter(
      friend => friend.toString() !== userFriend._id.toString()
    )
    const result = { friends: dataUser }

    const dataFriend = userFriend.friends.filter(
      friend => friend.toString() !== user._id.toString()
    )
    const resultFriend = { friends: dataFriend }

    await User.findByIdAndUpdate(
      { _id: user._id },
      { $set: result },
      { new: false }
    )

    await User.findByIdAndUpdate(
      { _id: userFriend._id },
      { $set: resultFriend },
      { new: false }
    )

    res.json({ message: 'Друг был успешно удалён!' })
  } catch (e) {
    res.status(500).json({ message: 'Произошла ошибка, попробуйте снова!' })
  }
})

module.exports = router
