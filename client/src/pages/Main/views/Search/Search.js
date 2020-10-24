import React, {useState, useContext, useCallback, useRef } from 'react'
import { ContextAuth } from '../../../../contexts/contextAuth'
import { ContextGetInfo } from '../../../../contexts/contextGetInfo'
import { useHttp } from '../../../../hooks/http.hook'
import { Input } from '../../../../components/input/Input'
import { Item } from '../../../../components/itemsGroup/Item'
import { Sidebar } from '../../layouts/Sidebar/Sidebar'
import { Loader } from '../../../../components/loader/Loader'
import { SearchZone } from '../../layouts/Sidebar/parts/controlRequestFriends/SearchZone'

import search from '../../../../static/icons/Search.svg'
import config from '../../../../config.json'
import './search.scss'

export const Search = () => {
    const { infoUser, listRequestFriends,
         rerender, setRerender } = useContext(ContextGetInfo)
    const { userId }             = useContext(ContextAuth)
    const { request, loading }   = useHttp()

    
    const [visibledButtonAddFriend, 
                   setVisibledButtonAddFriend]   = useState(true)

    const [findPersonInput, setFindPersonInput ] = useState('')
    const [people, setPeople]                    = useState([])
    const [findedHuman, setFindedHuman]          = useState('')
    // let login = ''

    const login = useRef('')



    const FindAllNewFriends = useCallback( async () => {

        if (!findPersonInput.trim()) return setPeople([])
        
        if (findedHuman.toString() === findPersonInput.slice(1)) return

        if (findPersonInput.includes('@')) {
           login.current = findPersonInput.slice(1)
        
           try {
                const arrayPeople = await request(`${config.hostServer}/api/getInfo/user/basicInfo`, 'POST', { login: login.current })

                setPeople([arrayPeople])

                infoUser.user.login.toLowerCase() === login.current.toLowerCase() ? setVisibledButtonAddFriend(false) : setVisibledButtonAddFriend(true)

                setFindedHuman(arrayPeople.user.login)
            
            } catch (e) {
                setPeople([])
            }
        } 
    }, [findPersonInput, login, request, findedHuman, infoUser])

    const keyDownFindAllNewFriends = e => {
        if (e.key === 'Enter') {
            FindAllNewFriends()
        }
    }

    const sendFriendRequest = async person => {
        await request(`${config.hostServer}/api/friends/request`, 'POST', { toUser: person, fromUser: userId })
        setRerender(!rerender)
    }

    const makeFriends = async candicate_friend => {
        await request(`${config.hostServer}/api/friends/accept`, 'POST', { toUser: candicate_friend, fromUser: userId })
        setRerender(!rerender)
    }

    const cancelTheApplication = async (candicate_friend, type = 'other') => {
        await request(`${config.hostServer}/api/friends/request/delete`, 'POST', { userId, toUser: candicate_friend, typeRequestFriend: type })
        setRerender(!rerender)
    }

    
    Array.prototype.checkingForExistenseOfPerson = function(person) {
        return this.map(array => array.map(human => human.user).includes(person.userAdditional.user)).includes(true) 
    }
    /*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/

    return (
        <>
            <Sidebar>
                <SearchZone 
                    onClickDelete={cancelTheApplication}
                    onClickAccept={makeFriends}
                 />
            </Sidebar>
             
            <div className='main-search region'>
                <h2>Поиск друзей</h2>
                <hr id='title-border-bottom'/>
                <div className='managing-friends'>
                    <Input 
                        isWithButton={true}
                        icon={search} 
                        newClass='grey-background' 
                        style={{margin: '25px 0 0 0', width:'100%'}}
                        placeholder='Введите ник человека, перед ником должен стоять знак @, например: @TENSIILE'
                        onChange={e => setFindPersonInput(e.target.value)}
                        value={findPersonInput}
                        onClick={FindAllNewFriends}
                        onKeyDown={keyDownFindAllNewFriends}
                    />
                    {loading ? <Loader/> : null}
                    <hr id='title-border-bottom'/>
                    <div className='list-new-friends beautiful-scrollbar'>
                        {
                            people.length ? 
                                people.map((person, index) => {  
                                    return (
                                        <Item 
                                            key={index}
                                            src={person.userAdditional.avatar} 
                                            newClass={`adding-new-friend ${people.length ? 'active' : '' }`}
                                            text={person.userAdditional.name + ' ' + person.userAdditional.lastname}
                                            isOnButton={visibledButtonAddFriend} 
                                            textButton={[listRequestFriends.userFriends].checkingForExistenseOfPerson(person) ? 'У Вас в друзьях' : 'Добавить в друзья'}
                                            onClick={() => sendFriendRequest(person.userAdditional.user)}
                                            disabledButton={[listRequestFriends.list, listRequestFriends.listMyRequestFriend, listRequestFriends.userFriends].checkingForExistenseOfPerson(person)}
                                        /> 
                                    )
                                })
                            :  loading ? <Loader/> : <span id='empty-text'>Людей не найдено</span>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}