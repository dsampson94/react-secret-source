import React, { useRef } from 'react';

import { arrayOf, node, oneOfType } from 'prop-types';

import TopBar from '../top-bar/TopBar';
import SideBar from '../side-bar/SideBar';

import styles from '../../../styles/content-container.module.scss';

const ContentContainer = ({
                            view,
                            children
                          }) => {

  return <PostsContentContainer view={ view }>
    { children }
  </PostsContentContainer>;
};

ContentContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

export default ContentContainer;

const PostsContentContainer = ({
                                 children,
                                 view
                               }) => {

  const end = useRef(null);

  return (
    <div className={ styles.contentContainer }>
      <TopBar view={ view }
              end={ end } />

      <div className={ styles.contentContainerScreen }>
        <SideBar view={ view } />
        { children }
        <SideBar view={ view } />
      </div>

      <div ref={ end } />
    </div>
  );
};

PostsContentContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};
