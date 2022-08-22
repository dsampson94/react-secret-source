import React from 'react';
import { useRouter } from 'next/router';

import styles from '../../../styles/content-container.module.scss';

const Article = ({ article, box }) => {

  const router = useRouter();

  return (
    <button className={ box ? styles.articleBox : styles.articleBar }
            style={ {
              backgroundImage: `url(${ article.image })`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            } }
            onClick={ () => router.replace(article.route) }>
      <h1>{ article.title }</h1>
    </button>
  );
};

export default Article;
