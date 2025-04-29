/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainUrl } from "@/app/URL/main.url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const caseApi = createApi({
  reducerPath: "caseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${mainUrl}/case/`,
    prepareHeaders: (headers) => {
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
    createCase: build.mutation<any, any>({
      query: (body) => ({
        url: "create",
        method: "POST",
        body,
      }),
    }),
    findAllCase: build.query<any, { type?: string; slug?: string }>({
      query: (params = {}) => {
        const { type, slug } = params as { type?: string; slug?: string };
        const queryParams = new URLSearchParams();

        if (type) queryParams.append("type", type);
        if (slug) queryParams.append("slug", slug);

        return {
          url: `?${queryParams.toString()}`,
        };
      },
    }),
    findOneCase: build.query<any, string>({
      query: (id) => ({
        url: `${id}`,
      }),
    }),
    updateCase: build.mutation<any, any>({
      query: ({body,id}) => ({
        url: `${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteCase: build.mutation<any, string>({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCaseMutation,
  useFindAllCaseQuery,
  useFindOneCaseQuery,
  useUpdateCaseMutation,
  useDeleteCaseMutation,
} = caseApi;
