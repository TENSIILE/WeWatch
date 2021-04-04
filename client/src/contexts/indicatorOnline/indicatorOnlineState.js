import React, { useState } from 'react'
import { ContextIndicatorOnline } from './contextIndicatorOnline'

export const IndicatorOnlineState = ({ children }) => {
  const [statusIO, setStatusIO] = useState('offline')

  return (
    <ContextIndicatorOnline.Provider value={{ statusIO, setStatusIO }}>
      {children}
    </ContextIndicatorOnline.Provider>
  )
}
