/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainUrl } from '@/app/URL/main.url'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const caseApi = createApi({
  reducerPath: 'caseApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${mainUrl}/case/` }),
  endpoints: (build) => ({
    createCase: build.mutation<any, any>({
      query: (body) => ({
        url: 'create',
        method: 'POST',
        body,
      })
    }),
    findAllCase: build.query<any, { type?: string; slug?: string }> ({
      query: (params = {}) => {
        const { type, slug } = params as { type?: string; slug?: string };
        const queryParams = new URLSearchParams();
        
        if (type) queryParams.append('type', type);
        if (slug) queryParams.append('slug', slug);
        
        return {
          url: `?${queryParams.toString()}`,
        };
      }
    })
  }),
})

export const { 
  useCreateCaseMutation, 
  useFindAllCaseQuery 
} = caseApi;