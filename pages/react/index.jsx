import React from 'react';

import { REACT } from '../../tools/general/system-variables.util';

import ContentContainer from '../../tools/components/content-container/ContentContainer';
import ArticleListContainer from '../../tools/components/article-container/ArticleListContainer';

export default function PostsReact() {

  return (
    <ContentContainer view={ REACT }
                      showClientsSideBar={ true }>
      <ArticleListContainer>
        Coming soon!
      </ArticleListContainer>
    </ContentContainer>
  );
}
