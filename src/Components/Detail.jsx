import React, { useState } from 'react'
import { useContextGlobal } from './utils/global.context';
import CardDetail from "./CardDetail"
import ModalGalery from './ModalGalery';
import ModalCompartir from './ModalCompartir';
import style from "./Styles/Detail.module.css";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

import Calendar from './Calendar';


const Detail = () => {
    const navigateTo = useNavigate();
    const { state } = useContextGlobal();

// Suponiendo que el ID de tu producto sea instrumentoSeleccionado.id y cada característica tenga su ID en instrumentoSeleccionado.caracteristicas






    var fragmentoID = window.location.pathname;

    function obtenerNumeros(elemento) {
        // Utiliza una expresión regular para encontrar todos los dígitos en el elemento
        var numeros = elemento.replace(/\D/g, '');
    
        // Convierte la cadena de números a un número entero
        var numeroEntero = parseInt(numeros, 10);
    
        // Devuelve el número entero
        return numeroEntero;
    }

    var soloNumeros = obtenerNumeros(fragmentoID)



let instrumentoSeleccionado = state.instrumentos2.find(instrumento => instrumento.id === soloNumeros);

if (instrumentoSeleccionado) {
    // Hacer algo con el instrumento seleccionado, por ejemplo, mostrar sus imágenes
    //console.log("Instrumento encontrado:", instrumentoSeleccionado);
    //console.log("Imágenes del instrumento:", instrumentoSeleccionado.imagenes);
    let caracteristicasDelProducto = [];

if (instrumentoSeleccionado && instrumentoSeleccionado.caracteristicas) {
  // Obtener el ID del producto seleccionado
  const idProducto = instrumentoSeleccionado.id;

  // Filtrar las características en base al ID del producto
  caracteristicasDelProducto = state.caracteristicas.filter(caracteristica =>
    caracteristica.productos.some(producto => producto.id === idProducto)
  );
}

console.log("Características del producto:", caracteristicasDelProducto);
} else {
    console.log("No se encontró el elemento con ID:", soloNumeros);
}

const hasImages = instrumentoSeleccionado && instrumentoSeleccionado.imagenes && instrumentoSeleccionado.imagenes.length > 0;

//console.log("Fechas no habilitadas: " + instrumentoSeleccionado.fechasReservadas.map)

    return (
        <div className= {style.contenedorDetail}>

            <div className={style.tituloYFlecha}>
                
                <h2 className= {style.titulo}>{instrumentoSeleccionado.nombre}</h2>
                <Link className={style.flecha} to="/">
                    <FontAwesomeIcon icon={faArrowLeft} className={style.arrow} />
                </Link>


            </div>

                <div className= {style.modalCompartir}>
                <div className= {style.btnCompartir}>
                <ModalCompartir  instrumento={instrumentoSeleccionado} icon={faShareSquare} />
                </div>

            <div className={style.grande}>

                <div className={style.imagenGrande}>

                    <CardDetail instrumento={instrumentoSeleccionado} />

                </div>

                    <div className={style.imagenesChicas}>
                        {hasImages ? (
                            <img src={instrumentoSeleccionado.imagenes[1].url} alt="instrumento" />
                            ) : (
                                <img src="https://www.yiwubazaar.com/resources/assets/images/default-product.jpg" alt="imagen por defecto" width={'250px'} />
                              )}
                              {hasImages ? (
                            <img src={instrumentoSeleccionado.imagenes[2].url} alt="instrumento" />
                            ) : (
                                <img src="https://www.yiwubazaar.com/resources/assets/images/default-product.jpg" alt="imagen por defecto" width={'250px'} />
                              )}


                </div>
            </div>

            </div>

            <div className={style.modalDetail} >
                {/* <button onClick={() => setIsModalOpen(true)}>Ver más</button> */}
                <ModalGalery instrumento={instrumentoSeleccionado} />
            </div>

            <div className={style.descript}>
                <h2>Descripción</h2>
                <p>{instrumentoSeleccionado.descripcion}</p>
            </div>

            <div className={style.caracteristica}>
      <h2>Características</h2>
      <div className={style.imagenesCaracteristicas}>
        {instrumentoSeleccionado && instrumentoSeleccionado.caracteristicas ? (
          instrumentoSeleccionado.caracteristicas.map((caracteristica) => (
            <div key={caracteristica.id}>
              <img src={caracteristica.urlIcono} alt={caracteristica.nombre} />
              <p>{caracteristica.nombre}</p>
              {console.log("Nombre de caracteristicas: " + caracteristica.nombre)}
            </div>
          ))
        ) : (
          <p>No hay características disponibles</p>
        )}
      </div>
    </div>
            <div>
                <Calendar instrumentoSeleccionado={instrumentoSeleccionado} />
            </div>
    <div className = {style.politicas}>
        <h2>Políticas</h2>
            <div className= {style.divPoliticas}>

                <div>
                    <h3>Política de Privacidad:</h3>
                    <p>En Sinfonía, nos comprometemos a proteger y respetar tu privacidad. Nuestra política de privacidad describe cómo recopilamos, utilizamos y protegemos la información personal que compartes con nosotros. Al utilizar nuestros servicios, aceptas las prácticas descritas en esta política. </p>
                    <a href="https://faq.whatsapp.com/1148840052398648/?helpref=hc_fnav" target="_blank">Privacidad de whatssap</a>
                </div>

                <div>
                    <h3>Términos y Condiciones:</h3>
                    <p>Al utilizar Sinfonía, aceptas nuestros términos y condiciones. Esto incluye la responsabilidad de cuidar adecuadamente los instrumentos alquilados, cumplir con los plazos de devolución y aceptar cualquier cargo por daños o pérdidas. Nos reservamos el derecho de cancelar reservas en caso de incumplimiento de estos términos y condiciones. </p>
                </div>

                <div>
                    <h3>Devolución y Reembolso:</h3>
                    <p>Nuestra política de devolución y reembolso establece que puedes cancelar una reserva con un aviso previo determinado y recibir un reembolso completo o parcial según corresponda. Los reembolsos están sujetos a condiciones específicas y pueden estar sujetos a tarifas de cancelación.</p>
                </div>

                <div>
                    <h3>Protección de Datos:</h3>
                    <p>En Sinfonía, nos comprometemos a proteger tu información personal y a cumplir con las regulaciones de protección de datos. No compartiremos tu información con terceros sin tu consentimiento. Tu información se almacenará y procesará de manera segura de acuerdo con las leyes de privacidad de datos vigentes.</p>
                </div>

                <div>
                    <h3>Seguridad de Pagos:</h3>
                    <p>En Sinfonía, nos comprometemos a garantizar la seguridad de tus transacciones. Utilizamos métodos de pago seguros y encriptados para proteger tu información financiera durante el proceso de reserva. No almacenamos los detalles de tu tarjeta de crédito ni compartimos tu información financiera con terceros sin tu consentimiento explícito. </p>
                </div>

                <div>
                    <h3>Responsabilidad del Usuario:</h3>
                    <p>Los usuarios de Sinfonía son responsables de mantener la integridad y el cuidado adecuado de los instrumentos musicales durante el período de alquiler. Cualquier daño, pérdida o robo del instrumento debe ser informado inmediatamente. Los usuarios son responsables de los costos asociados con daños o pérdidas que ocurran durante el período de alquiler.</p>
                </div>
    

            </div>

            </div>

        </div >



    );
};

export default Detail