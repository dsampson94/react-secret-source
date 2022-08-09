import React from 'react';
import { useRouter } from 'next/router';

import { func, string } from 'prop-types';

import { ABOUT, D3, HOME, NEXT, REACT, REACT_NATIVE } from '../../general/system-variables.util';

import Button from '../button/Button';

import styles from '../../../styles/content-container.module.scss';

const NavBar = ({
                  activePath,
                  handlePostsClick,
                  handleMonitorProbesClick,
                  handleFindLastRecordingsClick,
                  handleAssistantClick,
                  handleNeglectedClick,
                  handleEmailReadingsClick,
                  handleChartClick,
                  handleIrricomsClick
                }) => {

  const router = useRouter();

  return (
    <div className={ styles.navBar }>

      <Button label={ HOME }
              onClick={ () => router.replace('/') }
              white={ !router.pathname.includes('Home') } />

      <Button label={ REACT }
              onClick={ () => router.replace('/react') }
              white={ !router.pathname.includes('React') } />

      <Button label={ REACT_NATIVE }
              onClick={ () => router.replace('/native') }
              white={ !router.pathname.includes('Native') } />

      <Button label={ NEXT }
              onClick={ () => router.replace('/next') }
              white={ !router.pathname.includes('Next') } />

      <Button label={ D3 }
              onClick={ () => router.replace('/d3') }
              white={ !router.pathname.includes('D3') } />

      <Button label={ ABOUT }
              onClick={ () => router.replace('/about') }
              white={ !router.pathname.includes('About') } />

    </div>
  );
};

NavBar.propTypes = {
  activePath: string,
  handlePostsClick: func,
  handleMonitorProbesClick: func,
  handleFindLastRecordingsClick: func,
  handleAssistantClick: func,
  handleNeglectedClick: func,
  handleEmailReadingsClick: func,
  handleChartClick: func,
  handleIrricomsClick: func
};

export default NavBar;
