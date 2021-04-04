import React from 'react'
import { BadgeMini } from '../../../../../../components/badge/Badge'
import { Table } from '../../../../../../components/table/Table'
import config from '../../../../../../config.json'
import './api.scss'

export const Api = () => {
  return (
    <div className='api'>
      <BadgeMini
        text={`${config.hostServer}/development/api/`}
        newClass='primary initialcase'
      />

      <div className='api__alert api__alert--warning mt-1 mb-1'>
        Для того, чтобы использовать текущий API Вам необходимо быть
        зарегистрированным в WeWatch и иметь свой уникальный токен. Токен
        индентифицирует Вас в системе, чтобы злоумышники не смогли нелегально
        использовать данные пользователей WeWatch.
      </div>

      <div className='api__alert api__alert--danger mt-1 mb-1'>
        Если профиль пользователя будет закрыт, то получить его данные не
        получиться!
      </div>

      <div className='d-flex direction-column mb-1'>
        <h3 className='title-support mb-0'>Список возвращаемых статусов</h3>
        <Table
          count={2}
          isHeader={true}
          header={['Код', 'Описание']}
          newClass='border backlight'
        >
          <Table.Row count={2}>
            <Table.Ceil>200</Table.Ceil>
            <Table.Ceil>Все отлично</Table.Ceil>
          </Table.Row>
          <Table.Row count={2}>
            <Table.Ceil>400</Table.Ceil>
            <Table.Ceil>Неверный запрос</Table.Ceil>
          </Table.Row>
          <Table.Row count={2}>
            <Table.Ceil>401</Table.Ceil>
            <Table.Ceil>Не авторизован</Table.Ceil>
          </Table.Row>
          <Table.Row count={2}>
            <Table.Ceil>404</Table.Ceil>
            <Table.Ceil>Пользователь на найден | Закрыт профиль</Table.Ceil>
          </Table.Row>
          <Table.Row count={2}>
            <Table.Ceil>500</Table.Ceil>
            <Table.Ceil>Ошибка сервера</Table.Ceil>
          </Table.Row>
        </Table>
      </div>

      <div className='d-flex align-items-center'>
        <h3 className='title-support mb-0'>Получение данных пользователя</h3>
        <BadgeMini text='get' newClass='warning width-unset' />
      </div>

      <p className='title mt-1-i api__title'>
        Запросы по получению данных о польвателях принимают один входящий
        параметр{' '}
        <small className='api__highlight api__highlight--sky'>Login</small>.
        Логином пользователя выступает его никнейм в WeWatch. При передачи
        логина, стоит придерживаться его регистра!
      </p>

      <p className='title mt-1-i api__title'>
        Для начала работы с API, нужно будет указывать так называемые заголовки
        в Ваши запросы. Заголовок authorization говорит сам за себя, WeWatch
        необходимо знать от кого поступает тот или иной запрос, чтобы вернуть
        данные пользователя.
      </p>

      <p className='api__title mini mt-1-i'>Пример кода:</p>

      <div className='api__code'>
        <p>
          <span className='purple'>const </span>response =
          <span className='sky'> await </span>
          <span className='blue'>fetch</span>(
          <span className='green'>'/getInfo/email?login=TENSIILE'</span>, {'{ '}{' '}
          <br />
          <span className='padding'>
            <span className='red'>method</span>:
            <span className='green'> 'GET'</span>,
          </span>
          <br />
          <span className='padding'>
            <span className='red'>headers</span>:
          </span>
          <span>
            {' {'} authorization:{' '}
            <span className='green'>'Bearer [Ваш токен]' </span>
          </span>
          {'}'}
          <br />
          {'}'})
        </p>
      </div>

      <ul className='clauses-tining'>
        <li className='clause'>
          <div className='tuning-control column'>
            <div className='d-flex align-items-center'>
              <div className='d-flex direction-column'>
                <h4 className='title'>Получение почты</h4>
                <BadgeMini
                  text='/getInfo/email?login={Логин пользователя}'
                  newClass='success width-unset normal initialcase fullsize ml-0-i mt-1'
                />
              </div>
            </div>

            <p className='title mt-1-i'>
              Возращает <small className='api__highlight'>объект</small> данных.
            </p>

            <Table
              isHeader={true}
              header={['Поле', 'Тип', 'Описание']}
              newClass='backlight border'
              count={3}
            >
              <Table.Row count={3}>
                <Table.Ceil>email</Table.Ceil>
                <Table.Ceil>String</Table.Ceil>
                <Table.Ceil>Почта пользователя</Table.Ceil>
              </Table.Row>
            </Table>
          </div>
        </li>

        <li className='clause'>
          <div className='tuning-control column'>
            <div className='d-flex align-items-center mb-1'>
              <div className='d-flex direction-column'>
                <h4 className='title'>
                  Получение полной информации о пользователе
                </h4>
                <BadgeMini
                  text='/getInfo/user/fullInformation?login={Логин пользователя}'
                  newClass='success width-unset normal initialcase fullsize ml-0-i mt-1'
                />
              </div>
            </div>

            <p className='title'>
              Возращает <small className='api__highlight'>объект</small> данных.
            </p>

            <p className='api__title mini mt-1-i'>
              Пример возращаемого объекта:
            </p>
            <div className='api__example'>
              <ul>
                <li>
                  <span className='api__example--key-words'>"name":</span>
                  'Иван',
                </li>
                <li>
                  <span className='api__example--key-words'>"lastname":</span>
                  'Иванов',
                </li>
                <li>
                  <span className='api__example--key-words'>"created":</span>
                  '01.01.2021, 00:00:00',
                </li>
                <li>
                  <span className='api__example--key-words'>"status":</span>
                  'Очеееееень большой статус про жизнь)',
                </li>
                <li>
                  <span className='api__example--key-words'>"country":</span>
                  'Россия',
                </li>
                <li>
                  <span className='api__example--key-words'>"city":</span>
                  'Москва',
                </li>
                <li>
                  <span className='api__example--key-words'>"languages":</span>
                  ['Русский', 'Английский'],
                </li>
                <li>
                  <span className='api__example--key-words'>"avatar":</span>
                  'http://www.example.com/image...',
                </li>
                <li>
                  <span className='api__example--key-words'>"header":</span>
                  'http://www.example.com/image...',
                </li>
                <li>
                  <span className='api__example--key-words'>
                    "statusOnline":
                  </span>
                  'offline'
                </li>
              </ul>
            </div>

            <Table
              isHeader={true}
              header={['Поле', 'Тип', 'Описание']}
              newClass='backlight border'
              count={3}
            >
              <Table.Row count={3}>
                <Table.Ceil>name</Table.Ceil>
                <Table.Ceil>String</Table.Ceil>
                <Table.Ceil>Имя пользователя</Table.Ceil>
              </Table.Row>
              <Table.Row count={3}>
                <Table.Ceil>lastname</Table.Ceil>
                <Table.Ceil>String</Table.Ceil>
                <Table.Ceil>Фамилия пользователя</Table.Ceil>
              </Table.Row>
              <Table.Row count={3}>
                <Table.Ceil>created</Table.Ceil>
                <Table.Ceil>String</Table.Ceil>
                <Table.Ceil>Дата создания аккаунта</Table.Ceil>
              </Table.Row>
              <Table.Row count={3}>
                <Table.Ceil>status</Table.Ceil>
                <Table.Ceil>String</Table.Ceil>
                <Table.Ceil>Статус пользователя</Table.Ceil>
              </Table.Row>
              <Table.Row count={3}>
                <Table.Ceil>country</Table.Ceil>
                <Table.Ceil>String</Table.Ceil>
                <Table.Ceil>Страна</Table.Ceil>
              </Table.Row>
              <Table.Row count={3}>
                <Table.Ceil>city</Table.Ceil>
                <Table.Ceil>String</Table.Ceil>
                <Table.Ceil>Город</Table.Ceil>
              </Table.Row>
              <Table.Row count={3}>
                <Table.Ceil>languages</Table.Ceil>
                <Table.Ceil>Array</Table.Ceil>
                <Table.Ceil>Языки</Table.Ceil>
              </Table.Row>
              <Table.Row count={3}>
                <Table.Ceil>avatar</Table.Ceil>
                <Table.Ceil>String</Table.Ceil>
                <Table.Ceil>Ссылка на изображение</Table.Ceil>
              </Table.Row>
              <Table.Row count={3}>
                <Table.Ceil>header</Table.Ceil>
                <Table.Ceil>String</Table.Ceil>
                <Table.Ceil>Ссылка на изображение</Table.Ceil>
              </Table.Row>
              <Table.Row count={3}>
                <Table.Ceil>statusOnline</Table.Ceil>
                <Table.Ceil>String</Table.Ceil>
                <Table.Ceil>Статус онлайна</Table.Ceil>
              </Table.Row>
            </Table>
          </div>
        </li>
      </ul>
    </div>
  )
}
