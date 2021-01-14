import React, { useState, useContext, useRef } from 'react'
import { useHttp } from '../../../../hooks/http.hook'
import { ContextAlert }  from '../../../../contexts/alert/contextAlert'
import { ContextCreatingRoom } from '../../../../contexts/contextCreatingRoom'
import { ContextGetInfo } from '../../../../contexts/contextGetInfo'
import { ContextConMenu } from '../../../../contexts/contextmenu/contextConMenu'
import { ContextAuth } from '../../../../contexts/contextAuth'
import { generateRandomKeys } from '../../../../utils/functions'

import config from '../../../../config.json'

export const LogicCreatingRoom = ({ children }) => {
    const alert              = useContext(ContextAlert)
    const auth               = useContext(ContextAuth)
    const contextmenu        = useContext(ContextConMenu)
    const { 
        listRequestFriends,
        rerender,
        setRerender }        = useContext(ContextGetInfo)
    const { request }        = useHttp()

    const [valuesInputs, setValuesInputs] = useState({
        nameRoom: '', textSecurityKey: '', linkToVideo: '',
        linksToAllVideo: ''
    })

    const [successEdit, setSuccessEdit] = useState(false)
    const [urlLogoRoom, setUrlLogoRoom] = useState('')

    const [checkboxSecurityKey, setCheckboxSecuritykey] = useState(false)
    const [checkboxReadyLinks, setCheckboxReadyLinks]   = useState(false)

    const [listAddedFriends, setListAddedFriends]        = useState([])
    const [listAllLinksToVideos, setListAllLinkToVideos] = useState([])

    const idListLinks   = useRef(0)
    const refUploadLogo = useRef(null)

    const setInputsForm = e => {
        setValuesInputs({
            ...valuesInputs, 
            [e.target.name]: e.target.value
        })
    }

    const appendToListAllLinksToVideos = e => {
        if (e.key === 'Enter') {
            try {
                const finded = listAllLinksToVideos.find(({ link }) => link === valuesInputs.linksToAllVideo)
                
                if (finded) throw new Error('Такое видео уже было добавлено!')
                
            } catch(e) {
                return alert.show('danger', e.message, 'Ошибка')
            }

            setListAllLinkToVideos([...listAllLinksToVideos, {
                id: idListLinks.current,
                link: valuesInputs.linksToAllVideo,
                img: `//img.youtube.com/vi/${getPreviewFromLink('linksToAllVideo')}/maxresdefault.jpg`
            }])

            idListLinks.current++
            
            setValuesInputs({ ...valuesInputs, linksToAllVideo: '' })
        }
    }

    const deleteFromListAllLinksToVideos = link_video => {
        setListAllLinkToVideos(listAllLinksToVideos.filter(link => link.link !== link_video))
    }

    const getPreviewFromLink = (input = 'linkToVideo') => {
        return valuesInputs[input].split('?v=')[1]
    }

    const acceptSecurityKey = () => {
        if (!!valuesInputs.textSecurityKey) {
            setSuccessEdit(!successEdit)
        } else {
            alert.show('warning', 'Вы забыли установить пароль для вашей будущей комнаты!', 'Ошибка!')
        }
    }

    const pasteToTextSecurityKey = () => {
        setValuesInputs({
            ...valuesInputs, 
            textSecurityKey: generateRandomKeys()
        })
    }

    const uploadLogoRoomLocal = e => {
        try {
            const file = e.target.files[0]
            const url  = URL.createObjectURL(file)
            
            setUrlLogoRoom(url)
        } catch (e) {}
    }

    const changeCheckboxSecurityKey = () => {
        setCheckboxSecuritykey(!checkboxSecurityKey)
        
        if (!checkboxSecurityKey) {
            setValuesInputs({
                ...valuesInputs, 
                textSecurityKey: ''
            })
            setSuccessEdit(false)
        }
    }
    
    const changeCheckboxReadyLinks = () => setCheckboxReadyLinks(!checkboxReadyLinks)

    const inviteFriends = friend => {
        setListAddedFriends([...listAddedFriends, friend])
        contextmenu.hide('addFriendToRoom')
    }

    const kickOutFromRoom = friend => {
        setListAddedFriends(listAddedFriends.filter(f => f.user !== friend.user))
    }

    const filterAddedFriendInRoomContextmenu = () => {
        return !!listRequestFriends ? listRequestFriends.userFriends.filter(friend => !listAddedFriends.includes(friend)) : []
    }

    const uploadLogoRoomOnServer = async id => {
        if (!!urlLogoRoom) {
            const formData = new FormData()
            formData.append('logo-room', refUploadLogo.current.files[0])
    
            const options = {
                method:'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            }
            await fetch(`${config.hostServer}/upload/logo_room?roomId=${id}`, options)
        }
    }
    
    const createRoomHandler = async () => {
        try {
            if (checkboxSecurityKey && !successEdit) {
                return alert.show('warning', 'Вы забыли установить пароль для вашей будущей комнаты!', 'Ошибка!')
            } 

            const allFormatListFriends = listAddedFriends.map(friend => friend.user)
            allFormatListFriends.unshift(auth.userId)

            let listAllLinksToVideosFormat = []

            if (checkboxReadyLinks) {
                listAllLinksToVideosFormat = listAllLinksToVideos.map(video => video.link)
            } 
        
            const dataRoom = {
                title: valuesInputs.nameRoom,
                party: allFormatListFriends,
                securityKey:valuesInputs.textSecurityKey,
                linkVideos:valuesInputs.linkToVideo,
                listLinkVideos:listAllLinksToVideosFormat,
            }
            
            const data = await request(`${config.hostServer}/api/room/create`, 'POST', dataRoom, {
                authorization: `Bearer ${auth.token}`
            })
            
            await uploadLogoRoomOnServer(data.roomId)
            alert.show('success', data.message, 'Успешно!')
            setRerender(!rerender)
        } catch (e) {
            alert.show('danger', e.message, 'Ошибка!')
        }
    }

    return (
        <ContextCreatingRoom.Provider value={{valuesInputs, setInputsForm, listAddedFriends, setListAddedFriends,
            changeCheckboxSecurityKey, changeCheckboxReadyLinks, checkboxSecurityKey, checkboxReadyLinks,
            getPreviewFromLink, createRoomHandler, successEdit, acceptSecurityKey, pasteToTextSecurityKey,
            urlLogoRoom, uploadLogoRoomLocal, inviteFriends, kickOutFromRoom, filterAddedFriendInRoomContextmenu, 
            listAllLinksToVideos, appendToListAllLinksToVideos, deleteFromListAllLinksToVideos, refUploadLogo}}
        >
            {children}
        </ContextCreatingRoom.Provider>
    ) 
}