import React from "react";
import { Link } from "react-router-dom";
import { useContextGlobal} from "./utils/global.context";



const Card = ({ instrumento }) => {

  const {state, dispatch} = useContextGlobal()

  const primerInstrumento = state.instrumentos[0];

// Imprime el objeto en la consola para inspeccionar su estructura
console.log(primerInstrumento);

  return (
    
    <div className="card">
             
      <img src={instrumento.image} alt="instrumento" width={' 100px'}  /> 

      <Link to={`/Detail/${instrumento.id}`}>
      <h2>{instrumento.nombre}</h2>
      </Link>



    </div>
  );
};

export default Card;