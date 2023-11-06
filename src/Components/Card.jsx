import React from "react";
import { Link } from "react-router-dom";
import { useContextGlobal} from "./utils/global.context";
import style from "./Styles/Card.module.css"


const Card = ({ instrumento }) => {

  const {state, dispatch} = useContextGlobal()

  const primerInstrumento = state.instrumentos[0];

// Imprime el objeto en la consola para inspeccionar su estructura
console.log(primerInstrumento);

  return (
    
    <div className={style.card}>
             
      <img src={instrumento.imagenes[0]} alt="instrumento" width={' 100px'}  /> 

      <Link to={`/Detail/${instrumento.id}`}>
      <h2 className={style.tituloCard}>{instrumento.nombre}</h2>
      </Link>



    </div>
  );
};

export default Card;