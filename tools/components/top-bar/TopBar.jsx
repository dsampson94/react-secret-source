import React from 'react';

import { bool, func, shape } from 'prop-types';

import { POSTS } from '../../general/system-variables.util';

import styles from '../../../styles/content-container.module.scss';
import Button from '../button/Button';

const TopBar = ({ showSideBar, setShowSideBar, clientRequestFields, view }) => {
  switch (view) {
    case POSTS:
      return <PostsTopBar showSideBar={ showSideBar }
                          setShowSideBar={ setShowSideBar } />;
  }
};

TopBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func,
  clientRequestFields: shape({})
};

export default TopBar;

const PostsTopBar = ({ showSideBar, setShowSideBar }) => {

  return (
    <div className={ styles.topBar }>
      <div className="field-charts-top-bar__header">
      </div>
      <div className="field-charts-top-bar__lower">
      </div>
    </div>
  );
};

PostsTopBar.propTypes = {
  clientRequestFields: shape({})
};
