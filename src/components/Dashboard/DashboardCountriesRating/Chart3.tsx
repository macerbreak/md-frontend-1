import {
    AnimatedAxis,
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip
} from "@visx/xychart";
import React from "react";
import moment from "moment";

// const data1 = [
//     {
//         x: "2018-03-01",
//         y: 30
//     },
//     {
//         x: "2018-04-01",
//         y: 16
//     },
//     {
//         x: "2018-05-01",
//         y: 17
//     },
//     {
//         x: "2018-06-01",
//         y: 24
//     },
//     {
//         x: "2018-07-01",
//         y: 47
//     },
//     {
//         x: "2018-08-01",
//         y: 32
//     },
//     {
//         x: "2018-09-01",
//         y: 8
//     },
//     {
//         x: "2018-10-01",
//         y: 27
//     },
//     {
//         x: "2018-11-01",
//         y: 31
//     },
//     {
//         x: "2018-12-01",
//         y: 105
//     },
//     {
//         x: "2019-01-01",
//         y: 166
//     },
//     {
//         x: "2019-02-01",
//         y: 181
//     },
//     {
//         x: "2019-03-01",
//         y: 232
//     },
//     {
//         x: "2019-04-01",
//         y: 224
//     },
//     {
//         x: "2019-05-01",
//         y: 196
//     },
//     {
//         x: "2019-06-01",
//         y: 211
//     }
// ];

const accessors = {
    //@ts-ignore
    xAccessor: (d) => d.x,
    //@ts-ignore
    yAccessor: (d) => d.y
};

const LineChart:React.FC<{
    countryData:[number,number][]
}> = ({countryData}) => {
    const data1ForSort = countryData.map(country=>({
        x: moment(new Date(country[1]*1000)).format("MM/DD HH:mm"),
        y:country[0]
    }))
    const data1 = data1ForSort.reverse()
    return (
        <XYChart height={300} xScale={{ type: "band" }} yScale={{ type: "linear" }}>
            <AnimatedAxis orientation="bottom" />
            <AnimatedAxis orientation="left" />
            <AnimatedGrid columns={false} numTicks={2} />
            <AnimatedLineSeries dataKey="Line 1" data={data1} {...accessors} />
            <Tooltip
                snapTooltipToDatumX
                snapTooltipToDatumY
                showVerticalCrosshair
                showSeriesGlyphs
                //@ts-ignore
                renderTooltip={({ tooltipData, colorScale }) => (
                    <div>
                        {/*//@ts-ignore*/}
                        <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                            {/*//@ts-ignore*/}
                            {tooltipData.nearestDatum.key}
                        </div>
                        {/*//@ts-ignore*/}
                        {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                        {", "}
                        {/*//@ts-ignore*/}
                        {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                    </div>
                )}
            />
        </XYChart>
    );
};
export default LineChart