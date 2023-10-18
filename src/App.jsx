
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'

import { Route, Routes } from 'react-router-dom'

function App() {


  return (
    <>
    <Header/>

    <Routes>
      <Route path="/" element={<Home/>}/>
   

    </Routes>

    <Footer/>
      
    </>
  )
}

export default App
