import React from 'react';

import { ABOUT } from '../../tools/general/system-variables.util';

import ContentContainer from '../../tools/components/content-container/ContentContainer';
import ArticleListContainer from '../../tools/components/article-container/ArticleListContainer';

export default function About() {

  return (
    <ContentContainer view={ ABOUT }>
      <ArticleListContainer>
        Coming soon!
      </ArticleListContainer>
    </ContentContainer>
  );
}
