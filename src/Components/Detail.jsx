import React, { useEffect, useState } from "react";
import { useContextGlobal } from "./utils/global.context";
import style from "./Styles/Detail.module.css";
import { Link, useParams } from "react-router-dom";
import ModalGalery from "./ModalGalery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Detail = () => {

	const { state, dispatch } = useContextGlobal()
	const [loading, setLoading] = useState(true)
	const { id } = useParams()
	const { nombre, descripcion, imagenes } = state.instrumentos2
	console.log("Que me trae " )
	console.log(state.instrumentos2)
	console.log(id)
	const url = 'http://localhost:8080/api/producto/' + id

	useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
	  console.log("QUe tengo aca: " + data)
      //dispatch({ type: "GET_INSTRUMENTOS_2", payload: data });
      setLoading(false);
    } catch (error) {
      console.error('Se produjo el error:', error);
    }
  };
  fetchData();
}, [dispatch, id, url]);

	// const [prod, setProd] = useState(null);

	// useEffect(() => {
	//   fetch("http://localhost:8080/api/producto")
	//   .then(res => res.json())
	//   .then(data =>{
	// 	console.log(data);
	// 	 const product = {
	// 		imagenes: data.results[0].imagenes
	// 	 }

	// 	setProd(product);
	// 	});
	// },[]);



	console.log(imagenes)

	return (

		<div>
			<div className={style.tituloYFlecha}>
				<h2>{nombre}</h2>
				<Link className={style.flecha} to="/">
					<FontAwesomeIcon icon={faArrowLeft} className={style.arrow} />
				</Link>
			</div>

			<div className={style.grande}>

				<div className={style.imagenGrande}>


					{/* <div> {imagenes.map((image) => (<div key={image.id}><img src={image.imagenes} alt={image.alt} />        
					</div>))}     </div> */}

					<img src={imagenes} alt="instrumento" />

				</div>

				<div className={style.imagenesChicas}>
					<img src={"https://img-c9-g2-bucket.s3.amazonaws.com/Microfono.jpg"} alt="instrumento" />
					<img src={"https://img-c9-g2-bucket.s3.amazonaws.com/Microfono.jpg"} alt="instrumento" />
					<img src={"https://img-c9-g2-bucket.s3.amazonaws.com/Microfono.jpg"} alt="instrumento" />
					<img src={"https://img-c9-g2-bucket.s3.amazonaws.com/Microfono.jpg"} alt="instrumento" />
				</div>


			</div>

			<div className={style.modalDetail} >
				{/* <button onClick={() => setIsModalOpen(true)}>Ver más</button> */}
				<ModalGalery />
			</div>

			<div className={style.descript}>
				<h2>Descripcion</h2>
				<td>{descripcion}</td>
			</div>

		</div>
	);
};

export default Detail;