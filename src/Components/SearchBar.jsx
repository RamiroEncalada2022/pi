import React, { useState } from 'react';
import { useContextGlobal } from './utils/global.context';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import style from './Styles/SearchBar.module.css';

const SearchBar = () => {
  const { state, dispatch } = useContextGlobal();
  const { instrumentos2, searchText } = state;
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleInputChange = (e) => {
    const userInput = e.target.value.toLowerCase();
    setSearchInput(userInput);
  
    if (userInput.trim() !== '') {
      const filteredResults = instrumentos2.filter((instrumento) => {
        const nombreMatches = removeAccents(instrumento.nombre.toLowerCase()).includes(removeAccents(userInput));
  
        // Verifica si el nombre coincide y ninguna fecha reservada coincide con el rango seleccionado
        const isAvailable = !instrumento.fechasReservadas.some(({ fechaInicio, fechaFin }) => {
          const startDateMatch = startDate && new Date(fechaInicio) <= startDate;
          const endDateMatch = endDate && new Date(fechaFin) >= endDate;
          return startDateMatch && endDateMatch;
        });
        console.log(`Nombre: ${instrumento.nombre}, Disponible: ${isAvailable}`); // Imprime el nombre y si está disponible
  
        return nombreMatches && isAvailable;
      });
  
      console.log("Productos disponibles: ", filteredResults); // Imprime los productos disponibles
  
      setSearchResults(filteredResults);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };
  
  const handleSearch = () => {
    dispatch({ type: 'SET_SEARCH_TEXT', payload: searchInput });
    setShowResults(false);
  };

  const handleResultClick = (result) => {
    setSearchInput(result.nombre);
    dispatch({ type: 'SET_SEARCH_TEXT', payload: result.nombre });
    setSearchResults([]);
    setShowResults(false);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
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
      
      <div className={style.datePickers}>
        <div className={style.datePicker}>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            placeholderText="Fecha de inicio"
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className={style.datePicker}>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            placeholderText="Fecha de fin"
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
