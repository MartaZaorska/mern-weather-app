import api from './api';

const USER_URL = 'https://mern-weather-app-backend.vercel.app/api/user';

const apiUser = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signin`,
        method: 'POST',
        body: data,
        credentials: 'include'
      })
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: 'POST',
        body: data,
        credentials: 'include'
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/signout`,
        method: 'POST',
        credentials: 'include'
      })
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${USER_URL}/profile`,
        credentials: 'include'
      })
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: 'PUT',
        body: data,
        credentials: 'include'
      })
    }),
    deleteProfile: builder.mutation({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: 'DELETE',
        credentials: 'include'
      })
    })
  })
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useGetProfileQuery
} = apiUser;

export default apiUser;