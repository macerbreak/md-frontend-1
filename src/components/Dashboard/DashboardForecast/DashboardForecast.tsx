import React, { useContext, useEffect, useMemo, useState } from "react";
import { getCountriesRatingTC } from "../../../redux/reducers/airQualitySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getCountriesWithNamesAndFlagsArray } from "../../../utils/getCountriesWithNamesAndFlagsArray";
import { Box, styled } from "@mui/material";
import { constants } from "../../../system/constants";
import { Typography } from "../../../themeComponents/Typography";
import { City } from "../../../redux/types/airQualitySliceType";
import { useGetCountryDataQuery } from "../../../redux/reducers/forecastApi";
import {
  CityForForecast,
  CountryForForecastWithCities,
} from "../../../redux/types/forecastApiType";
import { getAqiColors } from "../DashboardCountriesRating/DashboardCountriesRating";
import moment from "moment";

const useCountryButtonsBoxWidth = () => {
  const [width, setWidth] = useState(0);
  const box = document.getElementById("forecast-countries-box");
  useEffect(() => {
    const setW = () => setWidth(box?.offsetWidth as number);
    window.addEventListener("resize", setW);
    return () => window.removeEventListener("resize", setW);
  }, []);
  return width;
};
const DashboardForecast = () => {
  const dispatch = useAppDispatch();
  const countriesRating = useAppSelector(
    (state) => state.airQualitySlice.countriesRating
  );
  const countriesWithNamesAndFlagsArray = useMemo(() => {
    return getCountriesWithNamesAndFlagsArray(countriesRating);
  }, [countriesRating]);

  const [selectedCountry, setSelectedCountry] = useState<
    (City & { flag: string; countryName: string }) | null
  >(null);
  const [selectedCity, setSelectedCity] = useState<CityForForecast | null>(
    null
  );
  const { data: countryData, refetch:refetchCountryData } = useGetCountryDataQuery(
    selectedCountry?.country
  );
  useEffect(()=>{
      refetchCountryData()
  },[selectedCountry])
  console.log({ countryData });
  useEffect(() => {
    dispatch(getCountriesRatingTC());
  }, []);

  return (
    <>
      <DashboardForecastContext.Provider
        value={{
          countryData,
          countriesWithNamesAndFlagsArray,
          selectedCountry,
          setSelectedCountry,
          selectedCity,
          setSelectedCity,
        }}
      >
        <ForecastBox>
          <DashboardForecastCountrySelect />
          <DashboardForecastCitySelect />
        </ForecastBox>
      </DashboardForecastContext.Provider>
    </>
  );
};
const DashboardForecastCitySelect = () => {
  const { countryData, selectedCity, setSelectedCity } = useContext(
    DashboardForecastContext
  );
  const countryDataToShow = countryData?.cities ?? [];
  return (
    <>
      <ForecastListBox
        sx={{
          display:"flex",
            flexDirection:"column"
        }}
      >
        {countryDataToShow?.map((city, index) => {
          const aqiColors = getAqiColors(+city.station.a);
          return (
            <>
              <CityButton
                onClick={() => {
                  setSelectedCity(city);
                }}
                active={selectedCity?.city === city.city}
                key={index}
              >
                  <Typography sx={{
                      fontWeight:"600",
                      marginRight:"20px",
                      whiteSpace:"nowrap"
                  }}>{index+1}</Typography>
                <Typography sx={{
                    fontWeight:"600",

                }}>{city.city.slice(0, 10)}</Typography>
                  <Typography>
                      {city.station.n.slice(0, 20)}
                  </Typography>
                  <Typography>
                      {moment(city.station.u).format("YYYY-MM-DD HH:mm")}
                  </Typography>
                <Box
                  sx={{
                    width: "60px",
                    height: "32px",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      borderRadius:"10px",
                      fontWeight:"600",
                    ...aqiColors,
                  }}
                >
                  {city.station.a}
                </Box>
              </CityButton>
            </>
          );
        })}
      </ForecastListBox>
    </>
  );
};
const DashboardForecastCountrySelect = () => {
  const countriesBoxWidth = useCountryButtonsBoxWidth();
  const {
    countriesWithNamesAndFlagsArray,
    selectedCountry,
    setSelectedCountry,
  } = useContext(DashboardForecastContext);
  const gridForCountriesBox = countriesBoxWidth
    ? Array(Math.floor(countriesBoxWidth / 120))
        .fill(0)
        ?.reduce((grid = " ") => grid + "1fr ")
        .slice(1, -1)
    : "1fr 1fr 1fr 1fr 1fr 1fr 1fr";
  return (
    <>
      <ForecastListBox
        id={"forecast-countries-box"}
        gridForCountriesBox={gridForCountriesBox}
      >
        {countriesWithNamesAndFlagsArray.map((country, index) => {
          return (
            <>
              <ForecastRegionButton
                onClick={() => {
                  setSelectedCountry(country);
                }}
                active={selectedCountry?.countryName === country.countryName}
                key={index}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      height: "35px",
                      width: "50px",
                      img: {
                        height: "100%",
                        width: "50px",
                      },
                    }}
                  >
                    <img src={country.flag} />
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      marginLeft: "10px",
                    }}
                  >
                    {country.country}
                  </Typography>
                </Box>
              </ForecastRegionButton>
            </>
          );
        })}
      </ForecastListBox>
    </>
  );
};
const ForecastRegionButton = styled("button")<{ active: boolean }>(
  ({ active }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "120px",
    height: "60px",
    borderRadius: "10px",
    border: active ? "3px solid white" : "0px solid white",
    backgroundColor: active ? "rgba(255,255,255,0.5)" : "transparent",
    "&:hover": {
      border: "3px solid white",
      backgroundColor: "rgba(255,255,255,0.5)",
      transition: constants.transition,
    },
    transition: constants.transition,
  })
);
const ForecastBox = styled(Box)({
  padding: "20px",
});
const ForecastListBox = styled(Box)<{ gridForCountriesBox?: string }>(
  ({ gridForCountriesBox }) => ({
    backgroundColor: constants.colors.sidebar,
    borderRadius: "10px",
    boxShadow: "0px 0px 35px -9px rgba(0,0,0,0.75)",
    border: "5px solid white",
    height: "auto",
    maxHeight: "400px",
    marginBottom: "20px",
    padding: "20px ",
    overflowY: "scroll",

    display: "grid",
    gridTemplateColumns: gridForCountriesBox ?? "1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
    "&::-webkit-scrollbar": {
      width: "0px",
    },
  })
);
const CityButton = styled(Box)<{ active: boolean }>(
    ({ active }) => ({
        marginBottom:"20px",
        display: "grid",
        gridTemplateColumns:"40px 150px 200px 1fr 60px",
        cursor:"pointer",
        alignItems:"center",
        padding:"0px 20px",
        width: "100%",
        height: "50px",
        minHeight:"50px",
        borderRadius: "10px",
        border: active ? "3px solid white" : "0px solid white",
        backgroundColor: active ? "rgba(255,255,255,0.5)" : "transparent",
        "&:hover": {
            border: "3px solid white",
            backgroundColor: "rgba(255,255,255,0.5)",
            transition: constants.transition,
        },
        transition: constants.transition,
    })
);
const DashboardForecastContext = React.createContext({
  countriesWithNamesAndFlagsArray: [] as {
    flag: string;
    countryName: string;
    place: number;
    country: string;
    aqis: number[];
    aqi: number;
    evolution: number[][];
  }[],
  setSelectedCountry: (
    selectedCountry: (City & { flag: string; countryName: string }) | null
  ) => {},
  selectedCountry: null as
    | (City & { flag: string; countryName: string })
    | null,
  countryData: {} as CountryForForecastWithCities | undefined,
  selectedCity: null as CityForForecast | null,
  setSelectedCity: (electedCity: CityForForecast | null) => {},
});
export default DashboardForecast;
