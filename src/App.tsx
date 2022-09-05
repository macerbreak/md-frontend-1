import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {useAppSelector} from "./redux/hooks";
import {useGetFirstDataQuery} from "./redux/reducers/firstApi";

function App() {
  // useEffect(()=>{
  //   axios.get("http://localhost:5000").then(res=>{
  //     console.log({res})
  //   })
  // },[])
  const valueFromRedux = useAppSelector(state=>state.firstReducer.value)
  const {data:firstResult} = useGetFirstDataQuery("")
  console.log({valueFromRedux})
  console.log({firstResult})
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
