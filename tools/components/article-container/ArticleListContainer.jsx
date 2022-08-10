import NavBar from '../nav-bar/Navbar';

import styles from '../../../styles/pages.module.scss';

const ArticleListContainer = ({ children }) => {
  return (
    <article className={ styles.articleList }>

      <NavBar />

      { children }

    </article>
  );
};

export default ArticleListContainer;
