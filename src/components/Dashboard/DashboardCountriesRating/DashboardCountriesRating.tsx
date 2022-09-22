import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  convertCountryCode,
  isoCountries,
} from "../../../utils/getCountryNameByCode";
import React, { useEffect, useState } from "react";
import { getCountriesRatingTC } from "../../../redux/reducers/airQualitySlice";
import { Box } from "@mui/material";
import {City, CountriesRatingType} from "../../../redux/types/airQualitySliceType";
import { constants } from "../../../system/constants";
import { Typography } from "../../../themeComponents/Typography";
import DashboardCountriesRatingChart from "./DashboardCountriesRatingChart";
import Chart from "./Chart";
import { withTooltip } from "@visx/tooltip";
import Chart2 from "./Chart2";
import Chart3 from "./Chart3";
import LineChart from "./Chart3";
import { getCountriesWithNamesAndFlagsArray } from "../../../utils/getCountriesWithNamesAndFlagsArray";


const DashboardCountriesRating = () => {
  const countriesRating = useAppSelector(
    (state) => state.airQualitySlice.countriesRating
  );
  //https://www.countryflagsapi.com/
  const countriesWithNamesAndFlagsArray = getCountriesWithNamesAndFlagsArray(countriesRating)

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCountriesRatingTC());
  }, []);
  console.log({ countriesRating, countriesWithNamesAndFlagsArray });
  return (
    <>
      <Box
        sx={{
          padding: "20px",
          height: "100vh",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "2px",
          },
        }}
      >
        {countriesWithNamesAndFlagsArray.map((country, index) => {
          return (
            <>
              <CountryRatingItem country={country} key={index} />
            </>
          );
        })}
      </Box>
    </>
  );
};
const aqiRanges = {
  good: [0, 50],
  moderate: [51, 100],
  unhealthyForSensitiveGroups: [101, 150],
  unhealthy: [151, 200],
  veryUnhealthy: [201, 300],
  hazardous: [300],
};
export const getAqiColors = (aqi: number) => {
  if (aqi <= aqiRanges.good[1]) {
    return {
      color: constants.colors.white,
      backgroundColor: constants.colors.aqiIndex.good,
    };
  } else if (aqi <= aqiRanges.moderate[1]) {
    return {
      color: constants.colors.white,
      backgroundColor: constants.colors.aqiIndex.moderate,
    };
  } else if (aqi <= aqiRanges.unhealthyForSensitiveGroups[1]) {
    return {
      color: constants.colors.white,
      backgroundColor: constants.colors.aqiIndex.unhealthyForSensitiveGroups,
    };
  } else if (aqi <= aqiRanges.unhealthy[1]) {
    return {
      color: constants.colors.white,
      backgroundColor: constants.colors.aqiIndex.unhealthy,
    };
  } else if (aqi <= aqiRanges.veryUnhealthy[1]) {
    return {
      color: constants.colors.white,
      backgroundColor: constants.colors.aqiIndex.veryUnhealthy,
    };
  } else {
    return {
      color: constants.colors.white,
      backgroundColor: constants.colors.aqiIndex.hazardous,
    };
  }
};
const CountryRatingItem: React.FC<{
  country: City & {
    flag: string;
    countryName: string;
    place: number;
  };
}> = ({ country }) => {
  const [isExpandedAccordion, setIsExpandedAccordion] = useState(false);
  const aqiColors = getAqiColors(country.aqi);
  return (
    <>
      <Box
        sx={{
          // background:constants.gradients.sectionBoxGradient,
          backgroundColor: constants.colors.sidebar,
          borderRadius: "10px",
          boxShadow: "0px 0px 35px -9px rgba(0,0,0,0.75)",
          border: "5px solid white",
          height: "auto",
          marginBottom: "20px",
          paddingLeft: "20px",
          paddingBottom: isExpandedAccordion ? "20px" : "0px",
        }}
      >
        <Box
          onClick={() => {
            setIsExpandedAccordion(!isExpandedAccordion);
          }}
          sx={{
            display: "grid",
            gridTemplateColumns: "40px 70px 50px 1fr 80px 50px",
            height: "50px",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              verticalAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
              }}
            >
              {country.place}
            </Typography>
          </Box>

          <Box
            sx={{
              height: "70%",
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
            }}
          >
            {country.country}
          </Typography>
          <Typography sx={{}}>{country.countryName}</Typography>
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
            {country.aqi}
          </Box>
          <Box
            sx={{
              svg: {
                transform: isExpandedAccordion
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: constants.transition,
              },
              transition: constants.transition,
            }}
          >
            <AccordionArrowSvg />
          </Box>
        </Box>
        <Box
          sx={{
            maxHeight: isExpandedAccordion ? "450px" : "0px",
            overflow: "hidden",
            transition: constants.transition,
          }}
        >
            {isExpandedAccordion && <LineChart countryData={country.evolution as [number, number][]}/>}
          {/*<Chart2*/}
          {/*  countryData={country.evolution as [number, number][]}*/}
          {/*  width={600}*/}
          {/*  height={400}*/}
          {/*/>*/}


          {/*<Box sx={{*/}
          {/*    position: "relative",*/}
          {/*    backgroundColor: "#201d47",*/}
          {/*    width: "600px",*/}
          {/*    minWidth: "300px",*/}
          {/*    height: "400px",*/}
          {/*    borderRadius: "40px",*/}
          {/*    overflow: "hidden"*/}
          {/*}}>*/}
          {/*  <DashboardCountriesRatingChart countryData1={country.evolution as [number,number][]}/>*/}

          {/*</Box>*/}
        </Box>
      </Box>
    </>
  );
};
const AccordionArrowSvg = () => {
  return (
    <svg
      width={"25"}
      height="25"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 330 330"
    >
      <path
        id="XMLID_225_"
        d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
    c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
    s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
      />
    </svg>
  );
};
export default DashboardCountriesRating;
