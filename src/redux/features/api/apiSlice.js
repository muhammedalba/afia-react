import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
    prepareHeaders: (headers) => {
      const token = cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["data"],
  endpoints: (builder) => ({
    createResource: builder.mutation({
      query: ({ url, body, method = "POST" }) => ({
        url,
        method,
        body,
      }),
      invalidatesTags: ["data"],
    }),

    getAllResources: builder.query({
      query: (endpoint) => endpoint,
      providesTags: ["data"],
    }),

    getResourceById: builder.query({
      query: ({ url }) => url,
      providesTags: ["data"],
    }),

    updateResource: builder.mutation({
      query: ({ url, body, method = "PUT" }) => ({
        url,
        method,
        body,
      }),
      invalidatesTags: ["data"],
    }),

    deleteResource: builder.mutation({
      query: (url) => ({
        url,
        method: "DELETE",
      }),
      invalidatesTags: ["data"],
    }),
  }),
});

export const {
  useCreateResourceMutation,
  useGetAllResourcesQuery,
  useGetResourceByIdQuery,
  useUpdateResourceMutation,
  useDeleteResourceMutation,
} = apiSlice;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from "universal-cookie";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API,
//     // credentials: 'include',
//     prepareHeaders: (headers) => {
//       const cookies = new Cookies();
//       const token = cookies.get("token");

//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }

//       return headers;
//     },
//   }),
//   tagTypes: ["data"],
//   endpoints: (builder) => ({
//     //  You send the data to the server. We determine that we can use it with more than one login process and create an account
//     createOne: builder.mutation({
//       query: ({ url, body, method }) => ({
//         url: url,
//         method: method,
//         body: body,
//       }),
//       // يقوم باستدعاء التاغ
//       invalidatesTags: ["data"],
//     }),

//     // get data from database
//     getData: builder.query({
//       query: (filter) => `${filter}`,
//       // يقوم باستدعاء التاغ وعمل ريلود للصفحه
//       providesTags: ["data"],
//     }),

//     // get one data from database
//     getOne: builder.query({
//       query: (id) => `${id}`,
//       providesTags: ["data"],
//     }),
//     invalidatesTags: ["data"],
//     // delet one data from database
//     deletOne: builder.mutation({
//       query: (url) => ({
//         // url =/ route/id items
//         url: url,
//         method: "DELETE",
//       }),
//       // // يقوم باستدعاء التاغ
//       invalidatesTags: ["data"],
//     }),

//     //update one data from database
//     updateOne: builder.mutation({
//       query: ({ url, body, method }) => ({
//         url: url,
//         method: method,
//         body: body,
//       }),
//       //  // يقوم باستدعاء التاغ
//       invalidatesTags: ["data"],
//     }),
//   }),
// });

// export const {
//   useCreateOneMutation,
//   useGetDataQuery,
//   useDeletOneMutation,
//   useGetOneQuery,
//   useUpdateOneMutation,
// } = apiSlice;
