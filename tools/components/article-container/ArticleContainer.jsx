import styles from '../../../styles/pages.module.scss';
import NavBar from '../nav-bar/Navbar';

const ArticleContainer = ({ children }) => {
  return (
    <article className={ styles.article }>

      <NavBar />

      { children }

    </article>
  );
};

export default ArticleContainer;
