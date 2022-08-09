import React from 'react';

import { bisector } from 'd3';

import { BTC, ETH } from '../../../general/system-variables.util';

import styles from '../../../../styles/chart.module.scss';

const ChartTooltipText = ({
                            data,
                            date,
                            xAccessor,
                            yAccessor,
                            xScale,
                            yScale,
                            hoverActive,
                            chartName,
                            clipPath
                          }) => {

  return <TooltipText data={ data }
                      date={ date }
                      xScale={ xScale }
                      yScale={ yScale }
                      xAccessor={ xAccessor }
                      yAccessor={ yAccessor }
                      hoverActive={ hoverActive }
                      chartName={ chartName }
                      clipPath={ clipPath } />;
};

export default ChartTooltipText;

const TooltipText = ({ xAccessor, yAccessor, xScale, yScale, data, date, hoverActive, chartName, clipPath }) => {

  let dateBisector = bisector(xAccessor).center;

  let x = xScale(xAccessor(data[Math.max(0, dateBisector(data, date))]));
  let y = yScale(yAccessor(data[Math.max(0, dateBisector(data, date))]));

  let hoveredObject = data[dateBisector(data, date)];

  let toolTipText = () => {
    return `R${ hoveredObject?.y.toFixed(2) } - ${ hoveredObject?.x.toLocaleString().slice(0, 10) }`;
  };

  return (<>
      { hoverActive &&
        <g className="tooltip-container"
           clipPath={ clipPath }>
          <rect className={ styles.tooltipRect }
                fill={ 'white' }
                x={ x + 10 }
                y={ y - 25 }
                height={ 21 }
                width={ (chartName === BTC || chartName === ETH) ? 210 : 160 }
                rx={ '5' }
                ry={ '5' } />

          <text x={ x + 15 }
                y={ y - 13 }
                transform={'translate(0, 4)'}
                fontSize={ '15' }
                fontWeight={ 'bold' }
                fill={ '#0090ff' }>
            { toolTipText() }
          </text>
        </g> }
    </>
  );
};
