import { memo, useMemo } from 'react';
import { UNITS } from '../data/constants';

import { DAYS } from '../data/constants';

function Daily({ data, unit, timezoneOffset }) {
  const { dt, weather, temp: { day, night } } = data;
  const { description, icon } = weather[0];
  
  const date = useMemo(() => {
    const date = new Date(dt * 1000 + timezoneOffset * 1000 + new Date().getTimezoneOffset() * 60000);
    return {
      day: DAYS[date.getDay()],
      text: `${`${date.getDate()}`.padStart(2, "0")}.${`${date.getMonth() + 1}`.padStart(2, "0")}.${date.getFullYear()}`
    };
  }, [dt, timezoneOffset]);

  return (
    <div className="daily">
      <header className="daily__header">
        <h4>{date.day}, {date.text}</h4>
      </header>
      <div className="daily__content">
        <p className="daily__temp">
          <img src={`https://openweathermap.org/img/wn/${icon}@4x.png`} alt="weather icon" />
          <span>{day.toFixed(1)}{UNITS.temp[unit]} / {night.toFixed(1)}{UNITS.temp[unit]}</span>
        </p>
        <p className="daily__description">{description}</p>
      </div>
    </div>
  )
}

export default memo(Daily)