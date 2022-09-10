import { Box, Button, styled } from "@mui/material";
import { constants, sidebarWidth } from "../../../system/constants";
import { useNavigate } from "react-router-dom";
import React from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          width: `${sidebarWidth}px`,
          height: "100%",
          background: constants.colors.sidebar,
        }}
      >
        <SidebarButtonsBox>
          <SidebarButton
            onClick={() => {
              navigate("/map");
            }}
          >
            Dashboard Map
          </SidebarButton>
            <SidebarButton
                onClick={() => {

                }}
            >
                Other Item
            </SidebarButton>
            <SidebarButton
                onClick={() => {

                }}
            >
                Other Item
            </SidebarButton>
            <SidebarButton
                onClick={() => {

                }}
            >
                Other Item
            </SidebarButton>
        </SidebarButtonsBox>
      </Box>
    </>
  );
};
const SidebarButtonsBox = styled(Box)({
    display:"flex",
    flexDirection:"column",
});
const SidebarButton = styled("button")({
    width:"80%",
    height:"60px",
    borderRadius:"5px",
    backgroundColor:"white",

});
export default Sidebar;
