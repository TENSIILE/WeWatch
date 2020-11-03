import React, { useContext, useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { useSearcher } from '../../../../../../hooks/searcher.hook'
import { Input } from '../../../../../../components/input/Input'
import { Dialog } from '../../../../../../components/dialog/Dialog'
import { Loader } from '../../../../../../components/loader/Loader'
import { ContextAuth } from '../../../../../../contexts/contextAuth'
import { ContextMain } from '../../../../../../contexts/mainPage/contextMain'

import emptyDialog from '../../../../../../static/icons/emptyMessage.svg'
import search from '../../../../../../static/icons/Search.svg'

import '../../sidebar.scss'

export const DialogsChat = () => {
    const { infoUserDialogs, isReloading } = useContext(ContextMain)
    const auth                             = useContext(ContextAuth)

    const searcher              = useSearcher(infoUserDialogs)

    const [isEmpty, setIsEmpty] = useState(true)
    
    useEffect(() => {
        !!infoUserDialogs.length ? setIsEmpty(false) : setIsEmpty(true)
    }, [infoUserDialogs])

    return (
        <>
            {
                !isEmpty ? 
                (   
                    <>
                        <div className='input-form'>
                            <Input 
                                isWithButton={true}
                                icon={search} 
                                style={{margin: '15px 10px 0 10px', width:'100%'}}
                                placeholder='Найти диалог...'
                                value={searcher.input}
                                onChange={e => searcher.setInput(e.target.value)}
                                onKeyUp={searcher.search}
                                disabled={isReloading}
                                onClick={searcher.search}
                            />
                        </div>

                        {
                            isReloading ? <Loader/> : (
                                <div className='zone-my-dialogs'>
                                    <div className='list-my-dialogs'>
                                        {
                                            !!searcher.array.length ? searcher.array.map((dialog, i) => {
                                                return (
                                                    <Dialog 
                                                        key={dialog._id + i} 
                                                        chatID={dialog._id}
                                                        messages={dialog.messages}
                                                        isMe={auth.userId === dialog.messages.author}
                                                        dialogData={dialog}
                                                    />
                                                ) 
                                            }) : <span id='empty-text'>Диалог не найден</span>
                                        }
                                    </div>
                                </div>
                            )
                        }
                        
                    </>
                ) : (
                    <div className='empty-data'> 
                        <ReactSVG src={emptyDialog} className='icon-empty'/>
                        <span id='empty-text'>Диалоги пусты</span> 
                    </div>
                )
            }
        </>
    ) 
}