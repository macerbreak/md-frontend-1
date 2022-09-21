import React, { useEffect, useState } from "react";
import { getCountriesRatingTC } from "../../../redux/reducers/airQualitySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getCountriesWithNamesAndFlagsArray } from "../../../utils/getCountriesWithNamesAndFlagsArray";
import { Box, styled } from "@mui/material";
import { constants } from "../../../system/constants";
import { Typography } from "../../../themeComponents/Typography";
import { City } from "../../../redux/types/airQualitySliceType";

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
  const countriesWithNamesAndFlagsArray =
    getCountriesWithNamesAndFlagsArray(countriesRating);
  const [selectedCountry, setSelectedCountry] = useState<
    (City & { flag: string; countryName: string }) | null
  >(null);
  const countriesBoxWidth = useCountryButtonsBoxWidth();
  const gridForCountriesBox =countriesBoxWidth? Array(Math.floor(countriesBoxWidth/120)).fill(0)?.reduce((grid=" ")=>grid+"1fr ").slice(1,-1) :"1fr 1fr 1fr 1fr 1fr 1fr 1fr"
  useEffect(() => {
    console.log({ countriesBoxWidth });
  }, [countriesBoxWidth]);
  useEffect(() => {
    dispatch(getCountriesRatingTC());
  }, []);

  return (
    <>
      <ForecastBox>
        <Box
          id={"forecast-countries-box"}
          sx={{
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
            gridTemplateColumns: gridForCountriesBox,
            "&::-webkit-scrollbar": {
              width: "0px",
            },
          }}
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
        </Box>
      </ForecastBox>
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
export default DashboardForecast;
