import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './Components/utils/global.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <ContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  </ContextProvider>
)
