import { arrayOf, node, oneOfType } from 'prop-types';
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

ArticleContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

export default ArticleContainer;
