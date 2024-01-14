import api from './api';

const USER_URL = 'https://mern-weather-app-backend.vercel.app/api/user';

const apiUser = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signin`,
        method: 'POST',
        body: data
      })
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/signout`,
        method: 'POST'
      })
    }),
    getProfile: builder.query({
      query: () => `${USER_URL}/profile`
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: 'PUT',
        body: data
      })
    }),
    deleteProfile: builder.mutation({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: 'DELETE'
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