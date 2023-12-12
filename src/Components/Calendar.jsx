import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useContextGlobal } from './utils/global.context';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


import 'react-day-picker/dist/style.css';

const Calendar = ({ instrumentoSeleccionado }) => {
  const navigateTo = useNavigate();

  const [selectedRange, setSelectedRange] = useState({ from: null, to: null });
  const { state } = useContextGlobal();
  const unavailablePeriods = instrumentoSeleccionado?.fechasReservadas || [];


  const handleSelect = (range) => {
    setSelectedRange(range);
    //onDatesSelected(range.from, range.to);
    console.log("Rango seleccionado:", range);
    console.log("Fechas reservadas del instrumento:", instrumentoSeleccionado.fechasReservadas);
    
  };

  const handleReservation = () => {

    if (!state.loggedIn) {
      navigateTo('/login'); // Redirige al usuario a la página de inicio de sesión si no está logueado
      return;
    }

    if (selectedRange.from && selectedRange.to) {
      let isValid = true;
  
      unavailablePeriods.forEach((periodo) => {
        const fechaInicio = new Date(periodo.fechaInicio);
        const fechaFin = new Date(periodo.fechaFin);
  
        if (
          fechaInicio >= selectedRange.from && fechaInicio <= selectedRange.to ||
          fechaFin >= selectedRange.from && fechaFin <= selectedRange.to
        ) {
          isValid = false;
        }
      });
  
      if (isValid) {

        const formatDate = (date) => {
          const year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
    
          month = month < 10 ? `0${month}` : month;
          day = day < 10 ? `0${day}` : day;
    
          return `${year}-${month}-${day}`;
        };

        const reservationData = {
          fechaReserva: formatDate(new Date()), 
          fechaInicio: formatDate(selectedRange.from), 
          fechaFin: formatDate(selectedRange.to), 
          productos: [{ id: instrumentoSeleccionado.id }],
          usuario: { id: state.user.email },
          observaciones: "Entregar después del mediodía"
        };

        console.log(reservationData)

        navigateTo('/reservation', { state: reservationData });

        console.log('Reservado!!');
        
      } else {
        console.log('La fecha no es válida.');
      }
    } else {
      console.log('Por favor, selecciona un rango de fechas.');
    }
  };
  const getFormattedCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Agregar ceros a la izquierda si el mes o el día son menores que 10
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };
  return (
    <div>
      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={handleSelect}
        disabled={(day) => {
          const fechaActual = new Date(getFormattedCurrentDate());
          return day < fechaActual || unavailablePeriods.some(period => {
            const fechaInicio = new Date(period.fechaInicio);
            const fechaFin = new Date(period.fechaFin);
            return day >= fechaInicio && day <= fechaFin;
          });
        }}
        numberOfMonths={2}
      />
      <button onClick={handleReservation}>Reservar</button>
    </div>
  );
};

export default Calendar;
