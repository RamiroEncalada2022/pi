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
    

var fragmentoID = window.location.pathname;

    console.log(fragmentoID)

    function obtenerNumeros(elemento) {
        // Utiliza una expresión regular para encontrar todos los dígitos en el elemento
        var numeros = elemento.replace(/\D/g, '');
    
        // Convierte la cadena de números a un número entero
        var numeroEntero = parseInt(numeros, 10);
    
        // Devuelve el número entero
        return numeroEntero;
    }

    var soloNumeros = obtenerNumeros(fragmentoID)
    console.log(soloNumeros)


let instrumentoSeleccionado = state.instrumentos2.find(instrumento => instrumento.id === soloNumeros);

if (instrumentoSeleccionado) {
    // Hacer algo con el instrumento seleccionado, por ejemplo, mostrar sus imágenes
    console.log("Instrumento encontrado:", instrumentoSeleccionado);
    console.log("Imágenes del instrumento:", instrumentoSeleccionado.imagenes);
} else {
    console.log("No se encontró el elemento con ID:", soloNumeros);
}

    // console.log(elementoID)


    return (
        <div>

            <div className={style.tituloYFlecha}>
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
                    <img src={instrumentoSeleccionado.imagenes[1]} alt="instrumento" />
                    <img src={instrumentoSeleccionado.imagenes[2]} alt="instrumento" />
                </div>
            </div>

            <div className={style.modalDetail} >
                {/* <button onClick={() => setIsModalOpen(true)}>Ver más</button> */}
                <ModalGalery instrumento={instrumentoSeleccionado} />
            </div>

            <div className={style.descript}>
                <h2>Descripción</h2>
                <h4>{instrumentoSeleccionado.descripcion}</h4>
            </div>

            <div className={style.caracteristica}>
                <h2>Características</h2>
                <div className={style.imagenesCaracteristicas}>
                    <img src={"https://img-c9-g2-bucket.s3.amazonaws.com/caracteristicas-nuevo.jpeg"} alt="instrumento" />
                    <img src={"https://img-c9-g2-bucket.s3.amazonaws.com/caracteristica-oferta.jpeg"} alt="instrumento" />
                    <img src={"https://img-c9-g2-bucket.s3.amazonaws.com/caracteristica-principiantes.jpeg"} alt="instrumento" />
                    <img src={"https://img-c9-g2-bucket.s3.amazonaws.com/caracteristicas-recibe-hoy.jpeg"} alt="instrumento" />
                </div>
            </div>

        </div >



    );
};

export default Detail