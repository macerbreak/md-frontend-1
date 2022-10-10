import axios from "axios";
const AQI_ACCESS_TOKEN = process.env.REACT_APP_AQI_ACCESS_TOKEN;

export const getCountriesRating = () => {
  return axios.get(
    `https://waqi.info/rtdata/ranking/index2.json?_=${Date.now()}`
  );
};
export const getCityData = (latitude: number, longitude: number) => {
  return axios.get(
    `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${AQI_ACCESS_TOKEN}`
  );
};
export const getAllStations = () => {
  return axios
    .get("https://waqi.info/rtdata/" + "?_=" + Date.now())
    .then((res) => {
      return axios.get(`https://waqi.info/rtdata/${res.data.path}/000.json`);
    });
};
export const getLocationData = (latitude: number, longitude: number) => {
  return axios.get(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
};
