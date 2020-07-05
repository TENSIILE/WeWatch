import React from 'react'
import { useRoutes } from './routes'
import {BrowserRouter} from 'react-router-dom'

function App() {
  let routes = useRoutes(false)
  return (
    <BrowserRouter>
      <div className="containter">
        {routes}
      </div>
    </BrowserRouter>
  )
}

export default App
