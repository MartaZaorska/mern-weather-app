import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoSearch, GoLocation } from "react-icons/go";

const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${import.meta.env.VITE_API_KEY}&lang=pl`;

function Search({ unit }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchLocationHandler = (e) => {
    e.preventDefault();

    const location = e.target.elements.location?.value || "";
    if(!location) return;

    e.target.reset();
    findLocation(`&q=${location}`);
  }

  const findLocation = async (query) => {
    try {
      const res = await fetch(`${API_URL}${query}&units=${unit}`);
      const data = await res.json();

      if(data.length === 0){
        window.alert("Brak lokalizacji");
        return;
      }

      const locationDetails = {
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country
      };

      const { addSearchLocation } = await import("../app/appSlice");
      dispatch(addSearchLocation(locationDetails));

      navigate('/weather', { state: { lat: locationDetails.lat, lon: locationDetails.lon, name: locationDetails.name, country: locationDetails.country }});
    }catch(err){
      window.alert(err);
    }
  }

  const getCurrentPosition = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          findLocation(`&lat=${latitude}&lon=${longitude}`);
        }, 
        () => window.alert('Nie uzyskano dostępu do lokalizacji')
      );
    }
  }

  return (
    <form className="search__form" onSubmit={searchLocationHandler}>
      <button type="button" onClick={getCurrentPosition}><GoLocation className="icon" /></button>
      <input type="text" placeholder="Wyszukaj lokalizacje..." name="location" />
      <button type="submit"><GoSearch className="icon" /></button>
    </form>
  )
}

export default memo(Search);