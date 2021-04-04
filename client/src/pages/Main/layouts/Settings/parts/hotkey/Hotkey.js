import React, { useState, useEffect } from 'react'
import { Keycap } from '../../../../../../components/keycap/Keycap'
import { matrix } from '../../../../../../utils/functions'

export const Hotkey = () => {
  const [matrixString, setMatrixString] = useState('')

  useEffect(() => {
    let interval = setInterval(() => {
      setMatrixString(matrix())
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='hotkey'>
      <h3 className='title-support'>Стандартные комбинации</h3>
      <ul className='clauses-tining'>
        <li className='clause'>
          <div className='tuning-control'>
            <p className='title'>Выйти из системы</p>
            <Keycap.Container>
              <Keycap text='CTRL' />
              <Keycap text='SHIFT' />
              <Keycap text='ESC' />
            </Keycap.Container>
          </div>
        </li>

        <li className='clause'>
          <div className='tuning-control'>
            <p className='title'>Перейти на главную страницу</p>
            <Keycap.Container>
              <Keycap text='CTRL' />
              <Keycap text='SHIFT' />
              <Keycap text='1' />
            </Keycap.Container>
          </div>
        </li>

        <li className='clause'>
          <div className='tuning-control'>
            <p className='title'>Перейти на страницу комнаты</p>
            <Keycap.Container>
              <Keycap text='CTRL' />
              <Keycap text='SHIFT' />
              <Keycap text='2' />
            </Keycap.Container>
          </div>
        </li>

        <li className='clause'>
          <div className='tuning-control'>
            <p className='title'>Перейти на страницу чата</p>
            <Keycap.Container>
              <Keycap text='CTRL' />
              <Keycap text='SHIFT' />
              <Keycap text='3' />
            </Keycap.Container>
          </div>
        </li>

        <li className='clause'>
          <div className='tuning-control'>
            <p className='title'>Перейти на страницу поиска друзей</p>
            <Keycap.Container>
              <Keycap text='CTRL' />
              <Keycap text='SHIFT' />
              <Keycap text='4' />
            </Keycap.Container>
          </div>
        </li>

        <li className='clause'>
          <div className='tuning-control'>
            <p className='title'>Перейти на страницу настроек</p>
            <Keycap.Container>
              <Keycap text='CTRL' />
              <Keycap text='SHIFT' />
              <Keycap text='5' />
            </Keycap.Container>
          </div>
        </li>

        <li className='clause'>
          <div className='tuning-control'>
            <p className='title success font-bold matrix'>{matrixString}</p>
            <Keycap.Container>
              <Keycap text='?' />
              <Keycap text='?' />
              <Keycap text='?' />
              <Keycap text='?' />
              <Keycap text='?' />
            </Keycap.Container>
          </div>
        </li>
      </ul>
    </div>
  )
}
