import React from 'react';
import List from './Pages/List.jsx';
import AddProduct from './Pages/AddProduct.jsx';
import { Route, Routes, Link } from 'react-router-dom';
import HomeAdmin from './Pages/HomeAdmin.jsx';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';

const Admin = () => {
  return (
    <>
      <h1>Panel de administrador</h1>

      <Link to='/admin/list'><button>Lista de productos</button></Link>
      <Link to='/admin/addProduct'><button>Agregar productos</button></Link>
      <p>Para hacer espacio...</p>

    </>
  );
};

export default Admin;
