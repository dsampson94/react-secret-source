import React from 'react';

import { bool, func } from 'prop-types';

import styles from '../../../styles/content-container.module.scss';

const SideBar = () => {
  return <PostsSideBar />;
};

SideBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func
};

export default SideBar;

const PostsSideBar = () => {

  return (
    <div className={ styles.sideBar }>

    </div>
  );
};

PostsSideBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func
};
