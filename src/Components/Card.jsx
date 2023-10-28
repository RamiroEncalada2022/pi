import React from "react";
import { Link } from "react-router-dom";
import { useContextGlobal} from "./utils/global.context";



const Card = ({ instrumento }) => {

  const {state, dispatch} = useContextGlobal()

  return (
    <Link to={`/Detail/${instrumento.id}`}>
      <div className="card">
        <img src={instrumento.imagenes[0]} alt="instrumento" width={' 100px'}  /> 

        <h4>{instrumento.nombre}</h4>
      </div>
    </Link>
  );
};

export default Card;