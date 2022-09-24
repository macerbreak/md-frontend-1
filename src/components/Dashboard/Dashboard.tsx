import React, { useEffect, useState } from "react";
import { Box, styled } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import DashboardPollutionMap from "./DashboardPollutionMap";
import Sidebar from "./Sidebar/Sidebar";
import { constants } from "../../system/constants";
import axios from "axios";
import DashboardCountriesRating from "./DashboardCountriesRating";
import DashboardForecast from "./DashboardForecast";

const AQI_ACCESS_TOKEN = process.env.REACT_APP_AQI_ACCESS_TOKEN;
const Dashboard = () => {
  const config = {
    headers: {
      "cache-control": "max-age=86400",
      "content-type": "application/octet-stream, application/json",
      // "content-type": "application/json, application/json charset=UTF-8",
    },
  };
  useEffect(() => {
    axios
      .get(`https://api.waqi.info/feed/Aviles?token=${AQI_ACCESS_TOKEN}`)
      // https://airnet.waqi.info/airnet/sse/historic/daily/341071?specie=pm25
      //   .get(`https://waqi.info/rtdata/ranking/index2.json?_=${Date.now()}`)
      // .get(
      //   `https://waqi.info/rtdata/markers-${Math.floor(Date.now()/1000 - 600000)}/000.json`,
      //   //   "https://waqi.info/rtdata/markers-1663574735/000.json"
      //   //config
      // )
      // .get("https://waqi.info/rtdata/markers-1663100444/000.json")
      //   .get("https://airnet.waqi.info/airnet/feed/hourly/S008352")
      //   .get("https://api.waqi.info/api/attsse/S008352/yd.json")

      // .get( "https://api.waqi.info/api/feed/@11903/aqi.json")

      .then((res) => {
        console.log({ res });
      });
  }, []);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <Sidebar />
        <RoutesBox>
          <Routes>
            <Route path={"/map"} element={<DashboardPollutionMap />} />

            <Route
              path={"/countries-rating"}
              element={<DashboardCountriesRating />}
            />
            <Route path={"/forecast"} element={<DashboardForecast />} />
          </Routes>
        </RoutesBox>
      </Box>
    </>
  );
};

const RoutesBox = styled(Box)({
  width: "100%",
  height: "100%",
  overflowY: "scroll",
  backGroundColor: constants.colors.pinkVeryPale,
  "&::-webkit-scrollbar": {
    width: "5px",
  },
});

export default Dashboard;
