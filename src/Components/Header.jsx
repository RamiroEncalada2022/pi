import React from 'react'
import {Link} from "react-router-dom"
import style from './Styles/Header.module.css'

const Header = () => {
  return (
    <div className={style.container}>

      <div className={style.header} >

        <div className={style.div} >
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