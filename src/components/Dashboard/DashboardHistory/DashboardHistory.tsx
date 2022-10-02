import React, {useEffect} from 'react'
import axios from "axios";


// const eventSource = new EventSource(`https://airnet.waqi.info/airnet/sse/historic/daily/227467?specie=pm25`)
const eventSource = new EventSource(`https://api.waqi.info/api/attsse/9996/yd.json?token=${process.env.REACT_APP_AQI_ACCESS_TOKEN}`)
const DashboardHistory = () => {

    useEffect(()=>{
         fetch("https://airnet.waqi.info/airnet/sse/historic/daily/227467?specie=pm25").then(console.log)
        console.log(eventSource)
        eventSource.addEventListener('message', function(e) {
            console.log(e.data);
        }, false);
        // eventSource.addEventListener('error', function(e) {
        //     console.log(e)
        // }, false);
        eventSource.onerror= (e)=>console.log({e})
    },[])
    return <>dsasdaads</>
}
export default DashboardHistory