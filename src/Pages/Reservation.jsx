import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useContextGlobal } from '../Components/utils/global.context';



const Reservation = () => {
  const location = useLocation();
  const reservationData = location.state;
  const navigateTo = useNavigate();
  const { state } = useContextGlobal();


  const handleConfirm = () => {
    console.log('Reserva confirmada');
    navigateTo('/');
  };

  const handleCancel = () => {
    console.log('Reserva cancelada');
    navigateTo('/');
  };

  const reservationStyle = {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '50px',
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

  const getProductNames = () => {
    return reservationData.productos.map((productoId) => {
      const instrumento = state.instrumentos2.find((instrumento) => instrumento.id === productoId);
      return instrumento ? instrumento.nombre : 'Nombre no encontrado';
    });
  };

  const productNames = getProductNames();


  return (
    <div style={reservationStyle}>
      <h2>¡Esta es tu reserva!</h2>
      {productNames.length > 0 ? (
        <div>
          <p>Has reservado:</p>
          <ul>
            {productNames.map((nombre, index) => (
              <li key={index}>{nombre}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No has reservado ningún producto.</p>
      )}

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
