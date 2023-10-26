
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Admin from './Pages/Admin'
import Detail from "./Components/Detail"
import { Route, Routes } from 'react-router-dom'
import ProductList from './Components/ProductList'

function App() {


  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/ListaInstrumentos" element={<ProductList />} />
      </Routes>

      <Footer />

    </>
  )
}

export default App
