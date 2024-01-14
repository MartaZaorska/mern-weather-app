import { memo } from 'react';
import { Link } from 'react-router-dom';

import { UNITS } from '../data/constants';

//<img src={`./public/${ICONS[data.weather.icon]}`} alt="weather icon" />

function Location({ data, unit = "metric" }) {
  return (
    <Link className="location__link" to={`/weather`} state={{ lat: data.lat, lon: data.lon, name: data.name, country: data.country }}>
      {data.weather && <span className="location__temp"><img src={`https://openweathermap.org/img/wn/${data.weather.icon}@4x.png`} alt="weather icon" />{data.weather.temp.toFixed(1)}{UNITS.temp[unit]}</span>}
      <div>
        {data.weather && <span className="location__description">{data.weather.description}</span>}
        <span className="location__name">{data.name}</span>
      </div>
    </Link>
  )
}

export default memo(Location);