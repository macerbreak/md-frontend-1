import {CountriesRatingType} from "../redux/types/airQualitySliceType";
import {convertCountryCode, isoCountries} from "./getCountryNameByCode";

export const getCountriesWithNamesAndFlagsArray = (countriesRating:CountriesRatingType|null) => {
    return countriesRating
        ? countriesRating?.cities.map((countryObject, index) => {
            return {
                ...countryObject,
                flag: `https://countryflagsapi.com/png/${countryObject.country.toLowerCase()}`,
                countryName: convertCountryCode(
                    countryObject.country as keyof typeof isoCountries
                ),
                place: index + 1,
            };
        })
        : [];
}