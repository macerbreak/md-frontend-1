import React from "react";
import { useGetFollowsQuery } from "../../../redux/reducers/airQualityApi";
import { FollowsStationGeneralType } from "../../../redux/types/airQualitySliceType";
import { Box } from "@mui/material";
import { constants } from "../../../system/constants";
import { Typography } from "../../../themeComponents/Typography";
import { getCountryFlag } from "../../../utils/getCountryFlag";
import { getAqiColors } from "../DashboardCountriesRating/DashboardCountriesRating";

const DashboardFollows = () => {
  const { data: followsData } = useGetFollowsQuery("");
  console.log({ followsData });
  return (
    <>
      <DashboardFollowsContext.Provider
        value={{
          followsData,
        }}
      >
        <Box
          sx={{
            padding: "20px",
          }}
        >
          {followsData?.map((followsStation, index) => {
            return (
              <DashboardFollowsStation
                key={index}
                index={index}
                followsStation={followsStation}
              />
            );
          })}
        </Box>
      </DashboardFollowsContext.Provider>
    </>
  );
};
const DashboardFollowsStation: React.FC<{
  index: number;
  followsStation: FollowsStationGeneralType;
}> = ({ index, followsStation }) => {
  const { city, country, station } = followsStation;
  const aqiColors = getAqiColors(+station.a);
  return (
    <>
      <Box
        sx={{
          padding: "0 20px",
          borderRadius: "10px",
          height: "60px",
          backgroundColor: constants.colors.sidebar,
          boxShadow: "0px 0px 35px -9px rgba(0,0,0,0.75)",
          border: "5px solid white",
          alignItems: "center",
          display: "grid",
          gridTemplateColumns: "50px 70px 1fr 1fr 1fr 60px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
          }}
        >
          {index + 1}
        </Typography>
        <Box
          sx={{
            width: "70px",
            height: "35px",
            img: {
              width: "50px",
              height: "35px",
            },
          }}
        >
          <img src={getCountryFlag(country)} />
        </Box>
        <Typography>{city}</Typography>
        <Typography>{station.n}</Typography>
        <Typography>
          {station.g[0]}, {station.g[1]}
        </Typography>
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
          {station.a}
        </Box>
      </Box>
    </>
  );
};
const DashboardFollowsContext = React.createContext({
  followsData: [] as FollowsStationGeneralType[] | undefined,
});
export default DashboardFollows;
