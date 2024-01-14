import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from "react";

import { useGetWeatherQuery } from '../app/apiWeather';
import { useAddLocationMutation } from '../app/apiLocation';
import { setWeather } from '../app/appSlice';

import Loader from '../components/Loader';
import Daily from '../components/Daily';

import { UNITS } from '../data/constants';

export function Component(){
  const dispatch = useDispatch();

  const { state } = useLocation();
  const { user, saveLocations } = useSelector(state => state.app);
  const [addLocation] = useAddLocationMutation();

  const { data, error, isLoading } = useGetWeatherQuery({ lat: state.lat, lon: state.lon, unit: user?.unit || "metric" });

  const isSaved = useMemo(() => {
    if(!user) return false;
    return saveLocations.find(item => (item.lat === `${state.lat}` && item.lon === `${state.lon}`) || (state.name === item.name && state.country === item.country)) ? true : false;
  }, [saveLocations, state.lat, state.lon, state.name, state.country, user]);

  useEffect(() => {
    if(data){
      dispatch(setWeather({ 
        lat: state.lat, 
        lon: state.lon, 
        weather: { 
          description: data.current?.weather?.[0]?.description, 
          temp: data.current?.temp, 
          icon: data.current?.weather?.[0]?.icon 
        } 
      }));
    }
  }, [data]);

  const saveLocationHandler = async () => {
    try {
      const res = await addLocation(state).unwrap();
      const { addSaveLocation } = await import("../app/appSlice");
      const location = res.locations.find(item => item.lat === `${state.lat}` && item.lon === `${state.lon}`);
      dispatch(addSaveLocation({
        ...location,
        weather: { description: data.current?.weather?.[0]?.description, temp: data.current?.temp, icon: data.current?.weather?.[0]?.icon }
      }));
    }catch(err){
      window.alert(err);
    }
  }

  if(isLoading) return <Loader />

  if(error){
    console.log(error);
    return <Navigate to="/" />
  }

  const { current, daily, timezone_offset } = data;

  return (
    <section className="weather">
      <header className="weather__header">
        <h2>Pogoda {state.name}</h2>
        {user && !isSaved && <button onClick={saveLocationHandler}>Zapisz lokalizację</button>}
      </header>
      <div className="weather__content">
        <div className="current">
          <h4>{current.weather[0].description}</h4>
          <div className="current__temp">
            <img src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`} alt="weather icon" />
            <div>
              <h3>{current.temp.toFixed(1)}{UNITS.temp[user?.unit || "metric"]}</h3>
              <p>Odczuwalna: <span>{current.feels_like.toFixed(1)}{UNITS.temp[user?.unit || "metric"]}</span></p>
            </div>
          </div>
          <div className="current__content">
            <ul>
              <li>
                <span>Wilgotność</span>
                <mark>{current.humidity}%</mark>
              </li>
              <li>
                <span>Zachmurzenie</span>
                <mark>{current.clouds}%</mark>
              </li>
              <li>
                <span>Ciśnienie</span>
                <mark>{current.pressure} hPa</mark>
              </li>
              <li>
                <span>Wiatr</span>
                <mark>{current.wind_speed} {UNITS.wind_speed[user?.unit || "metric"]}</mark>
              </li>
              <li>
                <span>Deszcz</span>
                <mark>{daily[0].rain || 0} mm</mark>
              </li>
              {daily[0].snow && (
                <li>
                  <span>Śnieg</span>
                  <mark>{daily[0].snow} mm</mark>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="week">
          {daily.map((item) => (
            <Daily timezoneOffset={timezone_offset} unit={user?.unit || "metric"} data={item} key={item.dt} />
          ))}
        </div>
      </div>
    </section>
  )
}

Component.displayName = "Weather";

export default Component;