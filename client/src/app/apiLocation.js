import api from './api';

const LOCATION_URL = 'https://mern-weather-app-backend.vercel.app/api/location';

const apiLocation = api.injectEndpoints({
  endpoints: (builder) => ({
    addLocation: builder.mutation({
      query: (data) => ({
        url: `${LOCATION_URL}`,
        body: data,
        method: 'POST',
        credentials: 'include'
      })
    }),
    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `${LOCATION_URL}/${id}`,
        method: 'DELETE',
        credentials: 'include'
      })
    })
  })
});

export const {
  useAddLocationMutation,
  useDeleteLocationMutation
} = apiLocation;

export default apiLocation;