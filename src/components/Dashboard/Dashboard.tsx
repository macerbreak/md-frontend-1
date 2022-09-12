import React, {useEffect} from 'react'
import {Box, styled} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import DashboardPollutionMap from "./DashboardPollutionMap";
import Sidebar from "./Sidebar/Sidebar";
import {constants} from "../../system/constants";
import axios from "axios";

const AQI_ACCESS_TOKEN = process.env.REACT_APP_AQI_ACCESS_TOKEN
const Dashboard = () => {

    useEffect(()=>{
        axios
            // .get(`https://api.waqi.info/feed/ukraine?token=${AQI_ACCESS_TOKEN}`)
            .get(`https://waqi.info/rtdata/markers-${+Date.now().toString().slice(0,10)}/000.json`)
            // .get("https://waqi.info/rtdata/markers-1663013315/000.json")
            .then((res)=>{
                console.log({res})
            })
    },[])
    return <>
    <Box sx={{
        width:"100%",
        height:"100%",
        display:"flex",
    }}>
        <Sidebar/>
        <RoutesBox>
            <Routes>
                <Route path={"/map"} element={<DashboardPollutionMap/>}/>
            </Routes>
        </RoutesBox>
    </Box>
    </>
}

const RoutesBox = styled(Box)({
    width:"100%",
    height:"100%",
    overflowY:"scroll",
    backGroundColor:constants.colors.pinkVeryPale,
    "&::-webkit-scrollbar":{
        width:"5px"
    }
})

export default Dashboard