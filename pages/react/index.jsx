import React from 'react';

import { REACT } from '../../tools/general/system-variables.util';

import { useArticles } from '../../tools/hooks/useArticles';

import ContentContainer from '../../tools/components/content-container/ContentContainer';
import ArticleListContainer from '../../tools/components/article-container/ArticleListContainer';
import Article from '../../tools/components/article/Article';

export default function PostsReact() {

  return (
    <ContentContainer view={ REACT }
                      showClientsSideBar={ true }>
      <ArticleListContainer>
        { useArticles()[0]?.react?.map((article, index) => {
          return <Article key={ `${ index }_${ article.title }` }
                          article={ article } />;
        }) }
      </ArticleListContainer>
    </ContentContainer>
  );
}
