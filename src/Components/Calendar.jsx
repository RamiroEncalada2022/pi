import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Calendar = ({ unavailablePeriods, onDatesSelected }) => {
  const [selectedRange, setSelectedRange] = useState({ from: null, to: null });

  const handleSelect = (range) => {
    setSelectedRange(range);
    onDatesSelected(range.from, range.to);
  };

  const handleReservation = () => {
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
        console.log('Reservado!!');
      } else {
        console.log('La fecha no es válida.');
      }
    } else {
      console.log('Por favor, selecciona un rango de fechas.');
    }
  };

  return (
    <div>
      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={handleSelect}
        disabled={(day) => unavailablePeriods.some(period => {
          const fechaInicio = new Date(period.fechaInicio);
          const fechaFin = new Date(period.fechaFin);
          return day >= fechaInicio && day <= fechaFin;
        })}
        numberOfMonths={2}
      />
      <button onClick={handleReservation}>Reservar</button>
    </div>
  );
};

export default Calendar;
