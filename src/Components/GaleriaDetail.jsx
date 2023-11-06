import React from 'react'
import { useContextGlobal } from './utils/global.context'

const GaleriaDetail = ({instrumento}) => {
 
    const {state, dispatch} = useContextGlobal()
 
    return (
    <div className={style.galeriaDetail}>
      <img src={instrumento.imagenes[0]} alt="instrumento" width={'50px'}  /> 


    </div>
  )
}

export default GaleriaDetail