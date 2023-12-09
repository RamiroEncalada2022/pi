import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useContextGlobal } from '../Components/utils/global.context';
import axios from 'axios';



const Reservation = () => {
  const location = useLocation();
  const reservationData = location.state;
  const navigateTo = useNavigate();
  const { state } = useContextGlobal();
  
  window.scrollTo(0, 0)
  if (!state.loggedIn) {
    navigateTo('/');
    return null
    }

    const handleConfirm = async () => {
      try {
        const userInfo = getUserInfo(); // Obtener información del usuario
        const productData = getProductData(); // Obtener detalles del producto
        const fechaInicio = reservationData.fechaInicio; // Obtener fecha de inicio de la reserva
        const fechaFin = reservationData.fechaFin; // Obtener fecha de fin de la reserva
    
        // Realizar la solicitud POST a la API de reservas
        const response = await axios.post('http://localhost:8080/api/reservas/registrar', {
          fechaReserva: new Date().toISOString().split('T')[0], // Fecha de reserva actual
          fechaInicio,
          fechaFin,
          productos: [{ id: productData.id }], // Enviar el ID del producto seleccionado
          usuario: { id: userInfo.id }, // Enviar el ID del usuario
          observaciones: "Entregar después del mediodía",
          // Puedes ajustar las observaciones según sea necesario
        });
    
        if (response.status === 200) {
          console.log('Reserva confirmada');
          navigateTo('/');
        }
      } catch (error) {
        console.error('Error al realizar la reserva:', error);
        // Manejo de errores (mostrar mensajes, redirigir, etc.)
      }
    };

  const handleCancel = () => {
    console.log('Reserva cancelada');
    navigateTo('/');
  };

  const reservationStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    maxWidth: '600px',
    margin: 'auto',
    marginTop: '30px',
    textAlign: 'center',
  };

  const buttonStyle = {
    margin: '10px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
  };

  const getProductData = () => {
    const productId = reservationData.productos[0].id; // Obtener el primer producto
    const instrumento = state.instrumentos2.find((instrumento) => instrumento.id === productId);
    return instrumento ? instrumento : 'Nombre no encontrado';
  };

  const getUserInfo = () => {
    // Verificar si el usuario está logueado
    if (state.loggedIn) {
      const userInfo = state.user;

      return userInfo; 
    } else {

      return null; 
    }
  };

  const userInfo = getUserInfo(); // Obtener la información del usuario


  const productData = getProductData();


  return (
    <div style={reservationStyle}>
      <h2>¡Esta es tu reserva!</h2>
      <h3>Detalles del Usuario</h3>
      <p>Nombre: {userInfo.name}</p>
      <p>Apellido: {userInfo.surname}</p>
      <h3>Detalles del producto</h3>
      <img src={productData.imagenes[1].url} alt="instrumento" width={90} />
      <p>Nombre: {productData.nombre}</p>
      <p>Detalle: {productData.descripcion}</p>


      <p>Desde: {reservationData.fechaInicio}</p>
      <p>Hasta: {reservationData.fechaFin}</p>

      <div>
        <button style={buttonStyle} onClick={handleConfirm}>Confirmar</button>
        <button style={buttonStyle} onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default Reservation;
