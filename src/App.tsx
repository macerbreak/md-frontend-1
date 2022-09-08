import React, { useEffect } from "react";

import "./App.css";
import { useAppSelector } from "./redux/hooks";
import { createStandaloneToast } from "@chakra-ui/toast";
import Dashboard from "./components/Dashboard/Dashboard";
import { Box } from "@mui/material";
export const { ToastContainer, toast } = createStandaloneToast();

function App() {
  const valueFromRedux = useAppSelector((state) => state.firstReducer.value);
  console.log({ valueFromRedux });
  return (
    <>
      <Box
        sx={{
          width: "100vh",
          height: "100vw",
        }}
      >
        <Dashboard />
      </Box>
    </>
  );
}

export default App;
