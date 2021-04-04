import React, { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import classnames from 'classnames'
import { ContextAlert } from '../../contexts/alert/contextAlert'
import { Input } from '../input/Input'

import trash from '../../static/icons/trash.svg'
import info from '../../static/icons/info.svg'

import './catalogList.scss'

export const CatalogList = ({
  label,
  value,
  onChange,
  text,
  setText,
  list,
  setList,
}) => {
  const alert = useContext(ContextAlert)

  const addNewLanguageToList = e => {
    const isNoneEmpty = list
      .map(item => item.toLowerCase())
      .includes(text.toLowerCase())

    if (e.key === 'Enter' && text.trim() && list) {
      if (isNoneEmpty)
        return alert.show(
          'warning',
          'Нельзя добавить несколько одинаковых языков!',
          'Предупреждение!'
        )

      setList(list.map(item => firstLetterToUpperCase(item)))
      setText.setChangeDataProfile({
        ...setText.changeDataProfile,
        'Языки:': '',
      })
      setList([...list, text])
    }
  }

  const firstLetterToUpperCase = str => str[0].toUpperCase() + str.slice(1)

  const removeLanguageFromList = e => {
    const langFound = e.target.closest('li').getElementsByTagName('p')[0]

    setList(
      list.filter(lang => {
        return lang !== langFound.textContent
      })
    )
  }

  return (
    <div className='catalog_list'>
      <Input
        placeholder={value}
        newClass='grey-background'
        style={{ width: '100%' }}
        name={label}
        onChange={onChange}
        value={text}
        onKeyDown={addNewLanguageToList}
      />
      <ReactSVG
        src={info}
        onClick={() =>
          alert.show(
            'info',
            'Для того, чтобы добавить новый язык, нажмите клавишу Enter',
            'Информация!'
          )
        }
      />
      <ul className={classnames('list-item', { 'margin-on': !!list.length })}>
        {list.map((lang, index) => {
          return (
            <li key={index} onMouseUp={removeLanguageFromList}>
              <p>{lang}</p>
              <ReactSVG src={trash} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
