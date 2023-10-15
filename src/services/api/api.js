import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const headers = (token) => ({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json;charset=utf-8',
  'mode': 'no-cors',
});


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://edu.strada.one/api'}),
  endpoints: (build) => ({
    postMail: build.mutation({
      query: (email) => ({
        url: '/user',
        method: 'POST',
        body:{email},
      })
    }),
    
    getLogin: build.query({
      query: (token) => ({
        url: '/user/me',
        headers: headers(token),
      })
    })
  }), 
});