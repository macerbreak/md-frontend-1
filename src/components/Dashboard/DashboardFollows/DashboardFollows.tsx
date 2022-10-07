import React, { useContext, useMemo, useState } from "react";
import {
  useDeleteFollowCityMutation,
  useGetFollowsQuery,
} from "../../../redux/reducers/airQualityApi";
import { FollowsStationGeneralType } from "../../../redux/types/airQualitySliceType";
import { Box, styled } from "@mui/material";
import { constants } from "../../../system/constants";
import { Typography } from "../../../themeComponents/Typography";
import { getCountryFlag } from "../../../utils/getCountryFlag";
import { getAqiColors } from "../DashboardCountriesRating/DashboardCountriesRating";

const DashboardFollows = () => {
  const { data: followsData, refetch: refetchFollows } = useGetFollowsQuery("");
  const [isDisplayedCritical, setIsDisplayedCritical] = useState(true);
  const filteredFollowsData = useMemo(() => {
    if (isDisplayedCritical) {
      return followsData?.filter(
        (followsDataItem) => +followsDataItem.station.a >= 100
      );
    } else {
      return followsData;
    }
  }, [followsData, isDisplayedCritical]);
  const handleCheckbox = (e: { target: { checked: boolean } }) => {
    setIsDisplayedCritical(e.target.checked);
  };
  console.log({ filteredFollowsData });
  return (
    <>
      <DashboardFollowsContext.Provider
        value={{
          followsData,
          isDisplayedCritical,
          refetchFollows,
        }}
      >
        <Box
          sx={{
            padding: "20px",
          }}
        >
          <Box
            sx={{
              padding: "0 20px",
              borderRadius: "10px",
              height: "60px",
              backgroundColor: constants.colors.sidebar,
              boxShadow: "0px 0px 35px -9px rgba(0,0,0,0.75)",
              border: "5px solid white",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label
              style={{
                display: "flex",
                width: "auto",
              }}
            >
              <input
                type={"checkbox"}
                checked={isDisplayedCritical}
                onChange={handleCheckbox}
              />
              <Typography
                sx={{
                  marginLeft: "10px",
                }}
              >
                Only critical
              </Typography>
            </label>
          </Box>
          {filteredFollowsData?.map((followsStation, index) => {
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
  // const { city, country, station } = followsStation;
  const city = followsStation?.city;
  const followCityId = followsStation?.id;
  const [deleteFollowStationCallback, { data: deleteFollowStationData }] =
    useDeleteFollowCityMutation();
  const { refetchFollows } = useContext(DashboardFollowsContext);
  const handleUnfollow = (
    e: { stopPropagation: () => void },
    cityId: number
  ) => {
    e.stopPropagation();
    deleteFollowStationCallback({ stationId: cityId, refetchFollows });
  };
  const country = followsStation?.country;
  const station = followsStation?.station;
  const aqiColors = getAqiColors(+station?.a);
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
          gridTemplateColumns: "50px 70px 1fr 1fr 1fr 100px 60px",
          marginBottom: "20px",
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
        <Typography>{station?.n}</Typography>
        <Typography>
          {station?.g?.[0]}, {station?.g?.[1]}
        </Typography>
        <FollowButton
          onClick={(e) => {
            handleUnfollow(e, followCityId);
          }}
        >
          Unfollow
        </FollowButton>
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
          {station?.a}
        </Box>
      </Box>
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
const DashboardFollowsContext = React.createContext({
  isDisplayedCritical: false,
  refetchFollows: () => {},
  followsData: [] as FollowsStationGeneralType[] | undefined,
});
export default DashboardFollows;
