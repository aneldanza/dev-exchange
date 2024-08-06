import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3001",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (payload) => {
        return {
          url: "/signup",
          method: "post",
          body: JSON.stringify(payload.credentials),
        };
      },
    }),
    signIn: builder.mutation<any, { email: string; password: string }>({
      query: (payload) => {
        return {
          url: "/login",
          method: "post",
          body: JSON.stringify({ user: payload }),
        };
      },
    }),
    signOut: builder.mutation({
      query: () => {
        return {
          url: "/logout",
          method: "delete",
        };
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useSignOutMutation } = api;
