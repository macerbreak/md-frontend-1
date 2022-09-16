import axios from "axios";

export const getCountriesRating = () =>{
    return axios
        .get(`https://waqi.info/rtdata/ranking/index2.json?_=${Date.now()}`)
}