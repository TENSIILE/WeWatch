import React from 'react'

export const ContextAlert = React.createContext({
  show: (status = 'warning', text, heading) => {},
  hide: () => {},
  isOpen: null,
  configAlert: null,
})
