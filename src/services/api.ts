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
  tagTypes: ["User", "Tag", "Question"],
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
    updateUser: builder.mutation<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      { user: { id: number; description?: string } }
    >({
      query: (data) => ({
        url: `/users/${data.user.id}`,
        method: "PATCH",
        body: { user: data.user },
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
    searchTags: builder.query<Tag[], string>({
      query: (q) => `tags/search?name=${q}`,
    }),
    createTag: builder.mutation({
      query: (data) => ({
        url: "/tags",
        method: "post",
        body: { tag: data },
      }),
    }),
    getAllQuestions: builder.query({
      query: () => "/questions",
      providesTags: ["Question"],
    }),
    createQuestion: builder.mutation({
      query: (data) => ({
        url: "/questions",
        method: "post",
        body: { question: data },
      }),
    }),
    getQuestionById: builder.query({
      query: (id) => `/questions/${id}`,
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
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useGetTagsQuery,
  useSearchTagsQuery,
  useCreateTagMutation,
  useGetAllQuestionsQuery,
  useCreateQuestionMutation,
  useGetQuestionByIdQuery,
} = api;
