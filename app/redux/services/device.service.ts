/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainUrl } from "@/app/URL/main.url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const deviceApi = createApi({
  reducerPath: "deviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${mainUrl}/device/`,
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
    createDevice: build.mutation<any, any>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
    findAllDevice: build.query<any, { forCase?: string; brand?: string }>({
      query: ({forCase,brand}) => ({
        url: `${forCase ? `?forCase=${forCase}` : ''}${brand ? `&brand=${brand}` : ''}`,
      }),
    }),
    findOneDevice: build.query<any, any>({
      query: (id) => ({
        url: `${id}`,
      }),
    }),
    updateDevice: build.mutation<any, any>({
      query: ({ body, id }) => ({
        url: `${id}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateDeviceMutation,
  useFindAllDeviceQuery,
  useFindOneDeviceQuery,
  useUpdateDeviceMutation,
} = deviceApi;
