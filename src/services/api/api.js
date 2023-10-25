import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

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
    }),

    changeName: build.mutation({
      query: (payload) => {
        console.log(payload.code);
        let name = payload.name;
        return({
          url: '/user',
          method: 'PATCH',
          body: {name},
          headers: headers(payload.code)
        });
      }
    }),

    getHistory: build.query({
      query:(code) => ({
        url: '/messages',
        headers: headers(code)
      }) 
    })
  }), 
});