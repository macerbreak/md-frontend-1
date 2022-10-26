import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetHistoryByFollowStationIdQuery } from "../../../redux/reducers/airQualityApi";
import { Box } from "@mui/material";
import { constants } from "../../../system/constants";
import AccordionArrowSvg from "../../../svg/AccordionArrowSvg";
import { Typography } from "../../../themeComponents/Typography";

// const eventSource = new EventSource(`https://airnet.waqi.info/airnet/sse/historic/daily/227467?specie=pm25`)
// const eventSource = new EventSource(`https://api.waqi.info/api/attsse/9996/yd.json`)
// useEffect(()=>{
//     fetch("https://airnet.waqi.info/airnet/sse/historic/daily/227467?specie=pm25").then(console.log)
//     console.log(eventSource)
//     eventSource.addEventListener('message', function(e) {
//         console.log(e.data);
//     }, false);
//     // eventSource.addEventListener('error', function(e) {
//     //     console.log(e)
//     // }, false);
//     eventSource.onerror= (e)=>console.log({e})
// },[])

const DashboardHistory = () => {
  const [stationId, setStationId] = useState(3);
  const { data: historyDataById } = useGetHistoryByFollowStationIdQuery(
    { stationId: stationId ?? 0 },
    { skip: !stationId }
  );
  console.log({ historyDataById });
  return (
    <>
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Box
          sx={{
            ...constants.boxSectionStyles,
            height: "100px",
            display: "flex",
            alignItems: "center",
            padding: "0px 20px",
          }}
        >
          <DashboardSelect />
        </Box>
      </Box>
    </>
  );
};
const DashboardSelect: React.FC<{
  onChange?: () => void;
  values?: { label: string; value: unknown }[];
  value?: { label: string; value: unknown };
  width?: string;
  height?: string;
}> = ({ onChange, values, value, width, height }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Box
          onClick={() => {
            setIsOpened(!isOpened);
          }}
          sx={{
            width: width ? width : "250px",
            height: height ? height : "40px",
            backgroundColor: "white",
            border: "1px solid gray",
            borderRadius: "10px",
            padding: "0px 15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>sda</Typography>
          <Box>
            <AccordionArrowSvg />
          </Box>
        </Box>
        {isOpened && (
          <Box
            sx={{
              position: "absolute",
              top: height ? `calc(${height} + 5px)` : "45px",
              left: "0px",
            }}
          >
            Hello
          </Box>
        )}
      </Box>
    </>
  );
};
export default DashboardHistory;
