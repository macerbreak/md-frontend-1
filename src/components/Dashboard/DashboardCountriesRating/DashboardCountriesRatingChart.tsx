import React, {TouchEvent, MouseEvent, useState, useEffect} from "react";
import { useQuery } from "react-query";
import useMeasure from "react-use-measure";
import { TooltipWithBounds, useTooltip, defaultStyles } from "@visx/tooltip";
import { timeFormat } from "d3-time-format";
import { Group } from "@visx/group";
import {scaleLinear, scaleTime, TimeDomain} from "@visx/scale";
import { localPoint } from "@visx/event";
import { bisector, extent } from "d3-array";
import { Bar, Line, LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";

type Data = [number, number];

const getPrices = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
  );

  const data = await res.json();

  const prices = data.prices;

  return prices;
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const getXValue = (d: Data) => new Date(d[1]);

const getYValue = (d: Data) => d[0];

const bisectDate = bisector<Data, Date>(getXValue).left;

const tooltipStyles = {
  ...defaultStyles,
  borderRadius: 4,
  background: "#161434",
  color: "#ADADD3",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
};

const DashboardCountriesRatingChart:React.FC<{countryData1:Data[]}> = ({countryData1}) => {
  const countryData = countryData1.map(countryDataItem=>[+countryDataItem[0], +countryDataItem[1]*1000]) as Data[]
  const [ref, { width, height }] = useMeasure();
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<Data>();
  const [, setUpdatePage] = useState(1)
  useEffect(()=>{
    setUpdatePage(2)
  },[])

  const xScale = scaleTime({
    range: [0, width],
    domain: extent(countryData, getXValue) as TimeDomain | undefined,
  });

  const yScale = scaleLinear<number>({
    range: [height, 0],
    round: true,
    domain: [
      Math.min(...countryData.map(getYValue)),
      Math.max(...countryData.map(getYValue)),
    ],
    nice: true,
  });

  return (
    <>
      <svg
        ref={ref}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
      >
        <Group>
          <LinePath<Data>
            data={countryData}
            x={(d) => xScale(getXValue(d)) ?? 0}
            y={(d) => yScale(getYValue(d)) ?? 0}
            stroke="#23DBBD"
            strokeWidth={2}
            curve={curveMonotoneX}
          />
        </Group>

        <Group>
          <Bar
            width={width}
            height={height}
            fill="transparent"
            onMouseMove={(
              event: TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>
            ) => {
              const { x } = localPoint(event) || { x: 0 };
              console.log(Math.round(x))
              const x0 = xScale.invert(Math.round(x));
              console.log({x0})
              console.log({countryData})
              const index = bisectDate(countryData, x0, 1);
              // console.log({index})
              const d0 = countryData[index - 1];
              const d1 = countryData[index];
              let d = d0;
              if (d1 && getXValue(d1)) {
                d =
                  x0.valueOf() - getXValue(d0).valueOf() >
                  getXValue(d1).valueOf() - x0.valueOf()
                    ? d1
                    : d0;
              }
              // console.log({d})
              showTooltip({
                tooltipData: d,
                tooltipLeft: x,
                tooltipTop: yScale(getYValue(d)),
              });
            }}
            onMouseLeave={() => hideTooltip()}
          />
        </Group>

        {tooltipData ? (
          <Group>
            <Line
              from={{ x: tooltipLeft, y: 0 }}
              to={{ x: tooltipLeft, y: height }}
              stroke="#59588D"
              strokeWidth={1}
              pointerEvents="none"
              strokeDasharray="5, 5"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={8}
              fill="#FF4DCA"
              fillOpacity={0.5}
              pointerEvents="none"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={4}
              fill="#FF4DCA"
              pointerEvents="none"
            />
          </Group>
        ) : null}
      </svg>

      {tooltipData ? (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          {`${timeFormat("%b %d %H:%M ")(new Date(getXValue(tooltipData)))}`}:{" "}
          <b>{formatter.format(getYValue(tooltipData))}</b>
        </TooltipWithBounds>
      ) : null}
    </>
  );
};

export default DashboardCountriesRatingChart;
