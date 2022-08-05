import React, { useState } from 'react';

import { bool, func } from 'prop-types';

import { POSTS, SEARCH_PLACEHOLDER } from '../../../tools/general/system-variables.util';

import InputSearch from '../input-search/InputSearch';

import styles from '../../../styles/content-container.module.scss';

const SideBar = ({
                   showSideBar,
                   setShowSideBar,
                   mappedUserData,
                   view
                 }) => {

  switch (view) {
    case POSTS:
      return <PostsSideBar showSideBar={ showSideBar }
                           setShowSideBar={ setShowSideBar }
                           mappedUserData={ mappedUserData } />;
  }
};

SideBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func
};

export default SideBar;

const PostsSideBar = ({ showSideBar, mappedUserData, setShowSideBar }) => {

  const [filteredSideBarData, setFilteredSideBarData] = useState(undefined);
  const [persistSearchString, setPersistSearchString] = useState('');

  return (
    <div className={ styles.sideBar }>
      { showSideBar && <>
        <InputSearch dataToFilter={ mappedUserData }
                     setFilteredData={ setFilteredSideBarData }
                     persistSearchString={ persistSearchString }
                     setPersistSearchString={ setPersistSearchString }
                     placeholder={ SEARCH_PLACEHOLDER }
                     sidebar />

        <div className="client-fields-side-bar__list">
          <div className="client-fields-side-bar__list__container">
          </div>
        </div>

      </> }
    </div>
  );
};

PostsSideBar.propTypes = {
  showSideBar: bool,
  setShowSideBar: func
};
