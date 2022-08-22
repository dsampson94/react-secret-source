import NavBar from '../nav-bar/Navbar';

import styles from '../../../styles/pages.module.scss';

const ArticleListContainer = ({ children, box }) => {
  if (box)
    return <ArticleListBoxContainer children={ children } />;
  else
    return <ArticleListBarContainer children={ children } />;

};

export default ArticleListContainer;

const ArticleListBoxContainer = ({ children }) => {
  return (
    <article className={ styles.articleList }>

      <NavBar />

      <h3>Posts</h3>
      <hr/>

      <nav className={ styles.articleBoxContainer }>

        { children }

      </nav>
    </article>
  );
};

const ArticleListBarContainer = ({ children }) => {
  return (
    <article className={ styles.articleList }>

      <NavBar />

      { children }

    </article>
  );
};
