import React from 'react'
import style from './Styles/Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'


const Footer = () => {
  return (
   
    <div className={style.footer}>
      <img className={style.logo} src="./img/logo.png" alt="logo dh" />
      <FontAwesomeIcon icon={faCopyright} />
      <p>  2023 - Todos los derechos reservados</p>
    </div>
  )
}

export default Footer