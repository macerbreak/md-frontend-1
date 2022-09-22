import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import {CityForForecast, CountryForForecastWithCities} from "../types/forecastApiType";

export const forecastApi = createApi({
  reducerPath: "forecastApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  endpoints: (builder) => ({
    getCountryData: builder.query<CountryForForecastWithCities, unknown>({
      query: (countryCode) => `https://waqi.info/rtdata/ranking/${countryCode}.json `,
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error(error)
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCountryDataQuery } = forecastApi;
