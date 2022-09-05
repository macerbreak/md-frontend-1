import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from "../baseQuery";


// Define a service using a base URL and expected endpoints
export const firstApi = createApi({
    reducerPath: 'firstApi',
    baseQuery,
    endpoints: (builder) => ({
        getFirstData: builder.query<unknown, unknown>({
            query: () => `/`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetFirstDataQuery } = firstApi