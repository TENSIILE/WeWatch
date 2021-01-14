import React, { useState, useCallback, useEffect } from 'react'
import { ContextConMenu } from './contextConMenu'

export const ContextMenuState = ({ children }) => {
    const [eachContextmenu, setEachContextmenu] = useState({myFriends: {}})

    const [optionsEachCM, setOptionsEachCM] = useState(0)

    const openEachCMInFor = index => setEachContextmenu({myFriends:{...eachContextmenu.myFriends, [index]:true}})

    const createEachCMInFor = useCallback(() => {
        const newObject = {myFriends: {}}
        
        for (let i = 0; i < optionsEachCM; i++) {
            newObject.myFriends[i] = false
        }
        
        setEachContextmenu(newObject)
    }, [optionsEachCM])

    useEffect(createEachCMInFor, [optionsEachCM])
    

    const [visible, setVisible] = useState({
        'status': false, 'addFriendToRoom': false,
        'attachmentDataMessage': false
    }) 

    const show = useCallback(name => {
        setVisible({...visible, [name]: true})
    }, [visible])

    const hide = useCallback(name => {
        setVisible({...visible, [name]: false})
    }, [visible])

    const hideAll = useCallback(() => {
        const newObj = {}
        Object.keys(visible).map(state => newObj[state] = false)
        setVisible(newObj)

        createEachCMInFor()

    }, [visible, createEachCMInFor])

    const delegateHiddenContextmenu = useCallback(e => {
        const component = e.target.closest('.contextmenu')
        
        if ((!component && Object.values(visible).includes(true)) || (!component && Object.values(eachContextmenu.myFriends).includes(true))) {
            hideAll() 
        }
    }, [visible, hideAll, eachContextmenu])

    return (
        <ContextConMenu.Provider value={{show, hide, hideAll, visible,
            delegateHiddenContextmenu, setOptionsEachCM, eachContextmenu, openEachCMInFor
        }}>
            {children}
        </ContextConMenu.Provider>
    )
}