import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  getCityDataTC,
  getCountriesRatingTC,
} from "../../../redux/reducers/airQualitySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getCountriesWithNamesAndFlagsArray } from "../../../utils/getCountriesWithNamesAndFlagsArray";
import { Box, styled } from "@mui/material";
import { constants } from "../../../system/constants";
import { Typography } from "../../../themeComponents/Typography";
import {
  City,
  FollowsStationGeneralType,
} from "../../../redux/types/airQualitySliceType";
import { useGetCountryDataQuery } from "../../../redux/reducers/forecastApi";
import {
  CityForForecast,
  CountryForForecastWithCities,
} from "../../../redux/types/forecastApiType";
import { getAqiColors } from "../DashboardCountriesRating/DashboardCountriesRating";
import moment from "moment";
import {
  useDeleteFollowCityMutation,
  useGetFollowsQuery,
  useSetFollowCityMutation,
} from "../../../redux/reducers/airQualityApi";

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
  const { data: followsData, refetch: refetchFollows } = useGetFollowsQuery("");

  const { data: countryData, refetch: refetchCountryData } =
    useGetCountryDataQuery(selectedCountry?.country);
  useEffect(() => {
    if (selectedCity) {
      dispatch(
        getCityDataTC(selectedCity.station.g[0], selectedCity.station.g[1])
      );
    }
  }, [selectedCity, dispatch]);
  useEffect(() => {
    refetchCountryData();
  }, [selectedCountry]);
  useEffect(() => {
    dispatch(getCountriesRatingTC());
  }, []);
  useEffect(() => {
    refetchFollows();
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
          followsData,
          refetchFollows,
        }}
      >
        <ForecastBox>
          <DashboardForecastCountrySelect />
          {selectedCountry && <DashboardForecastCitySelect />}
          {selectedCity && <DashboardForecastTable />}
        </ForecastBox>
      </DashboardForecastContext.Provider>
    </>
  );
};
interface TableRowType {
  avg: number;
  max: number;
  min: number;
}

const DashboardForecastTable = () => {
  const cityForecastResponse = useAppSelector(
    (state) => state.airQualitySlice.cityForecastResponse
  );
  const dailyForecast = cityForecastResponse?.forecast?.daily;
  console.log({ dailyForecast });
  const datesArray = useMemo(() => {
    if (dailyForecast) {
      const biggestLengthElement = Object.values(dailyForecast).reduce(
        (maxLength = 0, ell) => {
          if (maxLength > ell.length) {
            return maxLength;
          } else {
            return ell.length;
          }
        }
      );
      return Object.values(dailyForecast)
        .filter((ell) => {
          return ell.length === biggestLengthElement;
        })[0]
        .map((forecastValue: { day: string }) => forecastValue.day);
    }
  }, [dailyForecast]);
  const tableHeaderArray = useMemo(() => {
    if (dailyForecast) {
      return [""].concat(Object.keys(dailyForecast));
    } else {
      return [];
    }
  }, [dailyForecast]);
  const tableRowsArray = datesArray?.map((dateValue: string) => {
    const arrKeyValue = tableHeaderArray?.map((keyForValue, index) => {
      if (index === 0) {
        return ["day", dateValue];
      } else {
        return [
          keyForValue,
          dailyForecast?.[keyForValue as keyof typeof dailyForecast]?.filter(
            (keyForValueArray) =>
              moment(keyForValueArray.day).format("YYYY-MM-DD") === dateValue
          )[0],
        ];
      }
    });
    return Object.fromEntries(arrKeyValue);
  });
  const gridTemplatesColumns = `100px repeat(${
    tableHeaderArray.length > 2 ? tableHeaderArray.length - 2 : 0
  }, 1fr) 100px`;
  return (
    <>
      <Box
        sx={{
          backgroundColor: constants.colors.sidebar,
          borderRadius: "10px",
          boxShadow: "0px 0px 35px -9px rgba(0,0,0,0.75)",
          border: "5px solid white",
          // height: "400px",
          // maxHeight: "400px",
          marginBottom: "20px",
          padding: "20px ",
          overflowY: "scroll",
          display: "flex",
          justifyContent: "center",
          "&::-webkit-scrollbar": {
            width: "0px",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: gridTemplatesColumns,
              paddingTop: "10px",
              paddingBottom: "10px",
              position: "sticky",
              top: "-20px",
              backgroundColor: constants.colors.sidebar,
            }}
          >
            {tableHeaderArray?.map((headerItem, index) => {
              return (
                <>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                    key={index}
                  >
                    {headerItem.toUpperCase()}
                  </Typography>
                </>
              );
            })}
          </Box>
          {tableRowsArray?.map(
            (
              tableRow: {
                [dayItem: string]:
                  | {
                      avg: number;
                      max: number;
                      min: number;
                    }
                  | string;
              },
              index: number
            ) => {
              return (
                <>
                  <Box
                    key={index}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: gridTemplatesColumns,
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      "&:hover": {
                        border: "3px solid white",
                        backgroundColor: "rgba(255,255,255,0.5)",
                        transition: constants.transition,
                      },
                      transition: constants.transition,
                    }}
                  >
                    {tableHeaderArray?.map((headerItem, indexFromHeader) => {
                      const tableRowWithTypedDay = tableRow as { day: string };
                      const day = tableRowWithTypedDay?.day
                        ? tableRowWithTypedDay?.day
                        : "";
                      const tableRowHeaderItem = tableRow[
                        headerItem as keyof typeof tableRow
                      ] as TableRowType;
                      const avg = tableRowHeaderItem
                        ? tableRowHeaderItem.avg
                        : "";
                      const max = tableRowHeaderItem
                        ? tableRowHeaderItem.max
                        : "";
                      const min = tableRowHeaderItem
                        ? tableRowHeaderItem.min
                        : "";

                      return (
                        <>
                          <Box
                            sx={{
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            key={indexFromHeader}
                          >
                            {indexFromHeader === 0 ? (
                              <Typography
                                sx={{
                                  fontWeight: "600",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {day}
                              </Typography>
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                {avg !== "" && (
                                  <Typography>
                                    <span
                                      style={{
                                        fontWeight: "500",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      avg:
                                    </span>
                                    {avg}
                                  </Typography>
                                )}
                                {max !== "" && (
                                  <Typography>
                                    <span
                                      style={{
                                        fontWeight: "500",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      max:
                                    </span>
                                    {max}
                                  </Typography>
                                )}
                                {min !== "" && (
                                  <Typography>
                                    <span
                                      style={{
                                        fontWeight: "500",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      min:
                                    </span>
                                    {min}
                                  </Typography>
                                )}
                              </Box>
                            )}
                          </Box>
                        </>
                      );
                    })}
                  </Box>
                </>
              );
            }
          )}
        </Box>
      </Box>
    </>
  );
};
const DashboardForecastCitySelect = () => {
  const {
    countryData,
    selectedCity,
    setSelectedCity,
    followsData,
    refetchFollows,
  } = useContext(DashboardForecastContext);
  console.log({ followsData });
  const [setFollowCountryCallback, { data: setFollowCountryData }] =
    useSetFollowCityMutation();
  const [deleteFollowStationCallback, { data: deleteFollowStationData }] =
    useDeleteFollowCityMutation();
  console.log({ countryData });
  const countryDataToShow = countryData?.cities ?? [];
  const handleFollow = (e: { stopPropagation: () => void }, city: string) => {
    e.stopPropagation();
    if (countryData?.country?.country && city) {
      setFollowCountryCallback({
        country: countryData.country.country,
        city,
        refetchFollows,
      });
    }
  };
  const handleUnfollow = (
    e: { stopPropagation: () => void },
    cityId: number
  ) => {
    e.stopPropagation();
    deleteFollowStationCallback({ stationId: cityId, refetchFollows });
  };
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
          const isFollowed =
            (followsData?.filter((followCity) => followCity.city === city.city)
              ?.length ?? 0) > 0;
          const followCityId =
            followsData?.filter(
              (followCity) => followCity.city === city.city
            )?.[0]?.id ?? 0;
          return (
            <>
              <CityButton
                onClick={() => {
                  setSelectedCity(city);
                }}
                active={selectedCity?.city === city.city}
                key={index}
              >
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
                <FollowButton
                  onClick={(e) => {
                    if (isFollowed) {
                      handleUnfollow(e, followCityId);
                    } else {
                      handleFollow(e, city.city);
                    }
                  }}
                >
                  {isFollowed ? "Unfollow" : "Follow"}
                </FollowButton>
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
const FollowButton = styled("button")({
  fontFamily: "Montserrat",
  width: "80px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: constants.colors.aqiIndex.veryUnhealthyBackground,
    color: "white",
    fontWeight: "500",
    transition: constants.transition,
  },
  transition: constants.transition,
});
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
const CityButton = styled(Box)<{ active: boolean }>(({ active }) => ({
  marginBottom: "20px",
  display: "grid",
  gridTemplateColumns: "40px 150px 200px 1fr 100px 60px",
  cursor: "pointer",
  alignItems: "center",
  padding: "0px 20px",
  width: "100%",
  height: "50px",
  minHeight: "50px",
  borderRadius: "10px",
  border: active ? "3px solid white" : "0px solid white",
  backgroundColor: active ? "rgba(255,255,255,0.5)" : "transparent",
  "&:hover": {
    border: "3px solid white",
    backgroundColor: "rgba(255,255,255,0.5)",
    transition: constants.transition,
  },
  transition: constants.transition,
}));
const DashboardForecastContext = React.createContext({
  refetchFollows: () => {},
  followsData: [] as FollowsStationGeneralType[] | undefined,
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
