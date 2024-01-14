import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ 
  baseUrl: '',
  prepareHeaders(headers) {
    return headers;
  },
  credentials: "include"
});

const api = createApi({
  baseQuery,
  endpoints: (builder) => ({})
});

export default api;