import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useGetFollowsQuery,
  useGetHistoryByFollowStationIdQuery,
} from "../../../redux/reducers/airQualityApi";
import { Box } from "@mui/material";
import { constants } from "../../../system/constants";
import AccordionArrowSvg from "../../../svg/AccordionArrowSvg";
import { Typography } from "../../../themeComponents/Typography";
import moment from "moment";
import { getCountryFlag } from "../../../utils/getCountryFlag";
import { getAqiColors } from "../DashboardCountriesRating/DashboardCountriesRating";

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
  const [stationId, setStationId] = useState(1);
  const [selectedValue, setSelectedValue] = useState(null);
  const { data: historyDataById } = useGetHistoryByFollowStationIdQuery(
    { stationId: stationId ?? 0 },
    { skip: !stationId }
  );
  const { data: followsData, refetch: refetchFollows } = useGetFollowsQuery("");
  useEffect(() => {
    refetchFollows();
  }, []);

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
            marginTop: "20px",
          }}
        >
          <DashboardSelect />
        </Box>
        {historyDataById?.map((historyItem, index) => {
          const aqiColors = getAqiColors(+historyItem?.aqi);
          return (
            <>
              <Box
                key={historyItem.id}
                sx={{
                  ...constants.boxSectionStyles,
                  display: "grid",
                  gridTemplateColumns: "90px 1fr 1fr 60px",
                  alignItems: "center",
                  height: "60px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  marginTop: "20px",
                }}
              >
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
                  <img src={getCountryFlag(historyItem.country)} />
                </Box>
                <Typography>{historyItem.city}</Typography>
                <Typography>
                  {moment(historyItem.date).format("DD-MM-YYYY HH:mm:ss")}
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
                  {historyItem.aqi}
                </Box>
              </Box>
            </>
          );
        })}
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
          <Typography>{value?.label}1111</Typography>
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
              width: width ? width : "250px",
              minHeight: "40px",
              maxHeight: "250px",
              overflowY: "scroll",
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid gray",
              "&::-webkit-scrollbar": {
                width: "0px",
              },
            }}
          >
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
            <Typography>Hello</Typography>
          </Box>
        )}
      </Box>
    </>
  );
};
export default DashboardHistory;
