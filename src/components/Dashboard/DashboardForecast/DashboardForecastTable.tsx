import React, { useMemo } from "react";
import { CityForecastResponseData } from "../../../redux/types/airQualitySliceType";
import moment from "moment";
import { Box } from "@mui/material";
import { constants } from "../../../system/constants";
import { Typography } from "../../../themeComponents/Typography";

interface TableRowType {
    avg: number;
    max: number;
    min: number;
}
const DashboardForecastTable: React.FC<{
  cityForecastResponse: CityForecastResponseData | null;
}> = ({ cityForecastResponse }) => {
  const dailyForecast = cityForecastResponse?.forecast?.daily;
  console.log({ dailyForecast });
  const datesArray = useMemo(() => {
    if (dailyForecast) {
      const biggestLengthElement = Object.values(dailyForecast).reduce(
        (maxLength = 0, ell) => {
          if (maxLength > ell.length) {
            return maxLength;
          } else {
            return ell.length;
          }
        }
      );
      return Object.values(dailyForecast)
        .filter((ell) => {
          return ell.length === biggestLengthElement;
        })[0]
        .map((forecastValue: { day: string }) => forecastValue.day);
    }
  }, [dailyForecast]);
  const tableHeaderArray = useMemo(() => {
    if (dailyForecast) {
      return [""].concat(Object.keys(dailyForecast));
    } else {
      return [];
    }
  }, [dailyForecast]);
  const tableRowsArray = datesArray?.map((dateValue: string) => {
    const arrKeyValue = tableHeaderArray?.map((keyForValue, index) => {
      if (index === 0) {
        return ["day", dateValue];
      } else {
        return [
          keyForValue,
          dailyForecast?.[keyForValue as keyof typeof dailyForecast]?.filter(
            (keyForValueArray) =>
              moment(keyForValueArray.day).format("YYYY-MM-DD") === dateValue
          )[0],
        ];
      }
    });
    return Object.fromEntries(arrKeyValue);
  });
  const gridTemplatesColumns = `100px repeat(${
    tableHeaderArray.length > 2 ? tableHeaderArray.length - 2 : 0
  }, 1fr) 100px`;
  return (
    <>
      <Box
        sx={{
          backgroundColor: constants.colors.sidebar,
          borderRadius: "10px",
          boxShadow: "0px 0px 35px -9px rgba(0,0,0,0.75)",
          border: "5px solid white",
          // height: "400px",
          // maxHeight: "400px",
          marginBottom: "20px",
          padding: "20px ",
          overflowY: "scroll",
          display: "flex",
          justifyContent: "center",
          "&::-webkit-scrollbar": {
            width: "0px",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: gridTemplatesColumns,
              paddingTop: "10px",
              paddingBottom: "10px",
              position: "sticky",
              top: "-20px",
              backgroundColor: constants.colors.sidebar,
            }}
          >
            {tableHeaderArray?.map((headerItem, index) => {
              return (
                <>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                    key={index}
                  >
                    {headerItem.toUpperCase()}
                  </Typography>
                </>
              );
            })}
          </Box>
          {tableRowsArray?.map(
            (
              tableRow: {
                [dayItem: string]:
                  | {
                      avg: number;
                      max: number;
                      min: number;
                    }
                  | string;
              },
              index: number
            ) => {
              return (
                <>
                  <Box
                    key={index}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: gridTemplatesColumns,
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      "&:hover": {
                        border: "3px solid white",
                        backgroundColor: "rgba(255,255,255,0.5)",
                        transition: constants.transition,
                      },
                      transition: constants.transition,
                    }}
                  >
                    {tableHeaderArray?.map((headerItem, indexFromHeader) => {
                      const tableRowWithTypedDay = tableRow as { day: string };
                      const day = tableRowWithTypedDay?.day
                        ? tableRowWithTypedDay?.day
                        : "";
                      const tableRowHeaderItem = tableRow[
                        headerItem as keyof typeof tableRow
                      ] as TableRowType;
                      const avg = tableRowHeaderItem
                        ? tableRowHeaderItem.avg
                        : "";
                      const max = tableRowHeaderItem
                        ? tableRowHeaderItem.max
                        : "";
                      const min = tableRowHeaderItem
                        ? tableRowHeaderItem.min
                        : "";

                      return (
                        <>
                          <Box
                            sx={{
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            key={indexFromHeader}
                          >
                            {indexFromHeader === 0 ? (
                              <Typography
                                sx={{
                                  fontWeight: "600",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {day}
                              </Typography>
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                {avg !== "" && (
                                  <Typography>
                                    <span
                                      style={{
                                        fontWeight: "500",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      avg:
                                    </span>
                                    {avg}
                                  </Typography>
                                )}
                                {max !== "" && (
                                  <Typography>
                                    <span
                                      style={{
                                        fontWeight: "500",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      max:
                                    </span>
                                    {max}
                                  </Typography>
                                )}
                                {min !== "" && (
                                  <Typography>
                                    <span
                                      style={{
                                        fontWeight: "500",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      min:
                                    </span>
                                    {min}
                                  </Typography>
                                )}
                              </Box>
                            )}
                          </Box>
                        </>
                      );
                    })}
                  </Box>
                </>
              );
            }
          )}
        </Box>
      </Box>
    </>
  );
};
export default DashboardForecastTable;
