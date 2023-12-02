import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Styles/Whatssap.module.css';

const Whatssap = () => {
  const handleWhatsAppClick = () => {
    // Simulación de número de teléfono y mensaje
    const phoneNumber = '5493513245827';
    const message = 'Estoy interesado en alquilar';

    // Verificar si hay conexión
    if (!navigator.onLine) {
      mostrarError('No hay conexión. Por favor, revisa tu conexión a Internet.');
      return;
    }

    // Verificar si el número de teléfono es válido (solo una simulación, deberías validar según tus requisitos)
    if (!phoneNumber || !/^\d+$/.test(phoneNumber)) {
      mostrarError('Número de teléfono no válido');
      return;
    }

    // Intentar abrir WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');

    // Notificación de éxito
    mostrarNotificacion('Mensaje enviado correctamente');
  };

  // Función para mostrar notificaciones de éxito o error
  const mostrarNotificacion = (mensaje) => {
    toast.success(mensaje, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // Función para mostrar mensajes de error
  const mostrarError = (mensaje) => {
    toast.error(mensaje, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div className={styles.containerBoton}>
      <a href="#!" onClick={handleWhatsAppClick}>
        <img className={styles.boton} src="whatssap.png" alt="" />
      </a>
      {/* ToastContainer para mostrar las notificaciones */}
      <ToastContainer />
    </div>
  );
};

export default Whatssap;




