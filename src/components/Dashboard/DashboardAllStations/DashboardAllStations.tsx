import React, {useEffect, useMemo, useState} from 'react'
import {Box} from "@mui/material";
import {constants} from "../../../system/constants";
import {getAllStationsTC} from "../../../redux/reducers/airQualitySlice";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {GetAllStationsStation} from "../../../redux/types/airQualitySliceType";
import {Typography} from "../../../themeComponents/Typography"
import {getAqiColors} from "../DashboardCountriesRating/DashboardCountriesRating";

const DashboardAllStations = () => {
    const dispatch = useAppDispatch()
    const allStations = useAppSelector(state=>state.airQualitySlice.allStations)
    const [hundredStationsToShow, setHundredStationsToShow] = useState(1)
    const stationsToShow = useMemo(()=>{
        if(allStations){
            return allStations.slice(0, hundredStationsToShow*100)
        }
        else{
            return []
        }}
    ,[allStations,hundredStationsToShow])
    console.log({allStations})
    useEffect(()=>{
        dispatch(getAllStationsTC())
    },[])
    return <>
        <Box sx={{
            padding:"20px"
        }}>
            <Box sx={{
                ...constants.boxSectionStyles,
                padding:"20px"
            }}></Box>
            <Box sx={{
                width:"100%",
                overflowY:"visible",
                overflowX:"visible",
                height:"600px",
                marginTop:"20px",
                "&::-webkit-scrollbar":{
                    width:"0px",
                    height:"0px",
                }
            }}>
                {stationsToShow?.map((station, index)=>{
                    return <DashboardAllStationsStationComponent rating={index+1} station={station} key={index}/>
                })}
            </Box>
        </Box>

    </>
}
const DashboardAllStationsStationComponent:React.FC<{station:GetAllStationsStation, rating:number}> = ({station,rating}) => {
    const name = station.n
    const aqi = +station.a
    const aqiColors = getAqiColors(aqi);
    const lat = station.g[0]
    const long = station.g[1]
    return <>
        <Box sx={{
            ...constants.boxSectionStyles,
            display:"grid",
            gridTemplateColumns:"50px 1fr 1fr 60px",
            height:"60px",
            marginBottom:"20px",
            alignItems:"center",
            padding:"0px 20px"
        }}>
            <Typography sx={{fontWeight:"600"}}>{rating}</Typography>
            <Typography>{name}</Typography>
            <Typography>{lat}, {long}</Typography>
            <Box
                sx={{
                    width: "60px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                    fontWeight: "600",
                    ...aqiColors,
                }}
            >
                {aqi}
            </Box>
        </Box>
    </>
}
export default DashboardAllStations