import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import style from "./Styles/Detail.module.css"




const Detail = () => {

  const [instrumento, setInstrumento] = useState({})


  const params = useParams()
  // Consumiendo el parametro dinamico de la URL deberan hacer un fetch a un instrumento en especifico
  const url = "https://rickandmortyapi.com/api/character/" + params.id

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInstrumento(data)
      })

  }, [])


  return (
    <div className='detail'>

      <img src={instrumento.image} alt="instrumento" width={' 100px'} />

      <h1>{instrumento.name} </h1>

      <Link to="/">
      <FontAwesomeIcon icon={faArrowLeft} style={{ display: "flex", justifyContent: "end" }} />
      </Link>

      
    </div>
  )
}

export default Detail