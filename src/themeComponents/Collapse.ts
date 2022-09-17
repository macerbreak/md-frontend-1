import {Box, styled} from "@mui/material";
import {constants} from "../system/constants";

export const Collapse = styled(Box)<{open:boolean}>(({open})=>({
    maxHeight:open?"100px":"0px",
    height:open?"100px":"0px",
    overflowY:"hidden",
    backgroundColor:"black",
    transition:constants.transition
}))