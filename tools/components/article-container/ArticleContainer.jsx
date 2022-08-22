import NavBar from '../nav-bar/Navbar';

import styles from '../../../styles/pages.module.scss';

const ArticleContainer = ({ children }) => {

  return (
    <article className={ styles.article }>

      <NavBar />

      { children }

    </article>
  );
};

export default ArticleContainer;
