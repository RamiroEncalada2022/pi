import React, { useState, useEffect, useContext } from 'react';
import style from './Styles/Recommendations.module.css';
import { useContextGlobal } from './utils/global.context';
import { Link } from 'react-router-dom';
import Card from './Card';

const Recommendations = () => {
  const { state } = useContextGlobal();
  const [instrumentosRandom, setInstrumentosRandom] = useState([]);

  const generateRandomInstruments = () => {
    const numItems = 10;
    const shuffled = state.instrumentos2.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numItems);
    setInstrumentosRandom(selected);
  };

  useEffect(() => {
    generateRandomInstruments();
  }, [state.instrumentos2]); 

  return (
    <div className={style.container}>
      <h2 className={style.subtitulo}>PRODUCTOS RECOMENDADOS</h2>
      <div className={style.containerCards}>
        {instrumentosRandom.map((instrumento) => (
          <Card key={instrumento.id} instrumento={instrumento} />
        ))}
      </div>
      <Link to="/ListaInstrumentos">
        <button className={style.firstButton}>Lista Completa</button>
      </Link>
    </div>
  );
};

export default Recommendations;
