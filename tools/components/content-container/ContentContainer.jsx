import React from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';

import TopBar from '../top-bar/TopBar';
import SideBar from '../side-bar/SideBar';

import { POSTS } from '../../general/system-variables.util';

import styles from '../../../styles/content-container.module.scss';

const ContentContainer = ({
                            children,
                            view,
                            clientRequestFields,
                            showClientsSideBar,
                            setShowClientsSideBar
                          }) => {
  switch (view) {
    case POSTS:
      return <PostsContentContainer showClientsSideBar={ showClientsSideBar }
                                    setShowClientsSideBar={ setShowClientsSideBar }
                                    clientRequestFields={ clientRequestFields }
                                    view={ view }>
        { children }
      </PostsContentContainer>;
  }
};

ContentContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

export default ContentContainer;

const PostsContentContainer = ({
                                 children,
                                 view,
                                 showClientsSideBar,
                                 setShowClientsSideBar,
                                 clientRequestFields
                               }) => {

  return (
    <div className={ styles.contentContainer }>
      <TopBar showSideBar={ showClientsSideBar }
              setShowSideBar={ setShowClientsSideBar }
              clientRequestFields={ clientRequestFields }
              view={ view } />

      <div className={ styles.contentContainerScreen }>
        <SideBar showSideBar={ showClientsSideBar }
                 setShowSideBar={ setShowClientsSideBar }
                 view={ view } />
        { children }
      </div>
    </div>
  );
};

PostsContentContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};
