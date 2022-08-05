/* eslint-disable */
import React from 'react';

import { string } from 'prop-types';
import { getClassNames } from '../../../tools/general/helpers.util';

import useTheme from '../../../tools/hooks/useTheme';

const SVGIcon = ({ name, fill, height, width, onClick, tiny, chart }) => {

  const { storeActiveTheme } = useTheme(false);

  return (
      <div className={ getClassNames('svg-icon',
          { tiny: tiny }) }
           onClick={ onClick }>
        <svg xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink"
             height={ height }
             width={ width }
             fill={ getIconFill(storeActiveTheme, fill, name) }
             viewBox={ getViewBox(name, tiny, chart) }>
          { getPath(name) }
        </svg>
      </div>
  );
};

const getViewBox = (name, tiny, chart) => {
  switch (name) {
    default:
      return '-6 0 36 24';
  }
};

const getIconFill = (activeTheme, fill, name) => {
  if (activeTheme === 'light') {
    return fill;
  } else {
    switch (name) {
      default:
        return fill;
    }
  }
};

const getPath = (name) => {
  switch (name) {
    default:
      return <path />;
  }
};

SVGIcon.defaultProps = {
  name: undefined,
  fill: 'black',
  height: '40px',
  width: '40px'
};

SVGIcon.propTypes = {
  name: string,
  fill: string,
  height: string,
  width: string
};

export default SVGIcon;
