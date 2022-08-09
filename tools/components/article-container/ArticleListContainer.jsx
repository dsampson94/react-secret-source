import { arrayOf, node, oneOfType } from 'prop-types';

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

ArticleListContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

export default ArticleListContainer;
