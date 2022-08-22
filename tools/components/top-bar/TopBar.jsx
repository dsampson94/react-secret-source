import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from '../../../styles/content-container.module.scss';

const TopBar = ({ end }) => {
  return <PostsTopBar end={ end } />;
};

export default TopBar;

const PostsTopBar = ({ end }) => {

  const [scrolledToTop, setScrolledToTop] = useState(true);

  useEffect(() => {
    if (scrolledToTop) return window.scrollTo({ top: 0, behavior: 'smooth' });
    else return end.current.scrollIntoView({ behavior: 'smooth' });
  }, [scrolledToTop]);

  return (
    <div className={ styles.topBar }
         onClick={ () => setScrolledToTop(!scrolledToTop) }>
      <div className={ styles.topBarImage }>
        <Image src={ '/logo.png' }
               alt={ 'rss logo' }
               height={ 20 }
               width={ 65 } />
      </div>
      <h2>React Secret Source</h2>
    </div>
  );
};
