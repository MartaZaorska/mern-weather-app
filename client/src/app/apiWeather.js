import api from './api';

const BASE_URL = 'https://api.openweathermap.org';

const apiWeather = api.injectEndpoints({
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: ({lat, lon, unit = "metric"}) => `${BASE_URL}/data/2.5/onecall?appid=${import.meta.env.VITE_API_KEY}&lat=${lat}&lon=${lon}&units=${unit}&lang=pl&exclude=minutely,hourly`
    })
  })
});

export const {
  useGetWeatherQuery
} = apiWeather;

export default apiWeather;