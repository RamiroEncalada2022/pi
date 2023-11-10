
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Detail from "./Components/Detail"


import { Route, Routes } from 'react-router-dom'
import Admin from './Admin.jsx'
import List from './Pages/List'
import AddProduct from './Pages/AddProduct'
import ProductList from "./Components/ProductList"
import AddCategory from './Pages/AddCategory.jsx'
import Features from './Pages/Features.jsx'
import Login from './Components/Login'
import Profile from './Pages/Profile'
import ListUsers from './Pages/ListUsers'

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
      <Route path="/ListaInstrumentos" element={<ProductList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin/listUsers" element={<ListUsers />} />
    </Routes>

    <Footer/>
      
    </>
  )
}

export default App

