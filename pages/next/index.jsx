import React from 'react';

import { NEXT } from '../../tools/general/system-variables.util';

import { useArticles } from '../../tools/hooks/useArticles';

import ContentContainer from '../../tools/components/content-container/ContentContainer';
import ArticleListContainer from '../../tools/components/article-container/ArticleListContainer';
import Article from '../../tools/components/article/Article';

export default function PostsNext() {

  return (
    <ContentContainer view={ NEXT }>
      <ArticleListContainer>
        Coming soon!
        { useArticles()[2]?.next?.map((article, index) => {
          return <Article key={ `${ index }_${ article.title }` }
                          article={ article } />;
        }) }
      </ArticleListContainer>
    </ContentContainer>
  );
}
