import React from 'react'
import { Link } from 'react-router-dom'

const HomeAdmin = () => {
  return (
    <div>        
        <h1>Panel de administrador</h1>

        <Link to='/list'><button>Lista de productos</button></Link>
        <Link to='/addProduct'><button>Agregar productos</button></Link>
        <p>Para hacer espacio...</p>
    </div>
  )
}

export default HomeAdmin