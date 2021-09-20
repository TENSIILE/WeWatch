import React from 'react'

export const ContextAuth = React.createContext({
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
})
