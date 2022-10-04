import { CountriesRatingType } from "../redux/types/airQualitySliceType";
import { convertCountryCode, isoCountries } from "./getCountryNameByCode";
import { getCountryFlag } from "./getCountryFlag";

export const getCountriesWithNamesAndFlagsArray = (
  countriesRating: CountriesRatingType | null
) => {
  return countriesRating
    ? countriesRating?.cities.map((countryObject, index) => {
        return {
          ...countryObject,
          flag: getCountryFlag(countryObject.country),
          countryName: convertCountryCode(
            countryObject.country as keyof typeof isoCountries
          ),
          place: index + 1,
        };
      })
    : [];
};
