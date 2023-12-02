import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ unavailablePeriods, onDatesSelected }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date.getTime() > endDate.getTime()) {
      setEndDate(null);
    }
    console.log('Start Date Selected:', date);
  };

  const handleEndDateChange = (date) => {
    if (!startDate || date.getTime() >= startDate.getTime()) {
      setEndDate(date);
    }
    console.log('End Date Selected:', date);
  };

  const handleReserve = () => {
    if (onDatesSelected) {
      onDatesSelected(startDate, endDate);
      console.log('Dates Selected:', startDate, endDate);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '600px' }}>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          inline
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          inline
          placeholderText="End Date"
        />
        {/* Agregamos un botón para verificar la selección de fechas */}
        <button onClick={handleReserve}>Check Dates</button>
      </div>
    </div>
  );
};

export default Calendar;
