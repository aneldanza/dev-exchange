import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInInfo, SignUpInfo } from "./AuthContext";
import { SignUpCredentials } from "../components/auth/SignupForm";
import { SignInCredentials } from "../components/auth/SigninForm";
import { TagData } from "../components/tags/types";
import {
  LimitedQuestionData,
  QuestionData,
} from "../components/questions/types";
import { FullUserData } from "../components/users/types";
import {
  PostsSearchPayload,
  PostsSearchResponse,
} from "../components/search/types";

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
  tagTypes: ["Users", "User", "Tag", "Questions", "Question"],
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpInfo, { user: SignUpCredentials }>({
      query: (payload) => {
        return {
          url: "/signup",
          method: "post",
          body: JSON.stringify(payload),
        };
      },
      invalidatesTags: ["User", "Users"],
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
    showFullUserInfo: builder.query<FullUserData, string>({
      query: (id) => "/users/" + id,
      providesTags: ["User"],
    }),
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["User", "Users"],
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
      providesTags: ["Users"],
    }),
    getTags: builder.query<TagData[], undefined>({
      query: () => "/tags",
      providesTags: ["Tag"],
    }),
    searchTags: builder.query<TagData[], string>({
      query: (q) => `tags/search?name=${q}`,
    }),
    createTag: builder.mutation({
      query: (data) => ({
        url: "/tags",
        method: "post",
        body: { tag: data },
      }),
    }),
    getTagById: builder.query<TagData, string>({
      query: (id) => `/tags/${id}`,
    }),
    getAllQuestions: builder.query<LimitedQuestionData[], undefined>({
      query: () => "/questions",
      providesTags: ["Questions"],
    }),
    createQuestion: builder.mutation({
      query: (data) => ({
        url: "/questions",
        method: "post",
        body: { question: data },
      }),
    }),
    getQuestionById: builder.query<QuestionData, string>({
      query: (id) => `/questions/${id}`,
      providesTags: ["Question"],
    }),
    updateQuestion: builder.mutation({
      query: (data) => ({
        url: `/questions/${data.id}`,
        method: "PATCH",
        body: { question: data },
      }),
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Questions"],
    }),
    createAnswer: builder.mutation({
      query: (data) => ({
        url: "/answers",
        method: "post",
        body: { answer: data },
      }),
      invalidatesTags: ["Question"],
    }),
    deleteAnswer: builder.mutation({
      query: (id) => ({
        url: `/answers/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Question"],
    }),
    getAnswerById: builder.query({
      query: (id) => `/answers/${id}`,
    }),
    updateAnswer: builder.mutation({
      query: (data) => ({
        url: `/answers/${data.id}`,
        method: "PATCH",
        body: { answer: data },
      }),
      invalidatesTags: ["Question"],
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: "/comments",
        method: "post",
        body: { comment: data },
      }),
      invalidatesTags: ["Question"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Question"],
    }),
    updateComment: builder.mutation({
      query: (data) => ({
        url: `/comments/${data.id}`,
        method: "PATCH",
        body: { comment: data },
      }),
      invalidatesTags: ["Question"],
    }),
    castVote: builder.mutation({
      query: (data) => ({
        url: "/votes/cast_vote",
        method: "post",
        body: { vote: data },
      }),
      invalidatesTags: ["Question"],
    }),
    searchPostsByUser: builder.query({
      query: (query) =>
        `/users/${query.id}/search_posts?tag_name=${query.tag}${
          query.sort ? `&sort=${query.sort}` : ""
        }`,
    }),
    searchAllPosts: builder.query<PostsSearchResponse, PostsSearchPayload>({
      query: (query) =>
        `/search_posts/page/${query.page}?query=${query.value}${
          query.sort ? `&sort=${query.sort}` : ""
        }`,
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
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useGetTagByIdQuery,
  useCreateAnswerMutation,
  useDeleteAnswerMutation,
  useGetAnswerByIdQuery,
  useUpdateAnswerMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useCastVoteMutation,
  useSearchPostsByUserQuery,
  useSearchAllPostsQuery,
} = api;
