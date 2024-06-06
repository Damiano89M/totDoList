import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../confing'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL + '/auth' }),

/*   prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }, */
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
        headers: {
          // Accept: 'application/json' è una buona pratica che garantisce che le risposte del server siano in un formato prevedibile e facile da gestire, migliorando la robustezza e la manutenibilità del codice del client.
          Accept: 'application/json',
        }
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
        headers: {
          // Accept: 'application/json' è una buona pratica che garantisce che le risposte del server siano in un formato prevedibile e facile da gestire, migliorando la robustezza e la manutenibilità del codice del client.
          Accept: 'application/json',
        }
      }),
    }),
 
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useFetchUserQuery,
} = authApi;