import React from 'react';

import { useDimensionsContext } from './Chart.d3';

const XAxis = ({ xScale, chartName, isDarkMode }) => {

  const dimensions = useDimensionsContext();
  const ticks = xScale.ticks(3);

  return (
    <g className="x-axis"
       transform={ `translate(0, ${ dimensions.boundedHeight })` }>

      <line x2={ dimensions.boundedWidth }
            className="x-axis__line"
            stroke={ isDarkMode ? 'white' : '#252529' } />

      <line x2={ dimensions.boundedWidth }
            y1={ -dimensions.boundedHeight }
            y2={ -dimensions.boundedHeight }
            className="x-axis__line"
            stroke={ isDarkMode ? 'white' : '#252529' } />

      { ticks.map((date, index) => (
        <React.Fragment key={ `x-${ chartName }-${ date }-${ index }-container` }>

          <line className="x-axis__tick"
                stroke={ isDarkMode ? 'grey' : '#bdc3c7' }
                x1={ xScale(date) }
                x2={ xScale(date) }
                y1={ 0 }
                y2={ 10 } />

          <line className="x-axis__tick"
                stroke={ isDarkMode ? 'grey' : '#dad9d5' }
                x1={ xScale(date) }
                x2={ xScale(date) }
                y1={ 0 }
                y2={ -dimensions.boundedHeight + 10 } />

          <text className="x-axis__tick__label"
                style={ { fontSize: 11 } }
                fill={ isDarkMode ? 'white' : 'black' }
                transform={ `translate(${ xScale(date) - 26 }, 23)` }>
            { date.toLocaleDateString() }
          </text>

        </React.Fragment>
      )) }
    </g>
  );
};

export default XAxis;
