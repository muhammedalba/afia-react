import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authSlice = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
  }),
  // انشاء تاغ
  tagTypes: ["Users"],

  endpoints: (builder) => ({
    //  You send the data to the server. We determine that we can use it with more than one login process and create an account
    authApi: builder.mutation({
      query: ({ url, body, method }) => ({
        url: url,
        method: method,
        body: body,
      }),
      // يقوم باستدعاء التاغ
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useAuthApiMutation } = authSlice;
