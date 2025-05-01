/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainUrl } from "@/app/URL/main.url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${mainUrl}/order/`,
    prepareHeaders: (headers) => {
      // Get token from sessionStorage
      // Get token from sessionStorage
      const token = sessionStorage.getItem("adminToken"); // Replace 'authToken' with your key

      // If token exists, add it to headers
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    createOrder: build.mutation<any, any>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
    uploadImage: build.mutation<any, any>({
      query: (body) => ({
        url: "uploadImage",
        method: "POST",
        body,
      }),
    }),
    getAllForAdmin: build.query<any, { userId?: string }>({
      query: ({ userId }) => ({
        url: userId ? `?userId=${userId}` : '',
      }),
    }),
    
    updateOrder: build.mutation<any, any>({
      query: ({ body, orderId }) => {
        console.log("body", body, "id", orderId);
        return ({
          url: `${orderId}`,
          method: "PATCH",
          body,
        })
      }
    }),

    sentCode: build.mutation<any, any>({
      query: (body) => ({
        url: "sentCode",
        method: "POST",
        body,
      }),
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateOrderMutation,
  useUploadImageMutation,
  useGetAllForAdminQuery,
  useUpdateOrderMutation,
  useSentCodeMutation
} = orderApi;
