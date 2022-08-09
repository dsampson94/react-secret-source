import React from 'react';
import { useRouter } from 'next/router';

import styles from '../../../styles/content-container.module.scss';

const ArticleBar = ({ article }) => {

  const router = useRouter();

  return (
    <div className={ styles.articleBar }
         onClick={ () => router.replace(article.route) }>
      <h1>{ article.title }</h1>
    </div>
  );
};

export default ArticleBar;
