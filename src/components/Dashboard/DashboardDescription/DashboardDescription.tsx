import React from 'react'
import {Box} from "@mui/material";
import imgDescription from "../../../assets/img/aqiDescription.jpg"
import {constants} from "../../../system/constants";
import {Typography} from "../../../themeComponents/Typography"
import {appellations, AppellationType} from "./constants/appellations";


const DashboardDescription = () => {
    return <>
    <Box sx={{
        padding:"20px",
    }}>
        <Box sx={{
            display:"flex",
            justifyContent:"center",
            width:"100%",
            padding:"20px",
            img:{
                width:"100%",
                height:"1200px"
            },
            ...constants.boxSectionStyles
        }}>
            <img src={imgDescription}/>
        </Box>
        <Box sx={{
            marginTop:"20px",
            padding:"20px",
            ...constants.boxSectionStyles
        }}>
            {appellations.map((appellation, index)=>{
                return <DashboardDescriptionAppellation number={index+1} appellation={appellation}/>
            })}

        </Box>
    </Box>
    </>
}
const DashboardDescriptionAppellation:React.FC<{
    appellation:AppellationType,
    number:number
}> = ({number,appellation}) => {
    return <>
        <Box sx={{
            display:"flex",
            marginBottom:"10px"
        }}>
            <Typography sx={{
                marginRight:"10px",
            }}>{number})</Typography>
            <Typography>{appellation.value} - {appellation.description}</Typography>
        </Box>

    </>
}
export default DashboardDescription