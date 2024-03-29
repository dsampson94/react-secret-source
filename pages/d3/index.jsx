import React from 'react';

import { D3 } from '../../tools/general/system-variables.util';

import { useArticles } from '../../tools/hooks/useArticles';

import ContentContainer from '../../tools/components/content-container/ContentContainer';
import Article from '../../tools/components/article/Article';
import ArticleListContainer from '../../tools/components/article-container/ArticleListContainer';

export default function PostsD3() {

  return (
    <ContentContainer view={ D3 }>
      <ArticleListContainer>
        { useArticles()[3]?.d3?.map((article, index) => {
          return <Article key={ `${ index }_${ article.title }` }
                          article={ article } />;
        }) }
      </ArticleListContainer>
    </ContentContainer>
  );
}
