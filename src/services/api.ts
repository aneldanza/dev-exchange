import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInInfo, SignUpInfo } from "./AuthContext";
import { SignUpCredentials } from "../components/auth/SignupForm";
import { SignInCredentials } from "../components/auth/SigninForm";
import { Tag } from "../components/tags/types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3001",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      return headers;
    },
    credentials: "include", // need this for cookies to be sent
  }),
  tagTypes: ["User", "Tag"],
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpInfo, { user: SignUpCredentials }>({
      query: (payload) => {
        return {
          url: "/signup",
          method: "post",
          body: JSON.stringify(payload),
        };
      },
      invalidatesTags: ["User"],
    }),
    signIn: builder.mutation<SignInInfo, SignInCredentials>({
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
    getCurrentUser: builder.query({
      query: () => "/current_user",
    }),
    showFullUserInfo: builder.query({
      query: (id) => "/users/" + id,
    }),
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    getTags: builder.query<Tag[], undefined>({
      query: () => "/tags",
      providesTags: ["Tag"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useGetCurrentUserQuery,
  useShowFullUserInfoQuery,
  useDeleteAccountMutation,
  useGetAllUsersQuery,
  useGetTagsQuery,
} = api;
