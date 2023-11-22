import React, { useState } from 'react';
import { useContextGlobal } from './utils/global.context';
import style from "./Styles/SearchBar.module.css";

const SearchBar = () => {
  const { state, dispatch } = useContextGlobal();
  const { instrumentos2, searchText } = state;
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // Estado para controlar la visibilidad del feedback

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleInputChange = (e) => {
    const userInput = e.target.value.toLowerCase();
    setSearchInput(userInput);

    if (userInput.trim() !== '') {
      const filteredResults = instrumentos2.filter((instrumento) =>
        removeAccents(instrumento.nombre.toLowerCase()).includes(removeAccents(userInput))
      );
      setSearchResults(filteredResults);
      setShowResults(true); // Mostrar resultados al escribir
    } else {
      setSearchResults([]);
      setShowResults(false); // Ocultar resultados si no hay entrada
    }
  };

  const handleSearch = () => {
    dispatch({ type: 'SET_SEARCH_TEXT', payload: searchInput });
    setShowResults(false); // Deshabilitar el feedback al presionar el botón de búsqueda
  };

  const handleResultClick = (result) => {
    setSearchInput(result.nombre);
    dispatch({ type: 'SET_SEARCH_TEXT', payload: result.nombre });
    setSearchResults([]);
    setShowResults(false); // Deshabilitar el feedback al seleccionar un resultado
  };

  return (
    <div className={style.searchBar}>
      <h2>Busca entre los cientos de instrumentos que tenemos para ti:</h2>
      <div className={style.inputSearch}>
        <input 
          type="text"
          placeholder="Buscar..."
          value={searchInput}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div> 

      {/* Mostrar los resultados si showResults es true */}
      {showResults && searchResults.length > 0 && (
        <div className={style.searchResults}>
          {searchResults.map((result) => (
            <p key={result.id} onClick={() => handleResultClick(result)}>
              {result.nombre}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;