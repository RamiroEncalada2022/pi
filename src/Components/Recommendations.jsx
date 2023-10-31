import React from 'react'
import style from "./Styles/Recommendations.module.css"
import { useContextGlobal } from './utils/global.context'
import { Link } from 'react-router-dom'
import Card from "./Card"

const Recommendations = () => {
  const { state } = useContextGlobal();
  const instrumentosRandom = [];
  const numItems = 10; 
  
  const shuffled = state.instrumentos2.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, numItems);
  
 
  for (let instrumento of selected) {
    while (instrumentosRandom.includes(instrumento)) {
      shuffled.sort(() => 0.5 - Math.random());
      selected = shuffled.slice(0, numItems);
    }
  }
  
  instrumentosRandom.push(...selected);
  console.log(instrumentosRandom)


  return (
    <div className={style.container}>
      {instrumentosRandom.map((instrumento) => (
        <Card key={instrumento.id} instrumento={instrumento} />
      )).slice(0, 10)}
      <Link to="/ListaInstrumentos">
      <button>Lista Completa</button>
      </Link>
    </div>
  );
};

export default Recommendations;