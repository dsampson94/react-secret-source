import React, { createContext, useContext } from 'react';

const ChartContext = createContext();

export const useDimensionsContext = () => useContext(ChartContext);

const Chart = ({ svgRef, dimensions, children, isDarkMode }) => {

  return (
    <ChartContext.Provider value={ dimensions }>
      <svg className="chart"
           ref={ svgRef }
           style={ { width: '100%', height: '110%' } }>
        <g transform={ `translate(${ dimensions.marginLeft }, ${ dimensions.marginTop })` }>
          <defs>
            <clipPath id="clip">
              <rect width={ dimensions.boundedWidth }
                    height={ dimensions.boundedHeight }
                    x="0"
                    y="0" />
            </clipPath>
          </defs>
          { children }
        </g>
      </svg>
    </ChartContext.Provider>
  );
};

export default Chart;
