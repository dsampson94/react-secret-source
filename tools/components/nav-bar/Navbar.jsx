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
    <nav className={ styles.navBar }>

      <Button label={ HOME }
              onClick={ () => router.replace('/') }
              active={ router.pathname === '/' } />

      <Button label={ REACT }
              onClick={ () => router.replace('/react') }
              active={ router.pathname.includes('react') } />

      <Button label={ REACT_NATIVE }
              onClick={ () => router.replace('/native') }
              active={ router.pathname.includes('native') } />

      <Button label={ NEXT }
              onClick={ () => router.replace('/next') }
              active={ router.pathname.includes('next') } />

      <Button label={ D3 }
              onClick={ () => router.replace('/d3') }
              active={ router.pathname.includes('d3') } />

      <Button label={ ABOUT }
              onClick={ () => router.replace('/about') }
              active={ router.pathname.includes('about') } />

    </nav>
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
