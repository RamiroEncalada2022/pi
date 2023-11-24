import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ unavailablePeriods }) => {
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const unavailableDates = [];
  if (unavailablePeriods && unavailablePeriods.length > 0) {
    for (let i = 0; i < unavailablePeriods.length; i++) {
      const startDate = new Date(unavailablePeriods[i].fechaInicio);
      const endDate = new Date(unavailablePeriods[i].fechaFin);

      for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        unavailableDates.push(new Date(date));
      }
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '600px' }}>
        <DatePicker
          selected={today}
          selectsStart
          startDate={today}
          endDate={today}
          excludeDates={unavailableDates}
          inline
          customDayClassName={(date) =>
            unavailableDates.some((unavailableDate) => date.getTime() === unavailableDate.getTime())
              ? 'unavailable'
              : null
          }
        />
        <DatePicker
          selected={nextMonth}
          selectsStart
          startDate={nextMonth}
          endDate={nextMonth}
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
