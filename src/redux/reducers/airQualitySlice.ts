import { createSlice, Dispatch } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  CityForecastResponseData,
  CountriesRatingType, GetAllStationsStation,
} from "../types/airQualitySliceType";
import {getAllStations, getCityData, getCountriesRating} from "../../api";

export interface CounterState {
  countriesRating: CountriesRatingType | null;
  cityForecastResponse: CityForecastResponseData | null;
  allStations: GetAllStationsStation[]|null
}

const initialState: CounterState = {
  countriesRating: null,
  cityForecastResponse: null,
  allStations: null
};

export const airQualitySlice = createSlice({
  name: "airQualityReducer",
  initialState,
  reducers: {
    setAllStationsAC : (state,
                         action: PayloadAction<GetAllStationsStation[]|null>)=> {
      console.log("Heelooo22")
      state.allStations = action.payload
    },
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
export const { setCountriesRatingAC, setCityForecastResponseAC,setAllStationsAC } =
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
export const getAllStationsTC = () => async (dispatch:Dispatch)=> {
  const getAllStationsResponse = await getAllStations() as unknown as {data:{stations:GetAllStationsStation[]}}
  console.log("Hello")
  if(getAllStationsResponse?.data?.stations){
    dispatch(setAllStationsAC(getAllStationsResponse?.data?.stations))
  }

  console.log("Hello3")

}
export default airQualitySlice.reducer;
