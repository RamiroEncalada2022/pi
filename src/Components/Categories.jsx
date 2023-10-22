import React from 'react'
import style from './Styles/Categories.module.css'
import { useContextGlobal } from './utils/global.context'
import Card from './Card'


const Categories = () => {

  const {state}= useContextGlobal()
  return (
    <div className={style.container}>

     {(state.instrumentos.map(instrumento =><Card key = {instrumento.id} instrumento={instrumento}/>)).slice(0,10)}



    
    
    </div>
  )
}

export default Categories