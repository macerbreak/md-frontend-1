import React, {useEffect, useMemo, useState} from "react";
import { Dispatch } from "@reduxjs/toolkit";
import {getCityData, getLocationData} from "../../../api";
import { useAppDispatch } from "../../../redux/hooks";
import {useGetCountryDataQuery} from "../../../redux/reducers/forecastApi";
import {Box, styled} from "@mui/material";
import {getCountryFlag} from "../../../utils/getCountryFlag";
import {constants} from "../../../system/constants";
import LineChart from "../DashboardCountriesRating/Chart3";
import {Typography} from "../../../themeComponents/Typography";
import DashboardForecastTable from "../DashboardForecast/DashboardForecastTable";
import {CityForecastResponseData} from "../../../redux/types/airQualitySliceType";
import {getAqiColors} from "../DashboardCountriesRating/DashboardCountriesRating";

interface CurrentLocationType {
  countryCode: string;
  countryName:string,
  city:string
  continent:string
  latitude:number
  longitude:number
}
const getCityHomeDataTC = (latitude: number, longitude: number, setCityData:(cityDate:unknown)=>void) => async () => {
  const getCityDataResponse = await getCityData(latitude,longitude)
  setCityData(getCityDataResponse.data)
}
const getLocationDataTC =
  (
    latitude: number,
    longitude: number,
    setCurrentLocation: (currentLocation: CurrentLocationType) => void
  ) =>
  async (dispatch: Dispatch) => {
    const getLocationDataResponse = await getLocationData(latitude, longitude);
    setCurrentLocation(getLocationDataResponse.data);
  };
const DashboardHome = () => {
  const dispatch = useAppDispatch();
  const [cityData, setCityData] = useState<null| { data: { aqi:number} }>(null)
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocationType | null>(null);
  const aqiColors = getAqiColors(cityData?.data?.aqi ?? 0);
  const countryFlag = useMemo(()=> {
    if(currentLocation?.countryCode){
      return getCountryFlag(currentLocation?.countryCode)
    }
    else{
      return ""
    }
  },[currentLocation])
  console.log({currentLocation})
  const { data: countryData, refetch: refetchCountryData } =
      useGetCountryDataQuery(currentLocation?.countryCode);
  const setLocation = (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    const { latitude, longitude } = position.coords;
    dispatch(getLocationDataTC(latitude, longitude, setCurrentLocation));
    dispatch(getCityHomeDataTC(latitude, longitude,setCityData as (cityDate: unknown) => void))
  };
  const errorLocation = (error: unknown) => {
    console.log({ error });
  };
  useEffect(()=>{
    refetchCountryData()
  },[])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setLocation, errorLocation);
  }, []);
  {console.log({currentLocation, cityData})}
  return <>
    <DashboardHomeContext.Provider value={{

    }}>
      <Box sx={{

        padding:"20px",
        width:"100%"
      }}>
        <Box sx={{
          display:"flex",
          justifyContent:"space-between",
          marginBottom:"30px"
        }}>
          <SectionBox sx={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            width:"30%",
            height:"300px",
            img:{
              width:'90%',
              height:"90%"
            }
          }}><img src={countryFlag}/></SectionBox>
          <SectionBox sx={{
            width:"67%",
            height:"300px"
          }}>
            <LineChart countryData={countryData?.country?.evolution as [number, number][]} />
          </SectionBox>
        </Box>

        <SectionBox sx={{
          width:"320px",
          height:"320px",
          padding:"20px",
          marginBottom:"30px",
          display:"flex",
          flexDirection:"column",
          // alignItems:"center"
        }}>
          <Typography sx={{
            fontWeight:"600",
            fontSize:"26px",
            textAlign:"center",
          }}>Your Location</Typography>
          <LocationItemBox>
            <LocationItemTypography>Country:</LocationItemTypography>
            <LocationItemTypographyValue>{currentLocation?.countryName}</LocationItemTypographyValue>
          </LocationItemBox>
          <LocationItemBox>
            <LocationItemTypography>City:</LocationItemTypography>
            <LocationItemTypographyValue>{currentLocation?.city}</LocationItemTypographyValue>
          </LocationItemBox>
          <LocationItemBox>
            <LocationItemTypography>Continent:</LocationItemTypography>
            <LocationItemTypographyValue>{currentLocation?.continent}</LocationItemTypographyValue>
          </LocationItemBox>
          <LocationItemBox>
            <LocationItemTypography>Latitude:</LocationItemTypography>
            <LocationItemTypographyValue>{currentLocation?.latitude}</LocationItemTypographyValue>
          </LocationItemBox>
          <LocationItemBox>
            <LocationItemTypography>Longitude:</LocationItemTypography>
            <LocationItemTypographyValue>{currentLocation?.longitude}</LocationItemTypographyValue>
          </LocationItemBox>
          <LocationItemBox>
            <LocationItemTypography>AQI:</LocationItemTypography>
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
              {cityData?.data?.aqi}
            </Box>
          </LocationItemBox>
        </SectionBox>

        <DashboardForecastTable cityForecastResponse={cityData?.data as CityForecastResponseData | null}/>
      </Box>
    </DashboardHomeContext.Provider>
  </>;
};

const DashboardHomeContext = React.createContext({

})
const LocationItemTypography = styled(Typography)({
  fontSize:"20px",
  width:"120px",
  marginLeft:"30px"
})
const LocationItemTypographyValue = styled(LocationItemTypography)({
  // display:"flex",
  // justifyContent:"flex-end"
  // marginLeft:"30px"
  marginLeft:"0px"
})
const LocationItemBox = styled(Box)({
    marginBottom:"10px",
  // display:"grid",
  // gridTemplateColumns:"120px 150px"
  display:"flex"
})
const SectionBox = styled(Box)({
  backgroundColor:constants.colors.sidebar,
  borderRadius:"30px",
  boxShadow:"0px 0px 35px -9px rgba(0,0,0,0.75)",
  border:"5px solid white",
})
export default DashboardHome;
