import React, { useState } from 'react'
import style from './Styles/SearchBar.module.css'

const SearchBar = () => {

  const [term, setTerm] = useState('')
  const [filter, setFilter] = useState('all')

  //Manejador de cambios en la barra busqueda
  const handleInput = ( e ) => {
    setTerm(e.target.value)
  }

  const handleFilter = ( e ) => {
    setFilter(e.target.value)
  }

  return (
    <div className={style.container}>
      <input
        type='text'
        placeholder='Busca instrumentos...'
        value={term}
        onChange={handleInput}
        />
      <select value={filter} onChange={handleFilter}>
        <option value="all">Todos</option>
        <option value="Guitarra">Guitarra</option>
        <option value="Bateria">Bateria</option>
        <option value="Piano">Piano</option>
      </select>
    </div>
  )
}

export default SearchBar