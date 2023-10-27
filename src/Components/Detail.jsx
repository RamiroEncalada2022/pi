import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import style from "./Styles/Detail.module.css";
import ModalGalery from "./ModalGalery";

const Detail = () => {
	const [instrumento, setInstrumento] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

	const params = useParams();
	// Consumiendo el parametro dinamico de la URL deberan hacer un fetch a un instrumento en especifico
	const url = "https://jsonplaceholder.typicode.com/photos/" + params.id;

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setInstrumento(data);
			});
	}, []);

	return (
		<div>
      <div className={style.title}>
        <h1>{instrumento.title} </h1>
        <Link to="/" >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={style.arrow}
          />
        </Link>
      </div>

			<div className={style.flex}>
        <div className={style.big}>
          <img
            src={instrumento.url}
            alt="instrumento"
            width={" 100px"}
          />
        </div>
				
        <div className={style.small}>
          <div>
            <img
              src={instrumento.url}
              alt="instrumento"
              width={" 100px"}
              
            />
            <img
              src={instrumento.url}
              alt="instrumento"
              width={" 100px"}
              
            />
          </div>
          <div className={style.smallOne}>
            <img
              src={instrumento.url}
              alt="instrumento"
              width={" 100px"}
              
            />
            <img
              src={instrumento.url}
              alt="instrumento"
              width={" 100px"}
                          />
          </div>
          <button onClick={() => setIsModalOpen(true)}>Ver más</button>
      <ModalGalery isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
        </div>
			</div>

      <p>{instrumento.description}</p>
		</div>
	);
};

export default Detail;
