import {createSlice, Dispatch} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {CountriesRatingType} from "../types/airQualitySliceType";
import {getCountriesRating} from "../../api";

export interface CounterState {
    countriesRating: CountriesRatingType|null
}

const initialState: CounterState = {
    countriesRating: null,
}

export const airQualitySlice = createSlice({
    name: 'airQualityReducer',
    initialState,
    reducers: {
        setCountriesRatingAC: (state, action:PayloadAction<CountriesRatingType|null>) => {
            state.countriesRating = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCountriesRatingAC } = airQualitySlice.actions

export const getCountriesRatingTC = () => async (dispatch:Dispatch) => {
    try{
        const countriesRatingResponse = await getCountriesRating()
        dispatch(setCountriesRatingAC(countriesRatingResponse.data))
    }
    catch(e){
        console.error(e)
    }


}

export default airQualitySlice.reducer