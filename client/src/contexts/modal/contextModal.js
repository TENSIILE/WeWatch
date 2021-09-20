import React from 'react'

export const ContextModal = React.createContext({
  visible: {},
  show: name => {},
  hide: name => {},
  changeTitle: (name, new_title) => {},
  changeStyle: (name, new_classnames) => {},
  title: '',
  style: '',
  installInputData: new_data => {},
  data: null,
  type: '',
  setType: type => {},
  child: null,
  setChild: component => {},
})
