/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainUrl } from '@/app/URL/main.url'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${mainUrl}/order/` }),
  endpoints: (build) => ({
    createOrder: build.mutation<any, any>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      })
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateOrderMutation } = orderApi