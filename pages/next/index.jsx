import React from 'react';

import { NEXT } from '../../tools/general/system-variables.util';

import ContentContainer from '../../tools/components/content-container/ContentContainer';
import ArticleListContainer from '../../tools/components/article-container/ArticleListContainer';

export default function PostsNext() {

  return (
    <ContentContainer view={ NEXT }>
      <ArticleListContainer>
        Coming soon!
      </ArticleListContainer>
    </ContentContainer>
  );
}
