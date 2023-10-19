import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Detail = () => {

    const [instrumento, setInstrumento] =useState({})
 

  const params =useParams()
  // Consumiendo el parametro dinamico de la URL deberan hacer un fetch a un instrumento en especifico
  const url = "https://xxxxxxx.com/instrumentos" + params.id

  useEffect(()=>{      
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setInstrumento(data)
    })

  }, [])


  return (
    <div>
        <h1>Instrumento: {instrumento.name} </h1>
        <p> {instrumento.descripcion} </p>
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />

    </div>
  )
}

export default Detail