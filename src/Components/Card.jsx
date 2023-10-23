import React from "react";
import { Link } from "react-router-dom";
import { useContextGlobal} from "./utils/global.context";



const Card = ({ instrumento }) => {

  const {state, dispatch} = useContextGlobal()

  return (
    <div className="card">
             
      <img src={instrumento.url} alt="instrumento" width={' 100px'}  /> 

      <Link to={`/Detail/${instrumento.id}`}>
      <h2>{instrumento.title}</h2>
      </Link>

      <h3>{instrumento.albumId}</h3>

    </div>
  );
};

export default Card;
