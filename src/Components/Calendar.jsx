import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ unavailablePeriods }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const unavailableDates = [];
  if (unavailablePeriods && unavailablePeriods.length > 0) {
    for (let i = 0; i < unavailablePeriods.length; i++) {
      const start = new Date(unavailablePeriods[i].fechaInicio);
      const end = new Date(unavailablePeriods[i].fechaFin);

      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        unavailableDates.push(new Date(date));
      }
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '600px' }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          monthsShown={2}
          excludeDates={unavailableDates}
          inline
          customDayClassName={(date) =>
            unavailableDates.some((unavailableDate) => date.getTime() === unavailableDate.getTime())
              ? 'unavailable'
              : null
          }
        />
      </div>
    </div>
  );
};

export default Calendar;
