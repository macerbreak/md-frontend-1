import React from 'react'
import {Box, styled} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import DashboardPollutionMap from "./DashboardPollutionMap";
import Sidebar from "./Sidebar/Sidebar";
import {constants} from "../../system/constants";

const Dashboard = () => {
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