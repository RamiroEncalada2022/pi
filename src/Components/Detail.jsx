import React from 'react'
import { useContextGlobal } from './utils/global.context';
import CardDetail from "./CardDetail"
import ModalGalery from './ModalGalery';
import style from "./Styles/Detail.module.css";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const Detail = () => {

    const { state } = useContextGlobal();
    const elementoID = state.instrumentos2[0].id;

    console.log(elementoID)


    const instrumentoSeleccionado = state.instrumentos2.find(instrumento => instrumento.id === elementoID);

    if (!instrumentoSeleccionado) {
        return <div>No se encontró el elemento</div>;
    }

    return (
        <div>

            <div div className={style.tituloYFlecha}>
                {/* <h2>Nombre</h2> */}
                <h2>{state.instrumentos2[0].nombre}</h2>
                <Link className={style.flecha} to="/">
                    <FontAwesomeIcon icon={faArrowLeft} className={style.arrow} />
                </Link>
            </div>
            <div className={style.grande}>

                <div className={style.imagenGrande}>

                    <CardDetail instrumento={instrumentoSeleccionado} />

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
                <h2>Descripción</h2>
                {<td>{state.instrumentos2[0].descripcion}</td>}
            </div>

            <div className={style.caracteristica}>
                <h2>Características</h2>
                <div className={style.imagenesCaracteristicas}>
                    <img src={"https://img-c9-g2-bucket.s3.amazonaws.com/Microfono.jpg"} alt="instrumento" />
                    <img src={"https://img-c9-g2-bucket.s3.amazonaws.com/Microfono.jpg"} alt="instrumento" />
                    <img src={"https://img-c9-g2-bucket.s3.amazonaws.com/Microfono.jpg"} alt="instrumento" />
                    <img src={"https://img-c9-g2-bucket.s3.amazonaws.com/Microfono.jpg"} alt="instrumento" />
                </div>
            </div>

        </div >



    );
};

export default Detail