import React from 'react';
import { bool, func, string } from 'prop-types';

import styles from '../../../styles/content-container.module.scss';

const Button = ({
                  name,
                  type,
                  label,
                  onClick,
                  onMouseEnter,
                  disabled
                }) => {
  return (
    <button className={ styles.button }
            name={ name }
            type={ type }
            onClick={ onClick }
            onMouseEnter={ onMouseEnter }
            disabled={ disabled }>
      <label>{ label }</label>
    </button>
  );
};

Button.propTypes = {
  name: string,
  type: string,
  label: string,
  onClick: func,
  disabled: bool
};

export default Button;
