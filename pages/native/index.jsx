import React from 'react';

import { REACT_NATIVE } from '../../tools/general/system-variables.util';

import ContentContainer from '../../tools/components/content-container/ContentContainer';
import ArticleListContainer from '../../tools/components/article-container/ArticleListContainer';

export default function PostsNative() {

  return (
    <ContentContainer view={ REACT_NATIVE }>
      <ArticleListContainer>
        Coming soon!
      </ArticleListContainer>
    </ContentContainer>
  );
}
