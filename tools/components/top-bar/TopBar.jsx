import React from 'react';

import styles from '../../../styles/content-container.module.scss';

const TopBar = () => {
  return <PostsTopBar />;
};

export default TopBar;

const PostsTopBar = () => {

  return (
    <div className={ styles.topBar }>
      <h2>React Secret Source</h2>
      <div></div>
    </div>
  );
};
