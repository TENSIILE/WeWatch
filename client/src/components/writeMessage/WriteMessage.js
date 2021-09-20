import React, { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { Picker } from 'emoji-mart'
import classnames from 'classnames'
import { Input } from '../input/Input'
import { SliderHorizontal } from '../sliderHorizontal/SliderHorizontal'
import { AttachedFile } from '../sliderHorizontal/parts/attachedFile/AttachedFile'
import { Contextmenu } from '../contextmenu/Contextmenu'
import { ContextChat } from '../../contexts/contextChat'
import { ContextConMenu } from '../../contexts/contextmenu/contextConMenu'
import { determiningFileSize } from '../../utils/functions'
import icoSend from '../../static/icons/sendMessage.svg'
import attachments from '../../static/icons/to-attach.svg'
import smile from '../../static/icons/smileys.svg'
import 'emoji-mart/css/emoji-mart.css'
import './writeMessage.scss'

export const WriteMessage = () => {
  const logicChat = useContext(ContextChat)
  const contextmenu = useContext(ContextConMenu)

  return (
    <div className='im-chat-input'>
      <div className='im-chat-wrapper'>
        <SliderHorizontal
          newClass='attachmented-files'
          isVisible={!!logicChat.isEmptyUploader}
        >
          {logicChat.combinedFiles &&
            logicChat.combinedFiles.map((file, i) => {
              return (
                <AttachedFile
                  key={file.toString() + i}
                  img={URL.createObjectURL(file)}
                  title={file.name}
                  size={determiningFileSize(file.size)}
                  type={file.type}
                />
              )
            })}
        </SliderHorizontal>
        <div className='management-my-message'>
          <div className='input-attachments'>
            <ReactSVG
              src={attachments}
              className='react-svg attachments-files'
              onClick={() => contextmenu.show('attachmentDataMessage')}
            />
            <Contextmenu
              view={'attachment-data-message'}
              open={contextmenu.visible.attachmentDataMessage}
            />
          </div>
          <Input
            isWithButton={true}
            icon={icoSend}
            newClass='grey-background text-message'
            parentClass='btn-mess-send'
            placeholder='Напишите сообщение...'
            value={logicChat.textInput}
            onChange={logicChat.onInputMessage}
            onKeyDown={logicChat.onSendMessage}
            onClick={e => logicChat.onSendMessage(e, false)}
          />
          <ReactSVG
            src={smile}
            className='react-svg smile'
            onClick={logicChat.toggleVisiblePicker}
          />

          <div
            className={classnames('picker', {
              visible: logicChat.visiblePicker,
            })}
          >
            <Picker
              set='twitter'
              onSelect={logicChat.onSelectEmoji}
              showPreview={false}
              showSkinTones={false}
            />
          </div>
        </div>
        <p
          className={classnames('notification', {
            visible: logicChat.isShowChatAct,
          })}
        >
          {logicChat.usernameChatAct}
        </p>
      </div>
    </div>
  )
}
