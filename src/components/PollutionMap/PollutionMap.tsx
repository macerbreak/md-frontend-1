import {Box} from "@chakra-ui/react";
import UtilityPanel from "../../layouts/utilityPanel/utilityPanel";
import MainMap from "../../layouts/map/MainMap";
import React from "react";
import {ToastContainer} from "../../App";

const PollutionMap = () => {
    return <>
        <Box sx={{
            position:"relative",
            width:"700px",
            height:"500px"
        }}>
            <UtilityPanel/>
            <ToastContainer />
            <MainMap />
        </Box>
    </>
}
export default PollutionMap