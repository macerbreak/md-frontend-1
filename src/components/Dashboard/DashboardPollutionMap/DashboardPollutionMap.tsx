import React from 'react'
import PollutionMap from "../../PollutionMap/PollutionMap";
import {Box, styled} from "@mui/material";
import {constants} from "../../../system/constants";

const DashboardPollutionMap = () => {
    return <>
        <PollutionMapPageBox>
            <PollutionMapBox>
                <PollutionMap/>
            </PollutionMapBox>
        </PollutionMapPageBox>
    </>
}
const PollutionMapBox = styled(Box)({
    width:"90%",
    height:"90%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:constants.colors.sidebar,
    borderRadius:"30px",
    boxShadow:"0px 0px 35px -9px rgba(0,0,0,0.75)",
    border:"5px solid white"
})
const PollutionMapPageBox = styled(Box)({
    width:'100%',
    height:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
})
export default DashboardPollutionMap