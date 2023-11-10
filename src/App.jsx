
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Detail from "./Components/Detail"
import ProductCategory from "./Components/ProductCategory"
import { Route, Routes } from 'react-router-dom'
import Admin from './Admin.jsx'
import List from './Pages/List'
import AddProduct from './Pages/AddProduct'
import AddCategory from './Pages/AddCategory.jsx'
import ProductList from "./Components/ProductList"
import AddCategory from './Pages/AddCategory.jsx'
import Login from './Components/Login'

function App() {


  return (
    <>
    <Header/>

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="admin" element={<Admin/>} />
      <Route path="/admin/list" element={<List />} />
      <Route path="/admin/addProduct" element={<AddProduct />} />
      <Route path="/admin/addCategory" element={<AddCategory />} />
      <Route path="/admin/caracteristicas" element={<Features />} />
      <Route path="/Detail/:id" element={<Detail/>} />
      <Route path="/ProductCategory" element={<ProductCategory/>}/>
      <Route path="/Cuerdas" element={<Cuerdas/>}/>
      <Route path="/Percusion" element={<Percusion/>}/>
      <Route path="/Accesorios" element={<Acessorios/>}/>
      <Route path="/Viento" element={<Viento/>}/>
      <Route path="/ListaInstrumentos" element={<ProductList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>

    <Footer/>
      
    </>
  )
}

export default App

