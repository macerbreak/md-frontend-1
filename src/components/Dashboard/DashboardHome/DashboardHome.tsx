import React, { useEffect, useState } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { getLocationData } from "../../../api";
import { useAppDispatch } from "../../../redux/hooks";

interface CurrentLocationType {
  countryCode: string;
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
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocationType | null>(null);

  const setLocation = (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    const { latitude, longitude } = position.coords;
    dispatch(getLocationDataTC(latitude, longitude, setCurrentLocation));
  };
  const errorLocation = (error: unknown) => {
    console.log({ error });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setLocation, errorLocation);
  }, []);
  return <>Dobriy den everybody</>;
};

export default DashboardHome;
