import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Detail = () => {

    const [instrumento, setInstrumento] =useState({})
 

  const params =useParams()
  // Consumiendo el parametro dinamico de la URL deberan hacer un fetch a un instrumento en especifico
  const url = "https://jsonplaceholder.typicode.com/photos/" + params.id

  useEffect(()=>{      
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setInstrumento(data)
    })

  }, [])


  return (
    <div>
        <h1>{instrumento.title} </h1>
        <img src={instrumento.url} alt="instrumento" width={' 100px'}  /> 
        

    </div>
  )
}

export default Detail