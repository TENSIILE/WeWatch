import React from 'react'

import './updates.scss'

export const Updates = () => {
  return (
    <div className='updates'>
      <div className='zone-news'>
        <div className='date-and-version'>
          <span className='date'>13.12.2020</span>
          <span className='version'>Beta 1.0.0</span>
        </div>
        <header className='new'>
          <span>Новое</span>
        </header>
        <div className='text new'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ad
          incidunt praesentium aut? Ullam hic quia rerum vero numquam officiis
          quibusdam excepturi qui esse eos? Maiores itaque placeat provident
          illum iure tempora laboriosam, cum suscipit, consequuntur odio saepe
          ex dolor temporibus, non odit incidunt nam. Quae, deleniti aut.
          Reprehenderit repellat possimus distinctio labore ipsa fugit nemo in
          nihil cum. Reiciendis porro quis esse debitis?
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
          </ul>
        </div>
      </div>
      <div className='zone-news'>
        <header className='update'>
          <span>Изменено</span>
        </header>
        <div className='text update'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ad
          incidunt praesentium aut? Ullam hic quia rerum vero numquam officiis
          quibusdam excepturi qui esse eos? Maiores itaque placeat provident
          illum iure tempora laboriosam, cum suscipit, consequuntur odio saepe
          ex dolor temporibus, non odit incidunt nam. Quae, deleniti aut.
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </div>
      </div>
      <div className='zone-news'>
        <header className='delete'>
          <span>Удалено</span>
        </header>
        <div className='text delete'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ad
          incidunt praesentium aut? Ullam hic quia rerum vero numquam officiis
          quibusdam excepturi qui esse eos?
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
