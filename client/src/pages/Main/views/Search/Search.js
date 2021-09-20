import React, { useState, useContext, useCallback, useRef } from 'react'
import { ReactSVG } from 'react-svg'
import classnames from 'classnames'
import { ContextAuth } from '../../../../contexts/contextAuth'
import { ContextGetInfo } from '../../../../contexts/contextGetInfo'
import { ContextAlert } from '../../../../contexts/alert/contextAlert'
import { useHttp } from '../../../../hooks/http.hook'
import { Input } from '../../../../components/input/Input'
import { Item } from '../../../../components/itemsGroup/Item'
import { Sidebar } from '../../layouts/Sidebar/Sidebar'
import { Loader } from '../../../../components/loader/Loader'
import { SearchZone } from '../../layouts/Sidebar/parts/controlRequestFriends/SearchZone'

import { socketsClient } from '../../../../sockets/sockets'
import { REQUEST__FRIENDS_CHECK } from '../../../../types/socket'
import { ADDING_TO_FRIEND } from '../../../../types/settingsNames'

import search from '../../../../static/icons/Search.svg'
import friend from '../../../../static/icons/placeholders_search_engine.svg'
import config from '../../../../config.json'

import './search.scss'

export const Search = () => {
  const { infoUser, listRequestFriends, rerender, setRerender } = useContext(
    ContextGetInfo
  )
  const { userId, token } = useContext(ContextAuth)
  const alert = useContext(ContextAlert)
  const { request, loading } = useHttp()

  const [visibledButtonAddFriend, setVisibledButtonAddFriend] = useState(true)

  const [findPersonInput, setFindPersonInput] = useState('')
  const [people, setPeople] = useState([])
  const [findedHuman, setFindedHuman] = useState('')
  const [lockAddToFriend, setLockAddToFriend] = useState(null)

  const login = useRef('')

  const FindAllNewFriends = useCallback(async () => {
    if (!findPersonInput.trim()) return setPeople([])

    if (
      findedHuman.toString() === findPersonInput.slice(1) &&
      findedHuman.toString() === login.current.toString()
    )
      return

    if (findPersonInput.includes('@')) {
      login.current = findPersonInput.slice(1)

      if (!login.current) return

      try {
        const arrayPeople = await request(
          `${config.hostServer}/api/getInfo/user/basicInfo`,
          'POST',
          { login: login.current },
          { Authorization: `Bearer ${token}` }
        )

        setPeople([arrayPeople])

        arrayPeople.userAdditional.settings
          ? setLockAddToFriend(
              JSON.parse(arrayPeople.userAdditional.settings)[ADDING_TO_FRIEND]
                .nobody
            )
          : setLockAddToFriend(false)

        infoUser.user.login.toLowerCase() === login.current.toLowerCase()
          ? setVisibledButtonAddFriend(false)
          : setVisibledButtonAddFriend(true)

        setFindedHuman(arrayPeople.user.login)
      } catch (e) {
        setPeople([])
      }
    }
  }, [findPersonInput, login, request, findedHuman, infoUser, token])

  const keyDownFindAllNewFriends = e => {
    if (e.key === 'Enter') {
      FindAllNewFriends()
    }
  }

  const sendFriendRequest = async person => {
    await request(
      `${config.hostServer}/api/friends/request`,
      'POST',
      { toUser: person, fromUser: userId },
      { Authorization: `Bearer ${token}` }
    )
    socketsClient.socket.emit(REQUEST__FRIENDS_CHECK)
    setRerender(!rerender)
  }

  const makeFriends = async candicate_friend => {
    try {
      await request(
        `${config.hostServer}/api/friends/accept`,
        'POST',
        { toUser: candicate_friend, fromUser: userId },
        { Authorization: `Bearer ${token}` }
      )
    } catch (e) {
      alert.show('danger', e.message, 'Ошибка!')
    }

    socketsClient.socket.emit(REQUEST__FRIENDS_CHECK)
    setRerender(!rerender)
  }

  const cancelTheApplication = async (candicate_friend, type = 'other') => {
    await request(
      `${config.hostServer}/api/friends/request/delete`,
      'POST',
      { userId, toUser: candicate_friend, typeRequestFriend: type },
      { Authorization: `Bearer ${token}` }
    )
    socketsClient.socket.emit(REQUEST__FRIENDS_CHECK)
    setRerender(!rerender)
  }

  Array.prototype.checkingForExistenseOfPerson = function (person) {
    return this.map(array =>
      array.map(human => human.user).includes(person.userAdditional.user)
    ).includes(true)
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
        <hr id='title-border-bottom' />
        <div className='managing-friends'>
          <Input
            isWithButton={true}
            icon={search}
            newClass='grey-background'
            style={{ margin: '25px 0 0 0', width: '100%' }}
            placeholder='Введите ник человека, перед ником должен стоять знак @, например: @TENSIILE'
            onChange={e => setFindPersonInput(e.target.value)}
            value={findPersonInput}
            onClick={FindAllNewFriends}
            onKeyDown={keyDownFindAllNewFriends}
          />

          {loading && <Loader />}

          <hr id='title-border-bottom' />
          <div className='list-new-friends beautiful-scrollbar'>
            {people.length ? (
              people.map((person, index) => {
                return lockAddToFriend ? (
                  <Item
                    key={index}
                    src={person.userAdditional.avatar}
                    text='Данный пользователь запретил добавляться в друзья!'
                    newClass={classnames('adding-new-friend', 'text-danger')}
                  />
                ) : (
                  <Item
                    key={index}
                    src={person.userAdditional.avatar}
                    newClass={classnames('adding-new-friend', {
                      active: people.length,
                    })}
                    text={
                      person.userAdditional.name +
                      ' ' +
                      person.userAdditional.lastname
                    }
                    isOnButton={visibledButtonAddFriend}
                    textButton={
                      [
                        listRequestFriends.userFriends,
                      ].checkingForExistenseOfPerson(person)
                        ? 'У Вас в друзьях'
                        : 'Добавить в друзья'
                    }
                    onClick={() =>
                      sendFriendRequest(person.userAdditional.user)
                    }
                    disabledButton={[
                      listRequestFriends.list,
                      listRequestFriends.listMyRequestFriend,
                      listRequestFriends.userFriends,
                    ].checkingForExistenseOfPerson(person)}
                  />
                )
              })
            ) : loading ? (
              <Loader />
            ) : (
              <div className='no-friend-found'>
                <ReactSVG src={friend} className='friendship-icon' />
                <span id='empty-text'>Людей не найдено</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
