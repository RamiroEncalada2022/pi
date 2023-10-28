import React from "react";
import { Link } from "react-router-dom";
import { useContextGlobal} from "./utils/global.context";



const Card = ({ instrumento }) => {

  const {state, dispatch} = useContextGlobal()

  return (
    <div className="card">
             
      <img src={instrumento.imagenes[0]} alt="instrumento" width={' 100px'}  /> 

      <Link to={`/Detail/${instrumento.id}`}>
      <h2>{instrumento.nombre}</h2>
      </Link>



    </div>
  );
};

export default Card;