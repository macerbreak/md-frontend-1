import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import { FollowsStationGeneralType } from "../types/airQualitySliceType";

// Define a service using a base URL and expected endpoints
export const airQualityApi = createApi({
  reducerPath: "airQualityApi",
  baseQuery,
  endpoints: (builder) => ({
    getFollows: builder.query<FollowsStationGeneralType[], unknown>({
      query: () => `/station-follows?t=${Date.now()}`,
      async onQueryStarted(_, { queryFulfilled }) {
        const getFollowsResponse = await queryFulfilled;
        console.log({ getFollowsResponse });
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetFollowsQuery } = airQualityApi;
