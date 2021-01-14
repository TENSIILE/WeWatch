import React, { useState, useCallback } from 'react'
import { ContextModal } from './contextModal'
import { DELETE_FRIEND } from '../../types/modal'

export const ModalState = ({ children }) => {
    const [visible, setVisible] = useState({
        'deleteFriend': false, 
        'installImageProfile': false,
        'connectToRoom': false,
        'viewProfile': false
    })

    const [title, setTitle] = useState({
        'deleteFriend': '',
        'installImageProfile': '',
        'connectToRoom': false,
        'viewProfile': ''  
    })

    const [style, setStyle] = useState({
        'deleteFriend': '',
        'installImageProfile': '',
        'connectToRoom': false,
        'viewProfile': ''
    })

    const [data, setData] = useState(null)
    const [type, setType] = useState(DELETE_FRIEND)
    const [child, setChild] = useState(DELETE_FRIEND)

    const show = name => setVisible({...visible, [name]: true})

    const hide = (name, e = null) => {
        if (e === null) {
           return setVisible({...visible, [name]: false})
        }

        if (e.target.classList.contains('modal')) {
            setVisible({...visible, [name]: false})
        }
    }

    const installInputData = new_data => setData(new_data)

    const changeTitle = useCallback((name, new_title) => setTitle({...title, [name]: new_title}), [title, setTitle])
    const changeStyle = useCallback((name, new_style) => setStyle({...style, [name]: new_style}), [style, setStyle])

    return (
        <ContextModal.Provider value={{show,
            hide, visible, changeTitle, changeStyle, title,
            style, installInputData, data, type, setType, 
            child, setChild}}
        >
            {children}
        </ContextModal.Provider>
    )
}