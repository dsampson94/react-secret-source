import React from 'react';

import { bool, func, shape } from 'prop-types';

import styles from '../../../styles/content-container.module.scss';

const TopBar = () => {
  return <PostsTopBar />;
};

TopBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func,
  clientRequestFields: shape({})
};

export default TopBar;

const PostsTopBar = () => {

  return (
    <div className={ styles.topBar }>
      <h2>React Secret Sauce</h2>
      <div></div>
    </div>
  );
};

PostsTopBar.propTypes = {
  clientRequestFields: shape({})
};
