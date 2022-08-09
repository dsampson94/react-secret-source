import React from 'react';

import { BTC, DOGE, ETH, USDC } from '../../../general/system-variables.util';

import { useDimensionsContext } from './Chart.d3';

const YAxis = ({ yScale, chartName, isDarkMode }) => {

  const dimensions = useDimensionsContext();
  const ticks = yScale.ticks(5);

  return (
    <g className="y-axis">

      <line key="y-axis__line"
            className="y-axis__line"
            y2={ dimensions.boundedHeight }
            stroke={ isDarkMode ? 'white' : '#252529' } />

      <line key="y-axis__line"
            className="y-axis__line"
            x1={ dimensions.boundedWidth }
            x2={ dimensions.boundedWidth }
            y2={ dimensions.boundedHeight }
            stroke={ isDarkMode ? 'white' : '#252529' } />

      { ticks.map((t, index) => (
        <React.Fragment key={ `y-${ chartName }-${ t }-${ index }-container` }>

          <line className="y-axis__tick"
                stroke={ isDarkMode ? 'grey' : '#bdc3c7' }
                x2={ -10 }
                y1={ yScale(t) }
                y2={ yScale(t) } />

          <line className="y-axis__tick"
                stroke={ isDarkMode ? 'white' : 'black' }
                x2={ dimensions.boundedWidth }
                y1={ yScale(t) }
                y2={ yScale(t) }
                opacity={ 0.8 } />

          <line className="y-axis__tick"
                stroke={ isDarkMode ? 'grey' : '#dad9d5' }
                x2={ dimensions.boundedWidth }
                y1={ yScale(t) }
                y2={ yScale(t) } />

          { chartName === BTC &&
            <text className="y-axis__tick__label"
                  style={ { fontSize: 11 } }
                  fill={ isDarkMode ? 'white' : 'black' }
                  transform={ `translate(-40, ${ yScale(t) + 3 })` }>
              { `R${ t?.toString().slice(0, 3) }k` }
            </text> }

          { chartName === ETH &&
            <text className="y-axis__tick__label"
                  style={ { fontSize: 11 } }
                  fill={ isDarkMode ? 'white' : 'black' }
                  transform={ `translate(-40, ${ yScale(t) + 3 })` }>
              { `R${ t?.toString().slice(0, 2) }k` }
            </text> }

          { chartName === USDC &&
            <text className="y-axis__tick__label"
                  style={ { fontSize: 11 } }
                  fill={ isDarkMode ? 'white' : 'black' }
                  transform={ `translate(-40, ${ yScale(t) + 3 })` }>
              { `R${ t }` }
            </text> }

          { chartName === DOGE &&
            <text className="y-axis__tick__label"
                  style={ { fontSize: 11 } }
                  fill={ isDarkMode ? 'white' : 'black' }
                  transform={ `translate(-40, ${ yScale(t) + 3 })` }>
              { `R${ t }` }
            </text> }

        </React.Fragment>
      )) }
    </g>
  );
};

export default YAxis;
