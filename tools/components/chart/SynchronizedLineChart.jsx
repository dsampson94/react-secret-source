import React, { useEffect, useRef } from 'react';
import { extent, max, mean, min, pointers, scaleLinear, scaleTime, select, selectAll, zoom, zoomIdentity } from 'd3';

import { DOGE, BTC, ETH, USDC } from '../../general/system-variables.util';

import Chart from '../../components/chart/components/Chart.d3.jsx';
import YAxis from '../../components/chart/components/yAxis.d3';
import XAxis from '../../components/chart/components/xAxis.d3';
import Line from '../../components/chart/components/Line.d3';
import ChartTooltipText from '../../components/chart/components/ChartToolTipText.d3';
import useDimensions from '../../hooks/useDimensions';
import ChartTooltipDot from './components/ChartToolTipDot.d3';

import styles from '../../../styles/chart.module.scss';

const SynchronizedLineChart = ({
                                 data,
                                 chartName,
                                 chartType,
                                 chartInfo,
                                 hasXAxis,
                                 recommendationOffset,
                                 currentGlobalZoomState,
                                 setCurrentGlobalZoomState,
                                 currentYZoomState,
                                 setCurrentYZoomState,
                                 currentXZoomState,
                                 setCurrentXZoomState,
                                 hoverActive,
                                 setHoverActive,
                                 date,
                                 setDate
                               }) => {

  if (!data) return;

  const isDarkMode = true;

  const svgRef = useRef();
  const [wrapperRef, dimensions] = useDimensions();
  const DIMENSIONS = {
    marginTop: 10,
    marginRight: 40,
    marginBottom: 50,
    marginLeft: 70,
    innerPadding: 10
  };
  const updatedDimensions = {
    ...DIMENSIONS, ...dimensions,
    boundedHeight: dimensions.height - DIMENSIONS.marginTop - DIMENSIONS.marginBottom,
    boundedWidth: dimensions.width - DIMENSIONS.marginLeft - DIMENSIONS.marginRight
  };
  const { boundedHeight, boundedWidth, innerPadding } = updatedDimensions;

  let yAccessor = d => d?.y;
  let xAccessor = d => d?.x;

  const yScale = scaleLinear().
    domain([min(data, yAccessor), max(data, yAccessor)]).
    range([boundedHeight - innerPadding, innerPadding]);

  const xScale = scaleTime().
    domain(extent(data, xAccessor)).
    range([0, boundedWidth - innerPadding]);

  if (currentYZoomState) yScale.domain(currentYZoomState.rescaleY(yScale).domain());
  if (currentXZoomState) xScale.domain(currentXZoomState.rescaleX(xScale).domain());

  const clipPath = 'url(#clip)';

  useEffect(() => {
    const svg = select(svgRef.current);

    const center = (event, target) => {
      if (event.sourceEvent) {
        const p = pointers(event, target);
        return [mean(p, d => d[0]), mean(p, d => d[1])];
      }
      return [boundedWidth / 2, boundedHeight / 2];
    };

    const zoomGlobal = zoom().scaleExtent([0.1, 40]).on('zoom', event => {
      const { k: newK, x: newX, y: newY } = event.transform;
      const { k: prevK, x: prevX, y: prevY } = currentGlobalZoomState;
      const point = center(event, svg);

      const isZoomingX = point[0] > DIMENSIONS.marginLeft + 50 && point[0] / 3 < boundedWidth + 200;
      const isZoomingY = point[1] / 10 < boundedHeight;

      isZoomingX && setCurrentXZoomState(currentXZoomState.translate((newX - prevX) / prevK, 0).scale(newK / prevK));
      isZoomingY && setCurrentYZoomState(currentYZoomState.translate(0, (newY - prevY) / prevK).scale(newK / prevK));
      setCurrentGlobalZoomState(event.transform);
    });

    svg.call(zoomGlobal);

    selectAll('.mouse-tracker').on('contextmenu ', e => {
      e.preventDefault();
      svg.call(zoomGlobal.transform, zoomIdentity);
      setCurrentGlobalZoomState(zoomIdentity);
      setCurrentXZoomState(zoomIdentity);
      setCurrentYZoomState(zoomIdentity);
    });

  }, [boundedWidth, boundedHeight, currentXZoomState, currentYZoomState, currentGlobalZoomState, xScale, yScale]);

  return (
    <>
      <div ref={ wrapperRef }
           style={ { height: '250px', width: '100%' } }>

        <ChartHeader chartName={ chartName }
                     isDarkMode={ isDarkMode } />

        <Chart svgRef={ svgRef }
               dimensions={ updatedDimensions }
               chartName={ chartName }
               chartInfo={ chartInfo }
               isDarkMode={ isDarkMode }>

          <YAxis yScale={ yScale }
                 data={ data }
                 chartName={ chartName }
                 isDarkMode={ isDarkMode } />

          <XAxis xScale={ xScale }
                 hasXAxis={ hasXAxis }
                 chartName={ chartName }
                 chartType={ chartType }
                 isDarkMode={ isDarkMode } />

          <Line data={ data }
                recommendationOffset={ recommendationOffset }
                chartName={ chartName }
                chartType={ chartType }
                xAccessor={ xAccessor }
                yAccessor={ yAccessor }
                xScale={ xScale }
                yScale={ yScale }
                clipPath={ clipPath }
                isDarkMode={ isDarkMode } />

          <rect className={ 'mouse-tracker' }
                width={ dimensions.width }
                height={ dimensions.height }
                x={ -DIMENSIONS.marginLeft }
                y={ -DIMENSIONS.marginTop }
                fill={ 'transparent' }
                opacity={ 0 } />

          <ChartTooltipDot xAccessor={ xAccessor }
                           yAccessor={ yAccessor }
                           xScale={ xScale }
                           yScale={ yScale }
                           data={ data }
                           date={ date }
                           setDate={ setDate }
                           hoverActive={ hoverActive }
                           setHoverActive={ setHoverActive }
                           chartName={ chartName }
                           clipPath={ clipPath } />

          <ChartTooltipText xAccessor={ xAccessor }
                            yAccessor={ yAccessor }
                            xScale={ xScale }
                            yScale={ yScale }
                            data={ data }
                            date={ date }
                            hoverActive={ hoverActive }
                            chartName={ chartName }
                            clipPath={ clipPath } />
        </Chart>
      </div>
    </>
  );
};

export default SynchronizedLineChart;

const ChartHeader = ({ chartName }) => {

  switch (chartName) {
    case BTC :
      return <div className={ styles.chartHeader }>
        { BTC }
      </div>;
    case ETH :
      return <div className={ styles.chartHeader }>
        { ETH }
      </div>;
    case USDC :
      return <div className={ styles.chartHeader }>
        { USDC }
      </div>;
    case DOGE :
      return <div className={ styles.chartHeader }>
        { DOGE }
      </div>;
  }
};
