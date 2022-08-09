import React from 'react';
import { line } from 'd3';

const Line = ({ xAccessor, xScale, yAccessor, yScale, data, clipPath }) => {

  let lineGenerator = line().
    x(d => xScale(xAccessor(d))).
    y(d => yScale(yAccessor(d)));

  return (
    <g>
      <path d={ lineGenerator(data) }
            clipPath={ clipPath }
            stroke={ '#0081ff' }
            style={ {
              fill: 'none',
              strokeWidth: '1.2px',
              strokeLinecap: 'round'
            } } />
    </g>
  );
};

export default Line;
