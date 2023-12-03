import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';


const Calendar = ({ unavailablePeriods, onDatesSelected }) => {
  const [selectedRange, setSelectedRange] = useState({ from: null, to: null });

  const handleSelect = (range) => {
    setSelectedRange(range);
    onDatesSelected(range.from, range.to);
  };

  const isDayUnavailable = (day) => {
    const unavailablePeriod = unavailablePeriods.find((period) =>
      day >= new Date(period.fechaInicio) && day <= new Date(period.fechaFin)
    );
    return unavailablePeriod ? true : false;
  };
  
  


  return (
    <div>
      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={handleSelect}
      disabled={isDayUnavailable}
              numberOfMonths={2} // Muestra dos meses en el calendario para permitir la selección de un rango
      />
    </div>
  );
};

export default Calendar;

