/*#region synchronizedd3charts*/
export const SynchronizedLineChartString = 'import React, { useEffect, useRef } from \'react\';\n' +
  'import { extent, max, mean, min, pointers, \n' +
  '  scaleLinear, scaleTime, select, selectAll, zoom, zoomIdentity } from \'d3\';\n' +
  '\n' +
  'import Chart from \'./components/Chart.d3\';\n' +
  'import YAxis from \'./components/yAxis.d3\';\n' +
  'import XAxis from \'./components/xAxis.d3\';\n' +
  'import Line from \'./components/Line.d3\';\n' +
  'import ChartTooltipText from \'./components/ChartToolTipText.d3\';\n' +
  'import useDimensions from \'./tools/useDimensions\';\n' +
  'import ChartTooltipDot from \'./components/ChartToolTipDot.d3\';\n' +
  '\n' +
  'const SynchronizedLineChart = ({\n' +
  '                                 data,\n' +
  '                                 chartName,\n' +
  '                                 currentGlobalZoomState,\n' +
  '                                 setCurrentGlobalZoomState,\n' +
  '                                 currentYZoomState,\n' +
  '                                 setCurrentYZoomState,\n' +
  '                                 currentXZoomState,\n' +
  '                                 setCurrentXZoomState,\n' +
  '                                 hoverActive,\n' +
  '                                 setHoverActive,\n' +
  '                                 date,\n' +
  '                                 setDate\n' +
  '                               }) => {\n' +
  '  if (!data) return;\n' +
  '\n' +
  '  const svgRef = useRef();\n' +
  '  const [wrapperRef, dimensions] = useDimensions();\n' +
  '  const DIMENSIONS = {\n' +
  '    marginTop: 10,\n' +
  '    marginRight: 20,\n' +
  '    marginBottom: 50,\n' +
  '    marginLeft: 55,\n' +
  '    innerPadding: 10\n' +
  '  };\n' +
  '  const updatedDimensions = {\n' +
  '    ...DIMENSIONS,\n' +
  '    ...dimensions,\n' +
  '    boundedHeight: dimensions.height - DIMENSIONS.marginTop - DIMENSIONS.marginBottom,\n' +
  '    boundedWidth: dimensions.width - DIMENSIONS.marginLeft - DIMENSIONS.marginRight\n' +
  '  };\n' +
  '  const { boundedHeight, boundedWidth, innerPadding } = updatedDimensions;\n' +
  '\n' +
  '  let yAccessor = (d) => d?.y;\n' +
  '  let xAccessor = (d) => d?.x;\n' +
  '\n' +
  '  const yScale = scaleLinear().\n' +
  '    domain([min(data, yAccessor), max(data, yAccessor)]).\n' +
  '    range([boundedHeight - innerPadding, innerPadding]);\n' +
  '\n' +
  '  const xScale = scaleTime().\n' +
  '    domain(extent(data, xAccessor)).\n' +
  '    range([0, boundedWidth - innerPadding]);\n' +
  '\n' +
  '  if (currentYZoomState) yScale.domain(currentYZoomState.rescaleY(yScale).domain());\n' +
  '  if (currentXZoomState) xScale.domain(currentXZoomState.rescaleX(xScale).domain());\n' +
  '\n' +
  '  const clipPath = \'url(#clip)\';\n' +
  '\n' +
  '  useEffect(() => {\n' +
  '    const svg = select(svgRef.current);\n' +
  '\n' +
  '    const center = (event, target) => {\n' +
  '      if (event.sourceEvent) {\n' +
  '        const p = pointers(event, target);\n' +
  '        return [mean(p, (d) => d[0]), mean(p, (d) => d[1])];\n' +
  '      }\n' +
  '      return [boundedWidth / 2, boundedHeight / 2];\n' +
  '    };\n' +
  '\n' +
  '    const zoomGlobal = zoom().scaleExtent([0.1, 40]).on(\'zoom\', (event) => {\n' +
  '      const { k: newK, x: newX, y: newY } = event.transform;\n' +
  '      const { k: prevK, x: prevX, y: prevY } = currentGlobalZoomState;\n' +
  '      const point = center(event, svg);\n' +
  '\n' +
  '      const isZoomingX = point[0] > DIMENSIONS.marginLeft + 50 && point[0] / 3 < boundedWidth + 200;\n' +
  '      const isZoomingY = point[1] / 10 < boundedHeight;\n' +
  '\n' +
  '      isZoomingX && setCurrentXZoomState(\n' +
  '        currentXZoomState.translate((newX - prevX) / prevK, 0).scale(newK / prevK)\n' +
  '      );\n' +
  '\n' +
  '      isZoomingY && setCurrentYZoomState(\n' +
  '        currentYZoomState.translate(0, (newY - prevY) / prevK).scale(newK / prevK)\n' +
  '      );\n' +
  '\n' +
  '      setCurrentGlobalZoomState(event.transform);\n' +
  '    });\n' +
  '\n' +
  '    svg.call(zoomGlobal);\n' +
  '\n' +
  '    selectAll(\'.mouse-tracker\').on(\'contextmenu \', (e) => {\n' +
  '      e.preventDefault();\n' +
  '      svg.call(zoomGlobal.transform, zoomIdentity);\n' +
  '      setCurrentGlobalZoomState(zoomIdentity);\n' +
  '      setCurrentXZoomState(zoomIdentity);\n' +
  '      setCurrentYZoomState(zoomIdentity);\n' +
  '    });\n' +
  '  }, [boundedWidth, boundedHeight, currentXZoomState, \n' +
  '    currentYZoomState, currentGlobalZoomState, xScale, yScale]);\n' +
  '\n' +
  '  return (\n' +
  '    <div ref={ wrapperRef } style={ { height: \'250px\', width: \'100%\' } }>\n' +
  '\n' +
  '      <Chart svgRef={ svgRef }\n' +
  '             dimensions={ updatedDimensions }\n' +
  '             chartName={ chartName }>\n' +
  '\n' +
  '        <YAxis yScale={ yScale }\n' +
  '               data={ data }\n' +
  '               chartName={ chartName } />\n' +
  '\n' +
  '        <XAxis xScale={ xScale }\n' +
  '               hasXAxis={ hasXAxis }\n' +
  '               chartName={ chartName } />\n' +
  '\n' +
  '        <Line data={ data }\n' +
  '              chartName={ chartName }\n' +
  '              chartType={ chartType }\n' +
  '              xAccessor={ xAccessor }\n' +
  '              yAccessor={ yAccessor }\n' +
  '              xScale={ xScale }\n' +
  '              yScale={ yScale }\n' +
  '              clipPath={ clipPath } />\n' +
  '\n' +
  '        <rect className={ \'mouse-tracker\' }\n' +
  '              width={ dimensions.width }\n' +
  '              height={ dimensions.height }\n' +
  '              x={ -DIMENSIONS.marginLeft }\n' +
  '              y={ -DIMENSIONS.marginTop }\n' +
  '              fill={ \'transparent\' }\n' +
  '              opacity={ 0 } />\n' +
  '\n' +
  '        <ChartTooltipDot xAccessor={ xAccessor }\n' +
  '                         yAccessor={ yAccessor }\n' +
  '                         xScale={ xScale }\n' +
  '                         yScale={ yScale }\n' +
  '                         data={ data }\n' +
  '                         date={ date }\n' +
  '                         setDate={ setDate }\n' +
  '                         hoverActive={ hoverActive }\n' +
  '                         setHoverActive={ setHoverActive }\n' +
  '                         chartName={ chartName }\n' +
  '                         clipPath={ clipPath } />\n' +
  '\n' +
  '        <ChartTooltipText xAccessor={ xAccessor }\n' +
  '                          yAccessor={ yAccessor }\n' +
  '                          xScale={ xScale }\n' +
  '                          yScale={ yScale }\n' +
  '                          data={ data }\n' +
  '                          date={ date }\n' +
  '                          hoverActive={ hoverActive }\n' +
  '                          chartName={ chartName }\n' +
  '                          clipPath={ clipPath } />\n' +
  '\n' +
  '      </Chart>\n' +
  '    </div>\n' +
  '  );\n' +
  '};\n' +
  '\n' +
  'export default SynchronizedLineChart;';

// import React, { useEffect, useRef } from 'react';
// import { extent, max, mean, min, pointers,
//   scaleLinear, scaleTime, select, selectAll, zoom, zoomIdentity } from 'd3';
//
// import Chart from './components/Chart.d3';
// import YAxis from './components/yAxis.d3';
// import XAxis from './components/xAxis.d3';
// import Line from './components/Line.d3';
// import ChartTooltipText from './components/ChartToolTipText.d3';
// import useDimensions from './tools/useDimensions';
// import ChartTooltipDot from './components/ChartToolTipDot.d3';
//
// const SynchronizedLineChart = ({
//                                  data,
//                                  chartName,
//                                  chartType,
//                                  chartInfo,
//                                  hasXAxis,
//                                  recommendationOffset,
//                                  currentGlobalZoomState,
//                                  setCurrentGlobalZoomState,
//                                  currentYZoomState,
//                                  setCurrentYZoomState,
//                                  currentXZoomState,
//                                  setCurrentXZoomState,
//                                  hoverActive,
//                                  setHoverActive,
//                                  date,
//                                  setDate
//                                }) => {
//   if (!data) return;
//
//   const svgRef = useRef();
//   const [wrapperRef, dimensions] = useDimensions();
//   const DIMENSIONS = {
//     marginTop: 10,
//     marginRight: 20,
//     marginBottom: 50,
//     marginLeft: 55,
//     innerPadding: 10
//   };
//   const updatedDimensions = {
//     ...DIMENSIONS,
//     ...dimensions,
//     boundedHeight: dimensions.height - DIMENSIONS.marginTop - DIMENSIONS.marginBottom,
//     boundedWidth: dimensions.width - DIMENSIONS.marginLeft - DIMENSIONS.marginRight
//   };
//   const { boundedHeight, boundedWidth, innerPadding } = updatedDimensions;
//
//   let yAccessor = (d) => d?.y;
//   let xAccessor = (d) => d?.x;
//
//   const yScale = scaleLinear().
//     domain([min(data, yAccessor), max(data, yAccessor)]).
//     range([boundedHeight - innerPadding, innerPadding]);
//
//   const xScale = scaleTime().
//     domain(extent(data, xAccessor)).
//     range([0, boundedWidth - innerPadding]);
//
//   if (currentYZoomState) yScale.domain(currentYZoomState.rescaleY(yScale).domain());
//   if (currentXZoomState) xScale.domain(currentXZoomState.rescaleX(xScale).domain());
//
//   const clipPath = 'url(#clip)';
//
//   useEffect(() => {
//     const svg = select(svgRef.current);
//
//     const center = (event, target) => {
//       if (event.sourceEvent) {
//         const p = pointers(event, target);
//         return [mean(p, (d) => d[0]), mean(p, (d) => d[1])];
//       }
//       return [boundedWidth / 2, boundedHeight / 2];
//     };
//
//     const zoomGlobal = zoom().scaleExtent([0.1, 40]).on('zoom', (event) => {
//       const { k: newK, x: newX, y: newY } = event.transform;
//       const { k: prevK, x: prevX, y: prevY } = currentGlobalZoomState;
//       const point = center(event, svg);
//
//       const isZoomingX = point[0] > DIMENSIONS.marginLeft + 50 && point[0] / 3 < boundedWidth + 200;
//       const isZoomingY = point[1] / 10 < boundedHeight;
//
//       isZoomingX && setCurrentXZoomState(
//         currentXZoomState.translate((newX - prevX) / prevK, 0).scale(newK / prevK)
//       );
//
//       isZoomingY && setCurrentYZoomState(
//         currentYZoomState.translate(0, (newY - prevY) / prevK).scale(newK / prevK)
//       );
//
//       setCurrentGlobalZoomState(event.transform);
//     });
//
//     svg.call(zoomGlobal);
//
//     selectAll('.mouse-tracker').on('contextmenu ', (e) => {
//       e.preventDefault();
//       svg.call(zoomGlobal.transform, zoomIdentity);
//       setCurrentGlobalZoomState(zoomIdentity);
//       setCurrentXZoomState(zoomIdentity);
//       setCurrentYZoomState(zoomIdentity);
//     });
//   }, [boundedWidth, boundedHeight, currentXZoomState,
//     currentYZoomState, currentGlobalZoomState, xScale, yScale]);
//
//   return (
//     <div ref={ wrapperRef } style={ { height: '250px', width: '100%' } }>
//
//       <Chart svgRef={ svgRef }
//              dimensions={ updatedDimensions }
//              chartName={ chartName }
//              chartInfo={ chartInfo }>
//
//         <YAxis yScale={ yScale }
//                data={ data }
//                chartName={ chartName } />
//
//         <XAxis xScale={ xScale }
//                hasXAxis={ hasXAxis }
//                chartName={ chartName }
//                chartType={ chartType } />
//
//         <Line data={ data }
//               recommendationOffset={ recommendationOffset }
//               chartName={ chartName }
//               chartType={ chartType }
//               xAccessor={ xAccessor }
//               yAccessor={ yAccessor }
//               xScale={ xScale }
//               yScale={ yScale }
//               clipPath={ clipPath } />
//
//         <rect className={ 'mouse-tracker' }
//               width={ dimensions.width }
//               height={ dimensions.height }
//               x={ -DIMENSIONS.marginLeft }
//               y={ -DIMENSIONS.marginTop }
//               fill={ 'transparent' }
//               opacity={ 0 } />
//
//         <ChartTooltipDot xAccessor={ xAccessor }
//                          yAccessor={ yAccessor }
//                          xScale={ xScale }
//                          yScale={ yScale }
//                          data={ data }
//                          date={ date }
//                          setDate={ setDate }
//                          hoverActive={ hoverActive }
//                          setHoverActive={ setHoverActive }
//                          chartName={ chartName }
//                          clipPath={ clipPath } />
//
//         <ChartTooltipText xAccessor={ xAccessor }
//                           yAccessor={ yAccessor }
//                           xScale={ xScale }
//                           yScale={ yScale }
//                           data={ data }
//                           date={ date }
//                           hoverActive={ hoverActive }
//                           chartName={ chartName }
//                           clipPath={ clipPath } />
//
//       </Chart>
//     </div>
//   );
// };
//
// export default SynchronizedLineChart;

export const ChartString = 'import React, { createContext, useContext } from \'react\';\n' +
  '\n' +
  'const ChartContext = createContext();\n' +
  '\n' +
  'export const useDimensionsContext = () => useContext(ChartContext);\n' +
  '\n' +
  'const Chart = ({ svgRef, dimensions, children }) => {\n' +
  '  return (\n' +
  '    <ChartContext.Provider value={ dimensions }>\n' +
  '      <svg className="chart"\n' +
  '           ref={ svgRef }\n' +
  '           style={ { width: \'100%\', height: \'110%\' } }>\n' +
  '        <g transform={ `translate(${ dimensions.marginLeft }, ${ dimensions.marginTop })` }>\n' +
  '          <defs>\n' +
  '            <clipPath id="clip">\n' +
  '              <rect width={ dimensions.boundedWidth }\n' +
  '                    height={ dimensions.boundedHeight }\n' +
  '                    x="0"\n' +
  '                    y="0" />\n' +
  '            </clipPath>\n' +
  '          </defs>\n' +
  '          { children }\n' +
  '        </g>\n' +
  '      </svg>\n' +
  '    </ChartContext.Provider>\n' +
  '  );\n' +
  '};\n' +
  '\n' +
  'export default Chart;';

// import React, { createContext, useContext } from 'react';
//
// const ChartContext = createContext();
//
// export const useDimensionsContext = () => useContext(ChartContext);
//
// const Chart = ({ svgRef, dimensions, children }) => {
//   return (
//     <ChartContext.Provider value={ dimensions }>
//       <svg className="chart"
//            ref={ svgRef }
//            style={ { width: '100%', height: '110%' } }>
//         <g transform={ `translate(${ dimensions.marginLeft }, ${ dimensions.marginTop })` }>
//           <defs>
//             <clipPath id="clip">
//               <rect width={ dimensions.boundedWidth }
//                     height={ dimensions.boundedHeight }
//                     x="0"
//                     y="0" />
//             </clipPath>
//           </defs>
//           { children }
//         </g>
//       </svg>
//     </ChartContext.Provider>
//   );
// };
//
// export default Chart;

export const useDimensionsString = 'import React, { useEffect, useMemo, useRef, useState } from "react";\n' +
  '\n' +
  'const useDimensions = () => {\n' +
  '  const ref = useRef();\n' +
  '  const [width, setWidth] = useState(0);\n' +
  '  const [height, setHeight] = useState(0);\n' +
  '\n' +
  '  useEffect(() => {\n' +
  '    const element = ref.current;\n' +
  '\n' +
  '    const resizeObserver = new ResizeObserver(([entry]) => {\n' +
  '      if (width !== entry.contentRect.width) {\n' +
  '        setWidth(entry.contentRect.width);\n' +
  '      }\n' +
  '      if (height !== entry.contentRect.height) {\n' +
  '        setHeight(entry.contentRect.height);\n' +
  '      }\n' +
  '    });\n' +
  '    resizeObserver.observe(element);\n' +
  '\n' +
  '    return () => resizeObserver.unobserve(element);\n' +
  '  }, [height, width]);\n' +
  '\n' +
  '  const dimensions = useMemo(() => ({ width, height }), [width, height]);\n' +
  '\n' +
  '  return [ref, dimensions];\n' +
  '};\n' +
  '\n' +
  'export default useDimensions;';

// import React, { useEffect, useMemo, useRef, useState } from "react";
//
// const useDimensions = () => {
//   const ref = useRef();
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);
//
//   useEffect(() => {
//     const element = ref.current;
//
//     const resizeObserver = new ResizeObserver(([entry]) => {
//       if (width !== entry.contentRect.width) {
//         setWidth(entry.contentRect.width);
//       }
//       if (height !== entry.contentRect.height) {
//         setHeight(entry.contentRect.height);
//       }
//     });
//     resizeObserver.observe(element);
//
//     return () => resizeObserver.unobserve(element);
//   }, [height, width]);
//
//   const dimensions = useMemo(() => ({ width, height }), [width, height]);
//
//   return [ref, dimensions];
// };
//
// export default useDimensions;

export const yAxisString = 'import React from \'react\';\n' +
  '\n' +
  'import { useDimensionsContext } from \'./Chart.d3\';\n' +
  'import { DOGE, BTC, ETH, USDC } from \'./../tools/system-variables.util\';\n' +
  '\n' +
  'const YAxis = ({ yScale, chartName }) => {\n' +
  '\n' +
  '  const dimensions = useDimensionsContext();\n' +
  '  const ticks = yScale.ticks(5);\n' +
  '\n' +
  '  return (\n' +
  '    <g className="y-axis">\n' +
  '      <line key="y-axis__line"\n' +
  '            className="y-axis__line"\n' +
  '            y2={ dimensions.boundedHeight }\n' +
  '            stroke={ \'#252529\' } />\n' +
  '\n' +
  '      <line key="y-axis__line"\n' +
  '            className="y-axis__line"\n' +
  '            x1={ dimensions.boundedWidth }\n' +
  '            x2={ dimensions.boundedWidth }\n' +
  '            y2={ dimensions.boundedHeight }\n' +
  '            stroke={ \'#252529\' } />\n' +
  '\n' +
  '      { ticks.map((t, index) => (\n' +
  '        <React.Fragment key={ `y-${ chartName }-${ t }-${ index }-container` }>\n' +
  '          <line className="y-axis__tick"\n' +
  '                stroke={ \'#bdc3c7\' }\n' +
  '                x2={ -10 }\n' +
  '                y1={ yScale(t) }\n' +
  '                y2={ yScale(t) } />\n' +
  '\n' +
  '          <line className="y-axis__tick"\n' +
  '                stroke={ \'black\' }\n' +
  '                x2={ dimensions.boundedWidth }\n' +
  '                y1={ yScale(t) }\n' +
  '                y2={ yScale(t) }\n' +
  '                opacity={ 0.8 } />\n' +
  '\n' +
  '          <line className="y-axis__tick"\n' +
  '                stroke={ \'#dad9d5\' }\n' +
  '                x2={ dimensions.boundedWidth }\n' +
  '                y1={ yScale(t) }\n' +
  '                y2={ yScale(t) } />\n' +
  '\n' +
  '          { chartName === BTC &&\n' +
  '            <text className="y-axis__tick__label"\n' +
  '                  style={ { fontSize: 11 } }\n' +
  '                  fill={ \'black\' }\n' +
  '                  transform={ `translate(-40, ${ yScale(t) + 3 })` }>\n' +
  '              { `R${ t?.toString().slice(0, 3) }k` }\n' +
  '            </text> }\n' +
  '\n' +
  '          { chartName === ETH &&\n' +
  '            <text className="y-axis__tick__label"\n' +
  '                  style={ { fontSize: 11 } }\n' +
  '                  fill={ \'black\' }\n' +
  '                  transform={ `translate(-40, ${ yScale(t) + 3 })` }>\n' +
  '              { `R${ t?.toString().slice(0, 2) }k` }\n' +
  '            </text> }\n' +
  '\n' +
  '          { chartName === USDC &&\n' +
  '            <text className="y-axis__tick__label"\n' +
  '                  style={ { fontSize: 11 } }\n' +
  '                  fill={ \'black\' }\n' +
  '                  transform={ `translate(-40, ${ yScale(t) + 3 })` }>\n' +
  '              { `R${ t }` }\n' +
  '            </text> }\n' +
  '\n' +
  '          { chartName === DOGE &&\n' +
  '            <text className="y-axis__tick__label"\n' +
  '                  style={ { fontSize: 11 } }\n' +
  '                  fill={ \'black\' }\n' +
  '                  transform={ `translate(-40, ${ yScale(t) + 3 })` }>\n' +
  '              { `R${ t }` }\n' +
  '            </text>\n' +
  '          }\n' +
  '        </React.Fragment>\n' +
  '      )) }\n' +
  '    </g>\n' +
  '  );\n' +
  '};\n' +
  '\n' +
  'export default YAxis;';

// import React from 'react';
//
// import { useDimensionsContext } from './Chart.d3';
// import { DOGE, BTC, ETH, USDC } from './../tools/system-variables.util';
//
// const YAxis = ({ yScale, chartName, isDarkMode }) => {
//
//   const dimensions = useDimensionsContext();
//   const ticks = yScale.ticks(5);
//
//   return (
//     <g className="y-axis">
//       <line key="y-axis__line"
//             className="y-axis__line"
//             y2={ dimensions.boundedHeight }
//             stroke={ isDarkMode ? 'white' : '#252529' } />
//
//       <line key="y-axis__line"
//             className="y-axis__line"
//             x1={ dimensions.boundedWidth }
//             x2={ dimensions.boundedWidth }
//             y2={ dimensions.boundedHeight }
//             stroke={ isDarkMode ? 'white' : '#252529' } />
//
//       { ticks.map((t, index) => (
//         <React.Fragment key={ `y-${ chartName }-${ t }-${ index }-container` }>
//           <line className="y-axis__tick"
//                 stroke={ isDarkMode ? 'grey' : '#bdc3c7' }
//                 x2={ -10 }
//                 y1={ yScale(t) }
//                 y2={ yScale(t) } />
//
//           <line className="y-axis__tick"
//                 stroke={ isDarkMode ? 'white' : 'black' }
//                 x2={ dimensions.boundedWidth }
//                 y1={ yScale(t) }
//                 y2={ yScale(t) }
//                 opacity={ 0.8 } />
//
//           <line className="y-axis__tick"
//                 stroke={ isDarkMode ? 'grey' : '#dad9d5' }
//                 x2={ dimensions.boundedWidth }
//                 y1={ yScale(t) }
//                 y2={ yScale(t) } />
//
//           { chartName === BTC &&
//             <text className="y-axis__tick__label"
//                   style={ { fontSize: 11 } }
//                   fill={ 'black' }
//                   transform={ `translate(-40, ${ yScale(t) + 3 })` }>
//               { `R${ t?.toString().slice(0, 3) }k` }
//             </text> }
//
//           { chartName === ETH &&
//             <text className="y-axis__tick__label"
//                   style={ { fontSize: 11 } }
//                   fill={ 'black' }
//                   transform={ `translate(-40, ${ yScale(t) + 3 })` }>
//               { `R${ t?.toString().slice(0, 2) }k` }
//             </text> }
//
//           { chartName === USDC &&
//             <text className="y-axis__tick__label"
//                   style={ { fontSize: 11 } }
//                   fill={ 'black' }
//                   transform={ `translate(-40, ${ yScale(t) + 3 })` }>
//               { `R${ t }` }
//             </text> }
//
//           { chartName === DOGE &&
//             <text className="y-axis__tick__label"
//                   style={ { fontSize: 11 } }
//                   fill={ 'black' }
//                   transform={ `translate(-40, ${ yScale(t) + 3 })` }>
//               { `R${ t }` }
//             </text>
//           }
//         </React.Fragment>
//       )) }
//     </g>
//   );
// };
//
// export default YAxis;

export const xAxisString = 'import React from \'react\';\n' +
  '\n' +
  'import { useDimensionsContext } from \'./Chart.d3\';\n' +
  '\n' +
  'const XAxis = ({ xScale, chartName }) => {\n' +
  '\n' +
  '  const dimensions = useDimensionsContext();\n' +
  '  const ticks = xScale.ticks(3);\n' +
  '\n' +
  '  return (\n' +
  '    <g className="x-axis"\n' +
  '       transform={ `translate(0, ${ dimensions.boundedHeight })` }>\n' +
  '      <line x2={ dimensions.boundedWidth }\n' +
  '            className="x-axis__line"\n' +
  '            stroke={ \'#252529\' } />\n' +
  '\n' +
  '      <line x2={ dimensions.boundedWidth }\n' +
  '            y1={ -dimensions.boundedHeight }\n' +
  '            y2={ -dimensions.boundedHeight }\n' +
  '            className="x-axis__line"\n' +
  '            stroke={ \'#252529\' } />\n' +
  '\n' +
  '      { ticks.map((date, index) => (\n' +
  '        <React.Fragment key={ `x-${ chartName }-${ date }-${ index }-container` }>\n' +
  '          <line className="x-axis__tick"\n' +
  '                stroke={ \'#bdc3c7\' }\n' +
  '                x1={ xScale(date) }\n' +
  '                x2={ xScale(date) }\n' +
  '                y1={ 0 }\n' +
  '                y2={ 10 } />\n' +
  '\n' +
  '          <line className="x-axis__tick"\n' +
  '                stroke={ \'#dad9d5\' }\n' +
  '                x1={ xScale(date) }\n' +
  '                x2={ xScale(date) }\n' +
  '                y1={ 0 }\n' +
  '                y2={ -dimensions.boundedHeight + 10 } />\n' +
  '\n' +
  '          <text className="x-axis__tick__label"\n' +
  '                style={ { fontSize: 11 } }\n' +
  '                fill={ \'black\' }\n' +
  '                transform={ `translate(${ xScale(date) - 26 }, 23)` }>\n' +
  '            { date.toLocaleDateString() }\n' +
  '          </text>\n' +
  '        </React.Fragment>\n' +
  '      )) }\n' +
  '    </g>\n' +
  '  );\n' +
  '};\n' +
  '\n' +
  'export default XAxis;';

// import React from 'react';
//
// import { useDimensionsContext } from './Chart.d3';
//
// const XAxis = ({ xScale, hasXAxis, chartName, isDarkMode }) => {
//
//   const dimensions = useDimensionsContext();
//   const ticks = xScale.ticks(3);
//
//   return (
//     <g className="x-axis"
//        transform={ `translate(0, ${ dimensions.boundedHeight })` }>
//       <line x2={ dimensions.boundedWidth }
//             className="x-axis__line"
//             stroke={ isDarkMode ? 'white' : '#252529' } />
//
//       <line x2={ dimensions.boundedWidth }
//             y1={ -dimensions.boundedHeight }
//             y2={ -dimensions.boundedHeight }
//             className="x-axis__line"
//             stroke={ isDarkMode ? 'white' : '#252529' } />
//
//       { ticks.map((date, index) => (
//         <React.Fragment key={ `x-${ chartName }-${ date }-${ index }-container` }>
//           <line className="x-axis__tick"
//                 stroke={ isDarkMode ? 'grey' : '#bdc3c7' }
//                 x1={ xScale(date) }
//                 x2={ xScale(date) }
//                 y1={ 0 }
//                 y2={ 10 } />
//
//           <line className="x-axis__tick"
//                 stroke={ isDarkMode ? 'grey' : '#dad9d5' }
//                 x1={ xScale(date) }
//                 x2={ xScale(date) }
//                 y1={ 0 }
//                 y2={ -dimensions.boundedHeight + 10 } />
//
//           <text className="x-axis__tick__label"
//                 style={ { fontSize: 11 } }
//                 fill={ 'black' }
//                 transform={ `translate(${ xScale(date) - 26 }, 23)` }>
//             { date.toLocaleDateString() }
//           </text>
//         </React.Fragment>
//       )) }
//     </g>
//   );
// };
//
// export default XAxis;

export const lineString = 'import React from \'react\';\n' +
  'import { line } from \'d3\';\n' +
  '\n' +
  'const Line = ({ xAccessor, xScale, yAccessor, yScale, data, clipPath }) => {\n' +
  '\n' +
  '  let lineGenerator = line().\n' +
  '    x(d => xScale(xAccessor(d))).\n' +
  '    y(d => yScale(yAccessor(d)));\n' +
  '\n' +
  '  return (\n' +
  '    <g>\n' +
  '      <path d={ lineGenerator(data) }\n' +
  '            clipPath={ clipPath }\n' +
  '            stroke={ \'#0081ff\' }\n' +
  '            style={ {\n' +
  '              fill: \'none\',\n' +
  '              strokeWidth: \'1.2px\',\n' +
  '              strokeLinecap: \'round\'\n' +
  '            } } />\n' +
  '    </g>\n' +
  '  );\n' +
  '};\n' +
  '\n' +
  'export default Line;';

// import React from 'react';
// import { line } from 'd3';
//
// const Line = ({ xAccessor, xScale, yAccessor, yScale, data, clipPath }) => {
//
//   let lineGenerator = line().
//     x(d => xScale(xAccessor(d))).
//     y(d => yScale(yAccessor(d)));
//
//   return (
//     <g>
//       <path d={ lineGenerator(data) }
//             clipPath={ clipPath }
//             stroke={ '#0081ff' }
//             style={ {
//               fill: 'none',
//               strokeWidth: '1.2px',
//               strokeLinecap: 'round'
//             } } />
//     </g>
//   );
// };
//
// export default Line;

export const toolTipDotString = 'import React from \'react\';\n' +
  'import { bisector, pointer, selectAll } from \'d3\';\n' +
  '\n' +
  'const ChartTooltipDot = ({\n' +
  '                           data,\n' +
  '                           date,\n' +
  '                           setDate,\n' +
  '                           xScale,\n' +
  '                           yScale,\n' +
  '                           xAccessor,\n' +
  '                           yAccessor,\n' +
  '                           hoverActive,\n' +
  '                           setHoverActive,\n' +
  '                           chartName,\n' +
  '                           clipPath\n' +
  '                         }) => {\n' +
  '  return (\n' +
  '    <LineDot data={ data }\n' +
  '             date={ date }\n' +
  '             setDate={ setDate }\n' +
  '             xScale={ xScale }\n' +
  '             yScale={ yScale }\n' +
  '             xAccessor={ xAccessor }\n' +
  '             yAccessor={ yAccessor }\n' +
  '             hoverActive={ hoverActive }\n' +
  '             setHoverActive={ setHoverActive }\n' +
  '             chartName={ chartName }\n' +
  '             clipPath={ clipPath }\n' +
  '    />\n' +
  '  );\n' +
  '};\n' +
  '\n' +
  'export default ChartTooltipDot;\n' +
  '\n' +
  'const LineDot = ({\n' +
  '                   setHoverActive,\n' +
  '                   setDate,\n' +
  '                   xScale,\n' +
  '                   xAccessor,\n' +
  '                   data,\n' +
  '                   date,\n' +
  '                   yScale,\n' +
  '                   yAccessor,\n' +
  '                   hoverActive,\n' +
  '                   clipPath\n' +
  '                 }) => {\n' +
  '\n' +
  '  let dateBisector = bisector(xAccessor).center;\n' +
  '\n' +
  '  let x = xScale(xAccessor(data[Math.max(0, dateBisector(data, date))]));\n' +
  '  let y = yScale(yAccessor(data[Math.max(0, dateBisector(data, date))]));\n' +
  '\n' +
  '  selectAll(\'.mouse-tracker\').on(\'touchmouse mousemove\', (event) => {\n' +
  '    setHoverActive(true);\n' +
  '    setDate(xScale.invert(pointer(event)[0]));\n' +
  '  }).on(\'mouseleave\', () => {\n' +
  '    setHoverActive(false);\n' +
  '  });\n' +
  '\n' +
  '  return (\n' +
  '    <>\n' +
  '      { hoverActive && x && y && (\n' +
  '        <circle\n' +
  '          className={ \'tool-tip-dot\' }\n' +
  '          clipPath={ clipPath }\n' +
  '          cx={ x + 1.5 }\n' +
  '          cy={ y }\n' +
  '          fill={ \'#0081ff\' }\n' +
  '          stroke={ \'white\' }\n' +
  '          strokeWidth={ 2 }\n' +
  '          r={ 5 } />\n' +
  '      ) }\n' +
  '    </>\n' +
  '  );\n' +
  '};';

// import React from 'react';
// import { bisector, pointer, selectAll } from 'd3';
//
// const ChartTooltipDot = ({
//                            data,
//                            date,
//                            setDate,
//                            xScale,
//                            yScale,
//                            xAccessor,
//                            yAccessor,
//                            hoverActive,
//                            setHoverActive,
//                            chartName,
//                            clipPath
//                          }) => {
//   return (
//     <LineDot data={ data }
//              date={ date }
//              setDate={ setDate }
//              xScale={ xScale }
//              yScale={ yScale }
//              xAccessor={ xAccessor }
//              yAccessor={ yAccessor }
//              hoverActive={ hoverActive }
//              setHoverActive={ setHoverActive }
//              chartName={ chartName }
//              clipPath={ clipPath }
//     />
//   );
// };
//
// export default ChartTooltipDot;
//
// const LineDot = ({
//                    setHoverActive,
//                    setDate,
//                    xScale,
//                    xAccessor,
//                    data,
//                    date,
//                    yScale,
//                    yAccessor,
//                    hoverActive,
//                    clipPath
//                  }) => {
//
//   let dateBisector = bisector(xAccessor).center;
//
//   let x = xScale(xAccessor(data[Math.max(0, dateBisector(data, date))]));
//   let y = yScale(yAccessor(data[Math.max(0, dateBisector(data, date))]));
//
//   selectAll('.mouse-tracker').on('touchmouse mousemove', (event) => {
//     setHoverActive(true);
//     setDate(xScale.invert(pointer(event)[0]));
//   }).on('mouseleave', () => {
//     setHoverActive(false);
//   });
//
//   return (
//     <>
//       { hoverActive && x && y && (
//         <circle
//           className={ 'tool-tip-dot' }
//           clipPath={ clipPath }
//           cx={ x + 1.5 }
//           cy={ y }
//           fill={ '#0081ff' }
//           stroke={ 'white' }
//           strokeWidth={ 2 }
//           r={ 5 } />
//       ) }
//     </>
//   );
// };

export const toolTipText = 'import React from \'react\';\n' +
  '\n' +
  'import { bisector } from \'d3\';\n' +
  '\n' +
  'import { BTC, ETH } from "./../tools/system-variables.util";\n' +
  '\n' +
  'const ChartTooltipText = ({\n' +
  '                            data,\n' +
  '                            date,\n' +
  '                            xAccessor,\n' +
  '                            yAccessor,\n' +
  '                            xScale,\n' +
  '                            yScale,\n' +
  '                            hoverActive,\n' +
  '                            chartName,\n' +
  '                            clipPath\n' +
  '                          }) => {\n' +
  '\n' +
  '  return <TooltipText data={ data }\n' +
  '                      date={ date }\n' +
  '                      xScale={ xScale }\n' +
  '                      yScale={ yScale }\n' +
  '                      xAccessor={ xAccessor }\n' +
  '                      yAccessor={ yAccessor }\n' +
  '                      hoverActive={ hoverActive }\n' +
  '                      chartName={ chartName }\n' +
  '                      clipPath={ clipPath } />;\n' +
  '};\n' +
  '\n' +
  'export default ChartTooltipText;\n' +
  '\n' +
  'const TooltipText = ({ xAccessor, yAccessor, xScale, yScale, data, date, hoverActive, chartName, clipPath }) => {\n' +
  '\n' +
  '  let dateBisector = bisector(xAccessor).center;\n' +
  '\n' +
  '  let x = xScale(xAccessor(data[Math.max(0, dateBisector(data, date))]));\n' +
  '  let y = yScale(yAccessor(data[Math.max(0, dateBisector(data, date))]));\n' +
  '\n' +
  '  let hoveredObject = data[dateBisector(data, date)];\n' +
  '\n' +
  '  let toolTipText = () => {\n' +
  '    return `R${ hoveredObject?.y.toFixed(2) } - ${ hoveredObject?.x.toLocaleString().slice(0, 10) }`;\n' +
  '  };\n' +
  '\n' +
  '  return (<>\n' +
  '      { hoverActive &&\n' +
  '        <g className="tooltip-container"\n' +
  '           clipPath={ clipPath }>\n' +
  '          <rect fill={ \'white\' }\n' +
  '                x={ x + 10 }\n' +
  '                y={ y - 25 }\n' +
  '                height={ 21 }\n' +
  '                width={ (chartName === BTC || chartName === ETH) ? 210 : 160 }\n' +
  '                rx={ \'5\' }\n' +
  '                ry={ \'5\' } />\n' +
  '\n' +
  '          <text x={ x + 15 }\n' +
  '                y={ y - 13 }\n' +
  '                transform={\'translate(0, 4)\'}\n' +
  '                fontSize={ \'15\' }\n' +
  '                fontWeight={ \'bold\' }\n' +
  '                fill={ \'#0090ff\' }>\n' +
  '            { toolTipText() }\n' +
  '          </text>\n' +
  '        </g> }\n' +
  '    </>\n' +
  '  );\n' +
  '};';

// import React from 'react';
//
// import { bisector } from 'd3';
//
// import { BTC, ETH } from './../tools/system-variables.util';
//
// const ChartTooltipText = ({
//                             data,
//                             date,
//                             xAccessor,
//                             yAccessor,
//                             xScale,
//                             yScale,
//                             hoverActive,
//                             chartName,
//                             clipPath
//                           }) => {
//
//   return <TooltipText data={ data }
//                       date={ date }
//                       xScale={ xScale }
//                       yScale={ yScale }
//                       xAccessor={ xAccessor }
//                       yAccessor={ yAccessor }
//                       hoverActive={ hoverActive }
//                       chartName={ chartName }
//                       clipPath={ clipPath } />;
// };
//
// export default ChartTooltipText;
//
// const TooltipText = ({ xAccessor, yAccessor, xScale, yScale, data, date, hoverActive, chartName, clipPath }) => {
//
//   let dateBisector = bisector(xAccessor).center;
//
//   let x = xScale(xAccessor(data[Math.max(0, dateBisector(data, date))]));
//   let y = yScale(yAccessor(data[Math.max(0, dateBisector(data, date))]));
//
//   let hoveredObject = data[dateBisector(data, date)];
//
//   let toolTipText = () => {
//     return `R${ hoveredObject?.y.toFixed(2) } - ${ hoveredObject?.x.toLocaleString().slice(0, 10) }`;
//   };
//
//   return (<>
//       { hoverActive &&
//         <g className="tooltip-container"
//            clipPath={ clipPath }>
//           <rect fill={ 'white' }
//                 x={ x + 10 }
//                 y={ y - 25 }
//                 height={ 21 }
//                 width={ (chartName === BTC || chartName === ETH) ? 210 : 160 }
//                 rx={ '5' }
//                 ry={ '5' } />
//
//           <text x={ x + 15 }
//                 y={ y - 13 }
//                 transform={ 'translate(0, 4)' }
//                 fontSize={ '15' }
//                 fontWeight={ 'bold' }
//                 fill={ '#0090ff' }>
//             { toolTipText() }
//           </text>
//         </g> }
//     </>
//   );
// };

export const chartContainerString = 'import { useEffect, useState } from \'react\';\n' +
  'import { zoomIdentity } from \'d3\';\n' +
  '\n' +
  'import { DOGE, BTC, ETH, USDC } from \'../tools/system-variables.util\';\n' +
  '\n' +
  'import SynchronizedLineChart from \'./../SynchronizedLineChart\';\n' +
  '\n' +
  'import {\n' +
  '  getBitconData,\n' +
  '  getDogeCoinData,\n' +
  '  getEthereumData,\n' +
  '  getUSDCData\n' +
  '} from \'../tools/chartApiCalls\';\n' +
  '\n' +
  'export const ChartContainer = () => {\n' +
  '\n' +
  '  const [currentGlobalZoomState, setCurrentGlobalZoomState] = useState(zoomIdentity);\n' +
  '  const [currentYZoomState, setCurrentYZoomState] = useState(zoomIdentity);\n' +
  '  const [currentXZoomState, setCurrentXZoomState] = useState(zoomIdentity);\n' +
  '  const [hoverActive, setHoverActive] = useState(false);\n' +
  '  const [date, setDate] = useState(null);\n' +
  '\n' +
  '  const [bitcoinData, setBitcoinData] = useState(null);\n' +
  '  const [ethereumData, setEthereumData] = useState(null);\n' +
  '  const [USDCoinData, setUSDCoinData] = useState(null);\n' +
  '  const [dogeData, setDogeData] = useState(null);\n' +
  '\n' +
  '  useEffect(() => {\n' +
  '    getBitconData().then((data) => {\n' +
  '      const mappedList = data?.prices?.map((item) => {\n' +
  '        return {\n' +
  '          x: new Date(item[0]),\n' +
  '          y: item[1]\n' +
  '        };\n' +
  '      });\n' +
  '      setBitcoinData(mappedList);\n' +
  '    });\n' +
  '\n' +
  '    getEthereumData().then((data) => {\n' +
  '      const mappedList = data?.prices?.map((item) => {\n' +
  '        return {\n' +
  '          x: new Date(item[0]),\n' +
  '          y: item[1]\n' +
  '        };\n' +
  '      });\n' +
  '      setEthereumData(mappedList);\n' +
  '    });\n' +
  '\n' +
  '    getUSDCData().then((data) => {\n' +
  '      const mappedList = data?.prices?.map((item) => {\n' +
  '        return {\n' +
  '          x: new Date(item[0]),\n' +
  '          y: item[1]\n' +
  '        };\n' +
  '      });\n' +
  '      setUSDCoinData(mappedList);\n' +
  '    });\n' +
  '    getDogeCoinData().then((data) => {\n' +
  '      const mappedList = data?.prices?.map((item) => {\n' +
  '        return {\n' +
  '          x: new Date(item[0]),\n' +
  '          y: item[1]\n' +
  '        };\n' +
  '      });\n' +
  '      setDogeData(mappedList);\n' +
  '    });\n' +
  '  }, []);\n' +
  '\n' +
  '  return (\n' +
  '    <div>\n' +
  '      <div>\n' +
  '        <SynchronizedLineChart chartName={ BTC }\n' +
  '                               data={ bitcoinData }\n' +
  '                               hoverActive={ hoverActive }\n' +
  '                               setHoverActive={ setHoverActive }\n' +
  '                               currentGlobalZoomState={ currentGlobalZoomState }\n' +
  '                               setCurrentGlobalZoomState={ setCurrentGlobalZoomState }\n' +
  '                               currentYZoomState={ currentYZoomState }\n' +
  '                               setCurrentYZoomState={ setCurrentYZoomState }\n' +
  '                               currentXZoomState={ currentXZoomState }\n' +
  '                               setCurrentXZoomState={ setCurrentXZoomState }\n' +
  '                               date={ date }\n' +
  '                               setDate={ setDate } />\n' +
  '\n' +
  '        <SynchronizedLineChart chartName={ ETH }\n' +
  '                               data={ ethereumData }\n' +
  '                               hoverActive={ hoverActive }\n' +
  '                               setHoverActive={ setHoverActive }\n' +
  '                               currentGlobalZoomState={ currentGlobalZoomState }\n' +
  '                               setCurrentGlobalZoomState={ setCurrentGlobalZoomState }\n' +
  '                               currentYZoomState={ currentYZoomState }\n' +
  '                               setCurrentYZoomState={ setCurrentYZoomState }\n' +
  '                               currentXZoomState={ currentXZoomState }\n' +
  '                               setCurrentXZoomState={ setCurrentXZoomState }\n' +
  '                               date={ date }\n' +
  '                               setDate={ setDate } />\n' +
  '      </div>\n' +
  '\n' +
  '      <div>\n' +
  '        <SynchronizedLineChart chartName={ USDC }\n' +
  '                               data={ USDCoinData }\n' +
  '                               hoverActive={ hoverActive }\n' +
  '                               setHoverActive={ setHoverActive }\n' +
  '                               currentGlobalZoomState={ currentGlobalZoomState }\n' +
  '                               setCurrentGlobalZoomState={ setCurrentGlobalZoomState }\n' +
  '                               currentYZoomState={ currentYZoomState }\n' +
  '                               setCurrentYZoomState={ setCurrentYZoomState }\n' +
  '                               currentXZoomState={ currentXZoomState }\n' +
  '                               setCurrentXZoomState={ setCurrentXZoomState }\n' +
  '                               date={ date }\n' +
  '                               setDate={ setDate } />\n' +
  '\n' +
  '        <SynchronizedLineChart chartName={ DOGE }\n' +
  '                               data={ dogeData }\n' +
  '                               hoverActive={ hoverActive }\n' +
  '                               setHoverActive={ setHoverActive }\n' +
  '                               currentGlobalZoomState={ currentGlobalZoomState }\n' +
  '                               setCurrentGlobalZoomState={ setCurrentGlobalZoomState }\n' +
  '                               currentYZoomState={ currentYZoomState }\n' +
  '                               setCurrentYZoomState={ setCurrentYZoomState }\n' +
  '                               currentXZoomState={ currentXZoomState }\n' +
  '                               setCurrentXZoomState={ setCurrentXZoomState }\n' +
  '                               date={ date }\n' +
  '                               setDate={ setDate } />\n' +
  '      </div>\n' +
  '    </div>\n' +
  '  );\n' +
  '};';

// import { useEffect, useState } from 'react';
// import { zoomIdentity } from 'd3';
//
// import { DOGE, BTC, ETH, USDC } from '../tools/system-variables.util';
//
// import SynchronizedLineChart from './../SynchronizedLineChart';
//
// import {
//   getBitconData,
//   getDogeCoinData,
//   getEthereumData,
//   getUSDCData
// } from '../tools/chartApiCalls';
//
// export const ChartContainer = () => {
//
//   const [currentGlobalZoomState, setCurrentGlobalZoomState] = useState(zoomIdentity);
//   const [currentYZoomState, setCurrentYZoomState] = useState(zoomIdentity);
//   const [currentXZoomState, setCurrentXZoomState] = useState(zoomIdentity);
//   const [hoverActive, setHoverActive] = useState(false);
//   const [date, setDate] = useState(null);
//
//   const [bitcoinData, setBitcoinData] = useState(null);
//   const [ethereumData, setEthereumData] = useState(null);
//   const [USDCoinData, setUSDCoinData] = useState(null);
//   const [dogeData, setDogeData] = useState(null);
//
//   useEffect(() => {
//     getBitconData().then((data) => {
//       const mappedList = data?.prices?.map((item) => {
//         return {
//           x: new Date(item[0]),
//           y: item[1]
//         };
//       });
//       setBitcoinData(mappedList);
//     });
//
//     getEthereumData().then((data) => {
//       const mappedList = data?.prices?.map((item) => {
//         return {
//           x: new Date(item[0]),
//           y: item[1]
//         };
//       });
//       setEthereumData(mappedList);
//     });
//
//     getUSDCData().then((data) => {
//       const mappedList = data?.prices?.map((item) => {
//         return {
//           x: new Date(item[0]),
//           y: item[1]
//         };
//       });
//       setUSDCoinData(mappedList);
//     });
//     getDogeCoinData().then((data) => {
//       const mappedList = data?.prices?.map((item) => {
//         return {
//           x: new Date(item[0]),
//           y: item[1]
//         };
//       });
//       setDogeData(mappedList);
//     });
//   }, []);
//
//   return (
//     <div>
//       <div>
//         <SynchronizedLineChart chartName={ BTC }
//                                data={ bitcoinData }
//                                hoverActive={ hoverActive }
//                                setHoverActive={ setHoverActive }
//                                currentGlobalZoomState={ currentGlobalZoomState }
//                                setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
//                                currentYZoomState={ currentYZoomState }
//                                setCurrentYZoomState={ setCurrentYZoomState }
//                                currentXZoomState={ currentXZoomState }
//                                setCurrentXZoomState={ setCurrentXZoomState }
//                                date={ date }
//                                setDate={ setDate } />
//
//         <SynchronizedLineChart chartName={ ETH }
//                                data={ ethereumData }
//                                hoverActive={ hoverActive }
//                                setHoverActive={ setHoverActive }
//                                currentGlobalZoomState={ currentGlobalZoomState }
//                                setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
//                                currentYZoomState={ currentYZoomState }
//                                setCurrentYZoomState={ setCurrentYZoomState }
//                                currentXZoomState={ currentXZoomState }
//                                setCurrentXZoomState={ setCurrentXZoomState }
//                                date={ date }
//                                setDate={ setDate } />
//       </div>
//
//       <div>
//         <SynchronizedLineChart chartName={ USDC }
//                                data={ USDCoinData }
//                                hoverActive={ hoverActive }
//                                setHoverActive={ setHoverActive }
//                                currentGlobalZoomState={ currentGlobalZoomState }
//                                setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
//                                currentYZoomState={ currentYZoomState }
//                                setCurrentYZoomState={ setCurrentYZoomState }
//                                currentXZoomState={ currentXZoomState }
//                                setCurrentXZoomState={ setCurrentXZoomState }
//                                date={ date }
//                                setDate={ setDate } />
//
//         <SynchronizedLineChart chartName={ DOGE }
//                                data={ dogeData }
//                                hoverActive={ hoverActive }
//                                setHoverActive={ setHoverActive }
//                                currentGlobalZoomState={ currentGlobalZoomState }
//                                setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
//                                currentYZoomState={ currentYZoomState }
//                                setCurrentYZoomState={ setCurrentYZoomState }
//                                currentXZoomState={ currentXZoomState }
//                                setCurrentXZoomState={ setCurrentXZoomState }
//                                date={ date }
//                                setDate={ setDate } />
//       </div>
//     </div>
//   );
// };
/*#endregion synchronizedd3charts*/
