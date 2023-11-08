import { useState } from 'react'
import style from './SearchBar.module.css'

const SearchBar = () => {

  /* --------------------------- Datos hardcodeados --------------------------- */

  const instrumentosEjemplo = [
    {
      nombre: "Guitarra Eléctrica",
      descripcion: "Una guitarra eléctrica de alta calidad.",
      marca: "Yamaha",
      tipo: "Guitarra",
    },
    {
      nombre: "Batería Profesional",
      descripcion: "Una batería profesional para conciertos en vivo.",
      marca: "Hercules",
      tipo: "Bateria",
    },
    {
      nombre: "Piano de Cola",
      descripcion: "Un piano de cola clásico para conciertos y eventos especiales.",
      marca: "K&M",
      tipo: "Piano",
    },
  ];

  /* -------------------------------------------------------------------------- */

  /* --------------------------------- Estados -------------------------------- */

  const [term, setTerm] = useState('')
  const [filterTipo, setFilterTipo] = useState('all')
  const [filterMarca, setFilterMarca] = useState('all')


  /* ---------------- Manejador de cambios en la barra busqueda --------------- */

  const handleInput = ( e ) => {
    setTerm(e.target.value)
  }

  const handleFilterTipo = ( e ) => {
    setFilterTipo(e.target.value)
  }

  const handleFilterMarca = ( e ) => {
    setFilterMarca(e.target.value)
  }

  /* -------------------------------------------------------------------------- */
  /*                       Sustituit por mas filtros                      */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */


  /* ---------------- Logica de comunicacion con API de Backend --------------- */

  const handleSearch = () => {
    fetch(`-URL-CONECTA-CON-BACKEND-?search=${term}&filterTipo=${filterTipo}&filterMarca=${filterMarca}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',

      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Datos instrumento:', data);
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
      });
  };

  /* ---- Simulador del handleSearch, eliminar cuando este la conexion con base de datos --- */
  
  const handleSearchSimulador = () => {

    const resultados = instrumentosEjemplo.filter((instrumento) => {
      return (
        instrumento.nombre.toLowerCase().includes(term.toLowerCase()) &&
        (filterTipo === 'all' || instrumento.tipo === filterTipo) &&
        (filterMarca === 'all' || instrumento.marca === filterMarca)
      );
    });

    console.log('Resultados de búsqueda:', resultados);
  };

  /* -------------------------------------------------------------------------- */

  return (
    <div className={style.container}>
      <h2>Busca entre los cientos de instrumentos que tenemos para ti:</h2>
      <div>
        <input
          className={style.input}
          type='text'
          placeholder='🔍   Buscar productos...   '
          value={term}
          onChange={handleInput}
          />
        <label htmlFor="tipo">Tipo: </label>
        <select className={style.filter} value={filterTipo} onChange={handleFilterTipo} id='tipo'>
          <option value="all">Todos</option>
          <option value="Guitarra">Guitarra</option>
          <option value="Bateria">Bateria</option>
          <option value="Piano">Piano</option>
        </select>
        <label htmlFor="marca">Marcas: </label>
        <select className={style.filter} value={filterMarca} onChange={handleFilterMarca} id='marca'>
          <option value="all">Todos</option>
          <option value="Yamaha">Yamaha</option>
          <option value="Hercules">Hercules</option>
          <option value="K&M">K&M</option>
        </select>
        {/* ------------------- Cambiar el handleSearchSimulator} ------------------- */}
        <button onClick={handleSearchSimulador}>Buscar</button>
      </div>
    </div>
  )
}

export default SearchBar