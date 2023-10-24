import React from "react";
import { Link } from "react-router-dom";
import { useContextGlobal} from "./utils/global.context";



const Card = ({ instrumento }) => {

  const {state, dispatch} = useContextGlobal()

  return (
    <div className="card">
             
      <img src={instrumento.image} alt="instrumento" width={' 100px'}  /> 

      <Link to={`/Detail/${instrumento.id}`}>
      <h2>{instrumento.name}</h2>
      </Link>

      <h3>{instrumento.created}</h3>

    </div>
  );
};

export default Card;
