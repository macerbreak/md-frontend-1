import { Box, Button, styled } from "@mui/material";
import { constants, sidebarWidth } from "../../../system/constants";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import SidebarMapButtonSvg from "../../../svg/SidebarMapButtonSvg";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
            isActive={pathname.includes("/home")}
            onClick={() => {
              navigate("/home");
            }}
          >
            <SidebarMapButtonSvg />
            Home
          </SidebarButton>
          <SidebarButton
            isActive={pathname.includes("/map")}
            onClick={() => {
              navigate("/map");
            }}
          >
            <SidebarMapButtonSvg />
            Dashboard Map
          </SidebarButton>
          <SidebarButton
            isActive={pathname.includes("/countries-rating")}
            onClick={() => {
              navigate("/countries-rating");
            }}
          >
            Countries Rating
          </SidebarButton>
          <SidebarButton
            isActive={pathname.includes("/forecast")}
            onClick={() => {
              navigate("/forecast");
            }}
          >
            Forecast
          </SidebarButton>
          <SidebarButton
            isActive={pathname.includes("/all-stations")}
            onClick={() => {
              navigate("/all-stations");
            }}
          >
            All stations
          </SidebarButton>
          {/*<SidebarButton*/}
          {/*  isActive={pathname.includes("/history")}*/}
          {/*  onClick={() => {*/}
          {/*    navigate("/history");*/}
          {/*  }}*/}
          {/*>*/}
          {/*  History*/}
          {/*</SidebarButton>*/}
          <SidebarButton
            isActive={pathname.includes("/follows")}
            onClick={() => {
              navigate("/follows");
            }}
          >
            Follows
          </SidebarButton>
            <SidebarButton
                isActive={pathname.includes("/description")}
                onClick={() => {
                    navigate("/description");
                }}
            >
                Description
            </SidebarButton>
        </SidebarButtonsBox>
      </Box>
    </>
  );
};
const SidebarButtonsBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "300px",
});
const SidebarButton = styled("button")<{ isActive?: boolean }>(
  ({ isActive }) => ({
    width: "90%",
    height: "50px",
    borderRadius: "5px",
    backgroundColor: isActive ? "white" : "transparent",
    color: isActive
      ? constants.colors.sidebarActiveButtonFont
      : constants.colors.sidebarRegularButtonFont,
    fontFamily: "Montserrat",
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "500",
    transition: constants.transition,
    "&:hover": {
      backgroundColor: "white",
      transition: constants.transition,
      color: constants.colors.sidebarActiveButtonFont,
    },
  })
);
export default Sidebar;
