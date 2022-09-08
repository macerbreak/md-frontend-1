import React, {ReactNode} from 'react'
import {Box} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import PollutionMap from "../PollutionMap/PollutionMap";

const Dashboard = () => {
    return <>
    <Box sx={{
        width:"100%",
        height:"100%",
        display:"flex"
    }}>
        <Sidebar/>
        <Routes>
            <Route path={"/map"} element={<PollutionMap/>}/>
        </Routes>
    </Box>
    </>
}
const Sidebar = () => {
    return <>
        <Box sx={{
            width:"300px",
            height:"100%",
            background:"green"
        }}>
        </Box>
    </>
}
export default Dashboard