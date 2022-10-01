import React, { useContext, useEffect, useMemo, useState } from "react";
import { Box, styled } from "@mui/material";
import { constants } from "../../../system/constants";
import { getAllStationsTC } from "../../../redux/reducers/airQualitySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { GetAllStationsStation } from "../../../redux/types/airQualitySliceType";
import { Typography } from "../../../themeComponents/Typography";
import { getAqiColors } from "../DashboardCountriesRating/DashboardCountriesRating";
import AccordionArrowSvg from "../../../svg/AccordionArrowSvg";
import { inspect } from "util";

const DashboardAllStations = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const allStations = useAppSelector(
    (state) => state.airQualitySlice.allStations
  );
  const allStationsWithPlace = useMemo(
    () =>
      allStations?.map((station, index) => ({ ...station, place: index + 1 })),
    [allStations]
  );
  const searchedStations = useMemo(() => {
    return allStationsWithPlace?.filter((station) => {
      return station.n.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchValue,allStationsWithPlace]);
  console.log();
  const [page, setPage] = useState(1);

  const countOnOnePage = 10;
  const stationsToShow = useMemo(() => {
    if (searchedStations) {
      return searchedStations.slice(
        countOnOnePage * page - countOnOnePage,
        countOnOnePage * page
      );
    } else {
      return [];
    }
  }, [searchedStations, page]);
  console.log({ allStations });
  useEffect(() => {
    dispatch(getAllStationsTC());
  }, []);
  return (
    <>
      <DashboardAllStationsContext.Provider
        value={{
          page,
          setPage,
          allStationsWithPlace,
          countOnOnePage,
          searchValue,
          setSearchValue,
          searchedStations,
        }}
      >
        <Box
          sx={{
            padding: "20px",
          }}
        >
          <Box
            sx={{
              ...constants.boxSectionStyles,
              padding: "20px",
            }}
          >
            <Box sx={{
                height:"48px"
            }}>
              <SearchInput
                  placeholder={"Search..."}
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "auto",
              marginTop: "20px",
              "&::-webkit-scrollbar": {
                width: "0px",
                height: "0px",
              },
            }}
          >
            {stationsToShow?.map((station, index) => {
              return (
                <DashboardAllStationsStationComponent
                  rating={index + 1}
                  station={station}
                  key={index}
                />
              );
            })}
          </Box>
          <DashboardAllStationsPagination />
        </Box>
      </DashboardAllStationsContext.Provider>
    </>
  );
};
const DashboardAllStationsPagination = () => {
  const { page, setPage, countOnOnePage, searchedStations } = useContext(
    DashboardAllStationsContext
  );
  const pagesNumber = searchedStations
    ? Math.ceil(searchedStations?.length / countOnOnePage)
    : 0;
  const pagesArray = new Array(pagesNumber)
    .fill(0)
    .map((_, index) => index + 1);
  const isHiddenFirstPageBtn = page < 4;
  const isHiddenLastPageBtn = page > pagesNumber - 4;
  const middlePages = useMemo(() => {
    if (pagesNumber <= 10) {
      return Array(pagesNumber)
        .fill(0)
        .map((_, index) => index + 1);
    } else if (isHiddenFirstPageBtn) {
      return [1, 2, 3, 4, 5];
    } else if (isHiddenLastPageBtn) {
      return [
        pagesNumber - 4,
        pagesNumber - 3,
        pagesNumber - 2,
        pagesNumber - 1,
        pagesNumber,
      ];
    } else {
      return [page - 2, page - 1, page, page + 1, page + 2];
    }
  }, [pagesNumber, page]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "auto",
          }}
        >
          <PaginationButton
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
            }}
            sx={{
              svg: {
                transform: "rotate(90deg) scale(0.5)",
                marginLeft: "-5px",
              },
            }}
          >
            <AccordionArrowSvg />
          </PaginationButton>
          {!isHiddenFirstPageBtn && (
            <>
              <PaginationButton onClick={() => setPage(1)}>1</PaginationButton>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                ...
              </Typography>
            </>
          )}
          {middlePages.map((pageNumber) => (
            <PaginationButton
              onClick={() => setPage(pageNumber)}
              key={pageNumber}
              isActive={page === pageNumber}
            >
              {pageNumber}
            </PaginationButton>
          ))}
          {!isHiddenLastPageBtn && (
            <>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                ...
              </Typography>
              <PaginationButton onClick={() => setPage(pagesNumber)}>
                {pagesNumber}
              </PaginationButton>
            </>
          )}
          <PaginationButton
            disabled={page === pagesNumber}
            onClick={() => {
              setPage(page + 1);
            }}
            sx={{
              svg: {
                transform: "rotate(-90deg) scale(0.5)",
                marginRight: "-5px",
              },
            }}
          >
            <AccordionArrowSvg />
          </PaginationButton>
          {/*{pagesArray.map(pageNumber=><Typography onClick={()=>setPage(pageNumber)}>{pageNumber}</Typography>)}*/}
        </Box>
      </Box>
    </>
  );
};
const DashboardAllStationsStationComponent: React.FC<{
  station: GetAllStationsStation & { place: number };
  rating: number;
}> = ({ station, rating }) => {
  const name = station.n;
  const aqi = +station.a;
  const aqiColors = getAqiColors(aqi);
  const lat = station.g[0];
  const long = station.g[1];
  return (
    <>
      <Box
        sx={{
          ...constants.boxSectionStyles,
          display: "grid",
          gridTemplateColumns: "50px 1fr 1fr 60px",
          height: "60px",
          marginBottom: "20px",
          alignItems: "center",
          padding: "0px 20px",
        }}
      >
        <Typography sx={{ fontWeight: "600" }}>{station.place}</Typography>
        <Typography>{name}</Typography>
        <Typography>
          {lat}, {long}
        </Typography>
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
  );
};
const DashboardAllStationsContext = React.createContext({
  searchedStations: [] as
    | (GetAllStationsStation & { place: number })[]
    | undefined,
  searchValue: "",
  setSearchValue: (searchValue: string) => {},
  countOnOnePage: 0,
  page: 1,
  setPage: (page: number) => {},
  allStationsWithPlace: [] as
    | (GetAllStationsStation & { place: number })[]
    | undefined,
});
const PaginationButton = styled("button")<{ isActive?: boolean }>(
  ({ isActive }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "45px",
    height: "45px",
    borderRadius: "10px",
    backgroundColor: isActive ? constants.colors.sidebar : "transparent",
    "&:hover": {
      backgroundColor: constants.colors.sidebar,
      transition: constants.transition,
    },
    transition: constants.transition,
  })
);
const SearchInput = styled("input")({
    fontFamily:"Montserrat",
    width:"100%",
    height:"100%",
    borderRadius:"10px",
    paddingLeft:"20px",
    outline:"none"
});
export default DashboardAllStations;
