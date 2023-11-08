import React from 'react'
import { useContextGlobal } from './utils/global.context'

const CardDetail = ({instrumento}) => {

    const {dispatch, state} = useContextGlobal()


  return (
    <div> 
        <img src={instrumento.imagenes[0]} alt="instrumento" width={'250px'}  />
        {/* <img src={instrumento.imagenes[0]} alt={`Imagen`}></img> */}
    </div>
  )
}

export default CardDetail