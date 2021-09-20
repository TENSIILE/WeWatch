import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4, v5 as uuidv5, v1 as uuidv1 } from 'uuid'
import { ContextChat } from '../../../../contexts/contextChat'
import { ContextMain } from '../../../../contexts/mainPage/contextMain'
import { ContextAuth } from '../../../../contexts/contextAuth'
import { ContextGetInfo } from '../../../../contexts/contextGetInfo'

import { socketsClient } from '../../../../sockets/sockets'
import { debounce, loader } from '../../../../utils/functions'
import { Racker } from '../../../../utils/encoder'
import { uploaderFiles, compareDates } from '../../../../utils/functions'

import {
  DIALOG__SEND_MESSAGE,
  DIALOG__MESSAGE_READ,
  DIALOG__TYPING,
  DIALOG__TYPING_STOP,
} from '../../../../types/socket'

export const LogicChat = ({ children }) => {
  const { infoUserDialogs } = useContext(ContextMain)
  const { userId } = useContext(ContextAuth)
  const { listRequestFriends, infoUser } = useContext(ContextGetInfo)

  const httpParams = useParams()

  const [visibleSidebar, setVisibleSidebar] = useState(false)
  const [visiblePicker, setVisiblePicker] = useState(false)
  const [urlParams, setUrlParams] = useState({})
  const [currentDialog, setCurrentDialog] = useState({})

  const [messages, setMessages] = useState([])

  const [textInput, setTextInput] = useState('')

  const wrapperMessagesDivRef = useRef()
  const [showBtnScroll, setShowBtnScroll] = useState(null)
  const [countUnreadMsg, setCountUnreadMsg] = useState(0)

  const [isShowChatAct, setIsShowChatAct] = useState(false)
  const [usernameChatAct, setUsernameChatAct] = useState('')

  const counterChatAct = useRef(0)

  const [imagesUpload, setImagesUpload] = useState([])
  const [videosUpload, setVideosUpload] = useState([])
  const [audiosUpload, setAudiosUpload] = useState([])
  const [documentsUpload, setDocumentsUpload] = useState([])

  const [isEmptyUploader, setIsEmptyUploader] = useState(false)

  const [combinedFiles, setCombinedFiles] = useState([])

  const [pathImages, setPathImages] = useState([])

  const dateOne = useRef('')
  const isRender = useRef(true)

  const isCheckEmptyAttachedFiles = () => {
    return (
      imagesUpload.length ||
      videosUpload.length ||
      audiosUpload.length ||
      documentsUpload.length
    )
  }

  useEffect(() => {
    setIsEmptyUploader(isCheckEmptyAttachedFiles())

    setCombinedFiles([
      ...imagesUpload,
      ...videosUpload,
      ...audiosUpload,
      ...documentsUpload,
    ])
  }, [imagesUpload, videosUpload, audiosUpload, documentsUpload])

  useEffect(() => {
    onControllerHeightBlocks(isEmptyUploader)
  }, [isEmptyUploader])

  useEffect(() => {
    const wrap = async () => {
      await loader(socketsClient.socket, wrap, 1000)

      socketsClient.socket.on(DIALOG__TYPING, ({ username }) => {
        setIsShowChatAct(true)
        setUsernameChatAct(username + ' печатает сообщение...')
      })

      socketsClient.socket.on(DIALOG__TYPING_STOP, () => {
        setIsShowChatAct(false)
        setTimeout(() => setUsernameChatAct(''), 4500)
      })

      return () => {
        socketsClient.socket.off(DIALOG__TYPING)
        socketsClient.socket.off(DIALOG__TYPING_STOP)
      }
    }
    wrap()
  }, [])

  useEffect(() => {
    const wrap = async () => {
      setUrlParams(httpParams)

      let findedDialog = infoUserDialogs.find(
        dialog => dialog._id === httpParams.id
      )

      if (typeof findedDialog === 'undefined') {
        findedDialog = {}
      } else {
        setCurrentDialog(findedDialog)
        setMessages(findedDialog.messages)
      }
    }
    wrap()
  }, [httpParams, infoUserDialogs, listRequestFriends])

  useEffect(() => {
    const wrap = async () => {
      await loader(currentDialog, wrap, 500)
      socketsClient.socket.emit(DIALOG__MESSAGE_READ, {
        dialogId: currentDialog._id,
        userId,
      })
    }
    wrap()
  }, [currentDialog])

  const onControllerHeightBlocks = isOpen => {
    if (isOpen && wrapperMessagesDivRef.current) {
      wrapperMessagesDivRef.current.parentNode.style.height =
        'calc(100% - 325px)'
    } else if (wrapperMessagesDivRef.current) {
      wrapperMessagesDivRef.current.parentNode.style.height =
        'calc(100% - 175px)'
    }
  }

  const onRemoveAttachedFiles = id => {
    const deletes = file => file.name + '/' + file.type !== id

    setCombinedFiles(combinedFiles.filter(file => deletes(file)))

    String(id).includes('image') &&
      setImagesUpload(imagesUpload.filter(file => deletes(file)))
    String(id).includes('audio') &&
      setAudiosUpload(audiosUpload.filter(file => deletes(file)))
    String(id).includes('video') &&
      setVideosUpload(videosUpload.filter(file => deletes(file)))
    setDocumentsUpload(documentsUpload.filter(file => deletes(file)))
  }

  const onRemoveAllAttachedFiles = () => {
    setCombinedFiles([])
    setImagesUpload([])
    setAudiosUpload([])
    setVideosUpload([])
    setDocumentsUpload([])
  }

  const toggleVisiblePicker = useCallback(
    () => setVisiblePicker(!visiblePicker),
    [visiblePicker]
  )

  const onSelectEmoji = useCallback(
    emoji => {
      setTextInput(textInput.concat(' ', emoji.colons))
    },
    [textInput, setTextInput]
  )

  const onInputMessage = useCallback(
    async e => {
      setTextInput(e.target.value)
      socketsClient.socket.emit(DIALOG__TYPING, {
        username:
          infoUser.userAdditional.name + ' ' + infoUser.userAdditional.lastname,
        dialogId: currentDialog._id,
      })

      let countLocal = ++counterChatAct.current

      const time = setTimeout(() => {
        if (countLocal === counterChatAct.current) {
          socketsClient.socket.emit(DIALOG__TYPING_STOP, {
            dialogId: currentDialog._id,
          })
        } else clearTimeout(time)
      }, 2000)
    },
    [
      textInput,
      setTextInput,
      infoUser,
      socketsClient,
      counterChatAct,
      combinedFiles,
    ]
  )

  const onSendMessage = async (e, checkOnPush = true) => {
    if (!!textInput.trim() || isCheckEmptyAttachedFiles()) {
      if (checkOnPush) {
        if (e.key === 'Enter') await onSocketSenderMessage()
      } else await onSocketSenderMessage()
    }
  }

  const onAwaitLoadedAttachments = async () => {
    const arrayPromises = []

    combinedFiles.forEach(async file => {
      arrayPromises.push(uploaderFiles.call(this, file, currentDialog._id))
    })

    const res = await Promise.all(arrayPromises)

    setPathImages(res)
  }

  useEffect(() => {
    const wrap = async () => {
      if (!socketsClient.socket) return

      const messageId = uuidv5(uuidv1(), uuidv4()) + Racker.addSalt()

      const objMessage = {
        messageId,
        author: userId,
        create_at: new Date().toUTCString(),
        text: textInput,
        isReaded: false,
        attachments: pathImages,
      }

      console.log(currentDialog._id)

      socketsClient.socket.emit(DIALOG__SEND_MESSAGE, {
        dialogId: currentDialog._id,
        objMessage,
      })

      setTextInput('')
      onRemoveAllAttachedFiles()
      setMessages([...messages, objMessage])
    }
    wrap()
  }, [pathImages])

  const onSocketSenderMessage = async () => {
    socketsClient.socket.emit(DIALOG__MESSAGE_READ, {
      dialogId: currentDialog._id,
      userId,
    })

    await onAwaitLoadedAttachments()
  }

  const goDown = useCallback(() => {
    if (wrapperMessagesDivRef.current !== null) {
      wrapperMessagesDivRef.current.scrollTo(
        0,
        wrapperMessagesDivRef.current.scrollHeight
      )
    }
  }, [wrapperMessagesDivRef])

  const checkPositionScroll = debounce(() => {
    if (
      wrapperMessagesDivRef.current?.scrollHeight -
        wrapperMessagesDivRef.current?.offsetHeight -
        wrapperMessagesDivRef.current?.scrollTop >
      20
    ) {
      setShowBtnScroll(true)
    } else setShowBtnScroll(false)
  }, 500)

  const renderStickyDate = (datetime1, datetime2) => {
    if (!compareDates(datetime1, datetime2) || isRender.current) {
      isRender.current = false
      dateOne.current = datetime1

      return true
    } else {
      if (!compareDates(datetime1, dateOne.current)) {
        isRender.current = true
      }
    }

    return false
  }

  const parserLinks = message => {
    const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g

    const prefix = ['https://', 'http://']

    if (pattern.test(message)) {
      const arrayMessage = message.split(' ')

      return joinArrayWithObject(
        arrayMessage.map(link => {
          if (link.includes(prefix[0]) || link.includes(prefix[1])) {
            return (
              <a
                key={link + Math.random()}
                href={link}
                rel='noopener noreferrer'
                target='_blank'
              >
                {link}
              </a>
            )
          }
          return link
        })
      )
    }

    return message
  }

  const joinArrayWithObject = array => {
    const insert = (array, index, item) => {
      return array.splice(index, 0, item)
    }

    const indexObjs = array
      .map(el => el === Object(el) && array.indexOf(el))
      .filter(el => typeof el === 'number')

    const clearArray = array
      .filter(el => el !== Object(el))
      .join(' ')
      .split()

    indexObjs.map(index => {
      insert(clearArray, index, array[index])
    })

    return clearArray.filter(Boolean)
  }

  return (
    <ContextChat.Provider
      value={{
        visibleSidebar,
        setVisibleSidebar,
        urlParams,
        currentDialog,
        onSendMessage,
        textInput,
        setTextInput,
        messages,
        setMessages,
        wrapperMessagesDivRef,
        goDown,
        showBtnScroll,
        checkPositionScroll,
        visiblePicker,
        toggleVisiblePicker,
        onSelectEmoji,
        countUnreadMsg,
        setCountUnreadMsg,
        onInputMessage,
        isShowChatAct,
        usernameChatAct,
        imagesUpload,
        setImagesUpload,
        combinedFiles,
        onRemoveAttachedFiles,
        isEmptyUploader,
        videosUpload,
        audiosUpload,
        documentsUpload,
        setAudiosUpload,
        setVideosUpload,
        setDocumentsUpload,
        renderStickyDate,
        parserLinks,
      }}
    >
      {children}
    </ContextChat.Provider>
  )
}
