import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import { FollowsStationGeneralType } from "../types/airQualitySliceType";

interface setFollowCitySendObjectType {
  country: string;
  city: string;
  latitude?: number;
  longitude?: number;
  refetchFollows?: () => void;
}
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
    setFollowCity: builder.mutation<unknown, setFollowCitySendObjectType>({
      query: (station) => ({
        url: `/station-follows`,
        method: "POST",
        body: {
          country: station.country,
          city: station.city,
          latitude: station?.latitude,
          longitude: station?.longitude,
        },
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        const setFollowCityResponse = await queryFulfilled;
        if (args.refetchFollows) {
          args.refetchFollows();
        }
        console.log({ setFollowCityResponse });
      },
    }),
    deleteFollowCity: builder.mutation<
      unknown,
      { stationId: number; refetchFollows?: () => void }
    >({
      query: (args) => ({
        url: `/station-follows`,
        method: "DELETE",
        body: { stationId: args.stationId },
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        const deleteFollowCityResponse = await queryFulfilled;
        if (args.refetchFollows) {
          args.refetchFollows();
        }
      },
    }),
    getHistoryByFollowStationId: builder.query<unknown, { stationId: number }>({
      query: (args) => ({
        url: `/stations-history/${args.stationId}?t=${Date.now()}`,
        method: "GET",
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        await queryFulfilled;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetFollowsQuery,
  useSetFollowCityMutation,
  useDeleteFollowCityMutation,
  useGetHistoryByFollowStationIdQuery,
} = airQualityApi;
