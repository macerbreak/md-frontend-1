import React, { useContext, useEffect, useMemo, useState } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { getCityData, getLocationData } from "../../../api";
import { useAppDispatch } from "../../../redux/hooks";
import { useGetCountryDataQuery } from "../../../redux/reducers/forecastApi";
import { Box, styled } from "@mui/material";
import { getCountryFlag } from "../../../utils/getCountryFlag";
import { constants } from "../../../system/constants";
import LineChart from "../DashboardCountriesRating/Chart3";
import { Typography } from "../../../themeComponents/Typography";
import DashboardForecastTable from "../DashboardForecast/DashboardForecastTable";
import { CityForecastResponseData } from "../../../redux/types/airQualitySliceType";
import { getAqiColors } from "../DashboardCountriesRating/DashboardCountriesRating";
import {
  useDeleteFollowCityMutation,
  useSetFollowCityMutation,
} from "../../../redux/reducers/airQualityApi";
import moment from "moment";
import { CountryForForecastWithCities } from "../../../redux/types/forecastApiType";

interface CurrentLocationType {
  countryCode: string;
  countryName: string;
  city: string;
  continent: string;
  latitude: number;
  longitude: number;
}
const getCityHomeDataTC =
  (
    latitude: number,
    longitude: number,
    setCityData: (cityDate: unknown) => void
  ) =>
  async () => {
    const getCityDataResponse = await getCityData(latitude, longitude);
    setCityData(getCityDataResponse.data);
  };
const getLocationDataTC =
  (
    latitude: number,
    longitude: number,
    setCurrentLocation: (currentLocation: CurrentLocationType) => void
  ) =>
  async (dispatch: Dispatch) => {
    const getLocationDataResponse = await getLocationData(latitude, longitude);
    setCurrentLocation(getLocationDataResponse.data);
  };
const DashboardHome = () => {
  const dispatch = useAppDispatch();
  const [cityData, setCityData] = useState<null | { data: { aqi: number } }>(
    null
  );
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocationType | null>(null);
  const aqiColors = getAqiColors(cityData?.data?.aqi ?? 0);
  const countryFlag = useMemo(() => {
    if (currentLocation?.countryCode) {
      return getCountryFlag(currentLocation?.countryCode);
    } else {
      return "";
    }
  }, [currentLocation]);
  const { data: countryData, refetch: refetchCountryData } =
    useGetCountryDataQuery(currentLocation?.countryCode);
  console.log({ currentLocation });
  const setLocation = (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    const { latitude, longitude } = position.coords;
    dispatch(getLocationDataTC(latitude, longitude, setCurrentLocation));
    dispatch(
      getCityHomeDataTC(
        latitude,
        longitude,
        setCityData as (cityDate: unknown) => void
      )
    );
  };
  const errorLocation = (error: unknown) => {
    console.log({ error });
  };
  useEffect(() => {
    refetchCountryData();
  }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setLocation, errorLocation);
  }, []);
  {
    console.log({ currentLocation, cityData });
  }
  return (
    <>
      <DashboardHomeContext.Provider value={{}}>
        <Box
          sx={{
            padding: "20px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <SectionBox
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "30%",
                height: "300px",
                img: {
                  width: "90%",
                  height: "90%",
                },
              }}
            >
              <img src={countryFlag} />
            </SectionBox>
            <SectionBox
              sx={{
                width: "67%",
                height: "300px",
              }}
            >
              <LineChart
                countryData={
                  countryData?.country?.evolution as [number, number][]
                }
              />
            </SectionBox>
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <SectionBox
              sx={{
                width: "320px",
                height: "320px",
                padding: "20px",
                marginBottom: "30px",
                display: "flex",
                flexDirection: "column",
                // alignItems:"center"
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "26px",
                  textAlign: "center",
                }}
              >
                Your Location
              </Typography>
              <LocationItemBox>
                <LocationItemTypography>Country:</LocationItemTypography>
                <LocationItemTypographyValue>
                  {currentLocation?.countryName}
                </LocationItemTypographyValue>
              </LocationItemBox>
              <LocationItemBox>
                <LocationItemTypography>City:</LocationItemTypography>
                <LocationItemTypographyValue>
                  {currentLocation?.city}
                </LocationItemTypographyValue>
              </LocationItemBox>
              <LocationItemBox>
                <LocationItemTypography>Continent:</LocationItemTypography>
                <LocationItemTypographyValue>
                  {currentLocation?.continent}
                </LocationItemTypographyValue>
              </LocationItemBox>
              <LocationItemBox>
                <LocationItemTypography>Latitude:</LocationItemTypography>
                <LocationItemTypographyValue>
                  {currentLocation?.latitude}
                </LocationItemTypographyValue>
              </LocationItemBox>
              <LocationItemBox>
                <LocationItemTypography>Longitude:</LocationItemTypography>
                <LocationItemTypographyValue>
                  {currentLocation?.longitude}
                </LocationItemTypographyValue>
              </LocationItemBox>
              <LocationItemBox>
                <LocationItemTypography>AQI:</LocationItemTypography>
                <Box
                  sx={{
                    width: "60px",
                    height: "32px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                    fontSize: "18px",
                    fontFamily: "Montserrat",
                    ...aqiColors,
                  }}
                >
                  {cityData?.data?.aqi}
                </Box>
              </LocationItemBox>
            </SectionBox>
            <DashboardHomeCities countryData={countryData} />
          </Box>

          <DashboardForecastTable
            cityForecastResponse={
              cityData?.data as CityForecastResponseData | null
            }
          />
        </Box>
      </DashboardHomeContext.Provider>
    </>
  );
};
const DashboardHomeCities: React.FC<{
  countryData?: CountryForForecastWithCities;
}> = ({ countryData }) => {
  const countryDataToShow = useMemo(() => {
    if (countryData?.cities) {
      return countryData?.cities?.filter(
        (city, index) => +city.station.a >= 100 || index <= 9
      );
    } else {
      return [];
    }
  }, [countryData]);
  console.log({ countryData });

  return (
    <>
      <ForecastListBox
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {countryDataToShow?.map((city, index) => {
          const aqiColors = getAqiColors(+city.station.a);
          return (
            <>
              <CityButton onClick={() => {}} key={index}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    marginRight: "20px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {index + 1}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {city.city.slice(0, 10)}
                </Typography>
                <Typography>{city.station.n.slice(0, 20)}</Typography>
                <Typography>
                  {moment(city.station.u).format("YYYY-MM-DD HH:mm")}
                </Typography>
                <Box
                  sx={{
                    width: "60px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                    fontWeight: "600",
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
const DashboardHomeContext = React.createContext({});
const ForecastListBox = styled(Box)<{ gridForCountriesBox?: string }>(
  ({ gridForCountriesBox }) => ({
    width: "calc(100% - 340px)",
    backgroundColor: constants.colors.sidebar,
    borderRadius: "30px",
    boxShadow: "0px 0px 35px -9px rgba(0,0,0,0.75)",
    border: "5px solid white",
    height: "auto",
    maxHeight: "320px",
    marginBottom: "20px",
    padding: "20px ",
    overflowY: "scroll",
    marginLeft: "20px",
    display: "grid",
    gridTemplateColumns: gridForCountriesBox ?? "1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
    "&::-webkit-scrollbar": {
      width: "0px",
    },
  })
);
const CityButton = styled(Box)({
  marginBottom: "20px",
  display: "grid",
  gridTemplateColumns: "40px 150px 200px 1fr 60px",
  cursor: "pointer",
  alignItems: "center",
  padding: "0px 20px",
  width: "100%",
  height: "50px",
  minHeight: "50px",
  borderRadius: "10px",
  border: "0px solid white",
  backgroundColor: "transparent",
  "&:hover": {
    border: "3px solid white",
    backgroundColor: "rgba(255,255,255,0.5)",
    transition: constants.transition,
  },
  transition: constants.transition,
});
const LocationItemTypography = styled(Typography)({
  fontSize: "20px",
  width: "120px",
  marginLeft: "30px",
});
const LocationItemTypographyValue = styled(LocationItemTypography)({
  // display:"flex",
  // justifyContent:"flex-end"
  // marginLeft:"30px"
  marginLeft: "0px",
});
const LocationItemBox = styled(Box)({
  marginBottom: "10px",
  // display:"grid",
  // gridTemplateColumns:"120px 150px"
  display: "flex",
});
const SectionBox = styled(Box)({
  backgroundColor: constants.colors.sidebar,
  borderRadius: "30px",
  boxShadow: "0px 0px 35px -9px rgba(0,0,0,0.75)",
  border: "5px solid white",
});
export default DashboardHome;
