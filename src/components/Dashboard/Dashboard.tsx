import React, { useEffect } from "react";
import { Box, styled } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import DashboardPollutionMap from "./DashboardPollutionMap";
import Sidebar from "./Sidebar/Sidebar";
import { constants } from "../../system/constants";
import axios from "axios";

const AQI_ACCESS_TOKEN = process.env.REACT_APP_AQI_ACCESS_TOKEN;
const Dashboard = () => {
  const config = {
    headers: {
      // "content-type": "application/json charset=UTF-8",
      "content-type": "application/json",
      "cache-control": "max-age=86400",
      "content-encoding": "gzip",
      server: "nginx",
      vary: "Accept-Encoding",
      etag: 'W/"631f979d-14ca78"',
      "access-control-allow-origin": "*",
      date: "Mon, 12 Sep 2022 20:33:34 GMT",
      expires: "Tue, 13 Sep 2022 20:33:34 GMT",
      "last-modified": "Mon, 12 Sep 2022 20:33:33 GMT",
    },
  };
  useEffect(() => {
    axios
      // .get(`https://api.waqi.info/feed/ukraine?token=${AQI_ACCESS_TOKEN}`)
      .get(
        `https://waqi.info/rtdata/markers-${+Date.now()
          .toString()
          .slice(0, 10)}/000.json`,
        config
      )
      // .get("https://waqi.info/rtdata/markers-1663013315/000.json")
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
