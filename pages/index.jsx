import React, { useEffect } from 'react';

import { REACT } from '../tools/general/system-variables.util';

import ContentContainer from '../tools/components/content-container/ContentContainer';
import ArticleListContainer from '../tools/components/article-container/ArticleListContainer';

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
    <ContentContainer view={ REACT }>
      <ArticleListContainer>
        Coming soon!
      </ArticleListContainer>
    </ContentContainer>
  );
}
