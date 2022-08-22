import React from 'react';

import { REACT_NATIVE } from '../../tools/general/system-variables.util';

import { useArticles } from '../../tools/hooks/useArticles';

import ContentContainer from '../../tools/components/content-container/ContentContainer';
import ArticleListContainer from '../../tools/components/article-container/ArticleListContainer';
import Article from '../../tools/components/article/Article';

export default function PostsNative() {

  return (
    <ContentContainer view={ REACT_NATIVE }>
      <ArticleListContainer>
        Coming soon!
        { useArticles()[1]?.native?.map((article, index) => {
          return <Article key={ `${ index }_${ article.title }` }
                          article={ article } />;
        }) }
      </ArticleListContainer>
    </ContentContainer>
  );
}
