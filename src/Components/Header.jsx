import React from 'react'
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <div className='header'>

      <div className='header-divs' >

        <div className='header-divs'>
            <Link to="/">
           <img src="/DH.ico" alt="logo dh"/>
           </Link>
        <h1>Odonto</h1>
        </div>

        <div>
        <button>Crear cuenta</button>
        <button>Iniciar sesion</button>
        </div>
      
      
      </div>

        



    </div>
  )
}

export default Header