import React, { useEffect } from 'react';

import { HOME } from '../tools/general/system-variables.util';

import { useArticles } from '../tools/hooks/useArticles';

import ContentContainer from '../tools/components/content-container/ContentContainer';
import ArticleListContainer from '../tools/components/article-container/ArticleListContainer';
import Article from '../tools/components/article/Article';

export default function Home() {

  const loadAds = () => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log('adsense error', error.message);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  return (
    <ContentContainer view={ HOME }>
      <ArticleListContainer box>
        { useArticles(true).map((article, index) => {
          return <Article key={ `${ index }_${ article.title }` }
                          article={ article }
                          box />;
        }) }
      </ArticleListContainer>
    </ContentContainer>
  );
}
