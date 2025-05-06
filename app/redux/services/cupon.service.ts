/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainUrl } from "@/app/URL/main.url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const cuponApi = createApi({
  reducerPath: "cuponApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${mainUrl}/cupon/` }),
  endpoints: (build) => ({
    createCupon: build.mutation<any, any>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
    getAllCupon: build.query<any, void>({
      query: () => ({
        url: "",
      }),
    }),
    deleteCupon: build.mutation<any, string>({
      query: (code) => ({
        url: `${code}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateCuponMutation,
  useGetAllCuponQuery,
  useDeleteCuponMutation,
} = cuponApi;
