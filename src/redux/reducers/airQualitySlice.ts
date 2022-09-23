import { createSlice, Dispatch } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  CityForecastResponseData,
  CountriesRatingType,
} from "../types/airQualitySliceType";
import { getCityData, getCountriesRating } from "../../api";

export interface CounterState {
  countriesRating: CountriesRatingType | null;
  cityForecastResponse: CityForecastResponseData | null;
}

const initialState: CounterState = {
  countriesRating: null,
  cityForecastResponse: null,
};

export const airQualitySlice = createSlice({
  name: "airQualityReducer",
  initialState,
  reducers: {
    setCityForecastResponseAC: (
      state,
      action: PayloadAction<CityForecastResponseData | null>
    ) => {
      state.cityForecastResponse = action.payload;
    },
    setCountriesRatingAC: (
      state,
      action: PayloadAction<CountriesRatingType | null>
    ) => {
      state.countriesRating = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCountriesRatingAC, setCityForecastResponseAC } =
  airQualitySlice.actions;

export const getCountriesRatingTC = () => async (dispatch: Dispatch) => {
  try {
    const countriesRatingResponse = await getCountriesRating();
    dispatch(setCountriesRatingAC(countriesRatingResponse.data));
  } catch (e) {
    console.error(e);
  }
};
export const getCityDataTC =
  (latitude: number, longitude: number) => async (dispatch: Dispatch) => {
    const cityDataResponse = await getCityData(latitude, longitude);
    if (cityDataResponse.data.data) {
      dispatch(setCityForecastResponseAC(cityDataResponse.data.data));
    }
    //
    console.log({ cityDataResponse });
  };

export default airQualitySlice.reducer;
