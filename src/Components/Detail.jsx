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
    const [selectedDates, setSelectedDates] = useState([]);

    const handleDatesSelected = (startDate, endDate) => {
        setSelectedDates([startDate, endDate]);
        console.log('Fecha de inicio seleccionada:', startDate);
        console.log('Fecha de fin seleccionada:', endDate);
      };
    

    // Función para verificar la disponibilidad de fechas
const checkAvailability = () => {
    // Verifica si las fechas seleccionadas están en los períodos no disponibles
    const areDatesAvailable = selectedDates.every(date => {
        // Realiza la lógica de comparación con los períodos no disponibles (unavailablePeriods)
        // Retorna true si la fecha está disponible y false si no lo está
        return !instrumentoSeleccionado.fechasReservadas.some(period => {
            // Lógica de comparación para verificar si la fecha está en un período no disponible
            return date >= new Date(period.fechaInicio) && date <= new Date(period.fechaFin);
        });
    });

    if (areDatesAvailable) {
        // Las fechas están disponibles para reservar
        // Puedes proceder con la reserva
        console.log('Las fechas seleccionadas están disponibles');
        // Realizar la acción de reserva aquí
    } else {
        // Las fechas no están disponibles
        // Notificar al usuario que las fechas seleccionadas no están disponibles para reserva
        console.log('Las fechas seleccionadas no están disponibles para reserva');
    }
};

    

    var fragmentoID = window.location.pathname;

    // console.log(fragmentoID)

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
    console.log("Instrumento encontrado:", instrumentoSeleccionado);
    console.log("Imágenes del instrumento:", instrumentoSeleccionado.imagenes);
} else {
    console.log("No se encontró el elemento con ID:", soloNumeros);
}

    // console.log(elementoID)

    console.log(instrumentoSeleccionado.categoria)

    const handleReserveClick = () => {
        if (state.loggedIn) {
          if (selectedDates.length > 0 && instrumentoSeleccionado) {
            const areDatesAvailable = selectedDates.every((date) => {
              return !instrumentoSeleccionado.fechasReservadas.some(
                (period) =>
                  date >= new Date(period.fechaInicio) && date <= new Date(period.fechaFin)
              );
            });
    
            if (areDatesAvailable) {
              console.log('Las fechas seleccionadas están disponibles para reserva');
              navigateTo('/reservation');
            } else {
              console.log('Las fechas seleccionadas no están disponibles para reserva');
            }
          } else {
            console.log('Por favor, selecciona las fechas y/o un instrumento para la reserva');
          }
        } else {
          navigateTo('/login');
        }
      };

console.log("Fechas no habilitadas: " + instrumentoSeleccionado.fechasReservadas.map)

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
                    <img src={instrumentoSeleccionado.imagenes[1].url} alt="instrumento" />
                    <img src={instrumentoSeleccionado.imagenes[2].url} alt="instrumento" />
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
                    <img src={"https://img-c9-g2-bucket.s3.amazonaws.com/caracteristicas-nuevo.jpeg"} alt="instrumento" />
                    <img src={"https://img-c9-g2-bucket.s3.amazonaws.com/caracteristica-oferta.jpeg"} alt="instrumento" />
                    <img src={"https://img-c9-g2-bucket.s3.amazonaws.com/caracteristica-principiantes.jpeg"} alt="instrumento" />
                    <img src={"https://img-c9-g2-bucket.s3.amazonaws.com/caracteristicas-recibe-hoy.jpeg"} alt="instrumento" />
                </div>
            </div>
            <div>
                <Calendar unavailablePeriods={instrumentoSeleccionado.fechasReservadas} onDatesSelected={handleDatesSelected} />
            </div>
    <div className = {style.politicas}>
        <h2>Políticas</h2>
            <div className= {style.divPoliticas}>

                <div>
                    <h3>Política de Privacidad:</h3>
                    <p>En Sinfonía, nos comprometemos a proteger y respetar tu privacidad. Nuestra política de privacidad describe cómo recopilamos, utilizamos y protegemos la información personal que compartes con nosotros. Al utilizar nuestros servicios, aceptas las prácticas descritas en esta política. </p>
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
            <button onClick={handleReserveClick}>Reservar</button>
            </div>

        </div >



    );
};

export default Detail