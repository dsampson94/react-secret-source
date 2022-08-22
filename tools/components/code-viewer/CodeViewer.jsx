import { useEffect } from 'react';
import Prism from 'prismjs';

import styles from '../../../styles/pages.module.scss';

const CodeViewer = ({ codeString, height }) => {

  useEffect(() => {
    if (typeof window !== 'undefined')
      Prism.highlightAll();
  }, []);

  return (
    <div className={ styles.codeContainer }>
    <pre style={ {
      height: '600px',
      width: '95.5%',
      borderRadius: '30px',
      marginLeft: '2%',
      boxShadow: '0px 0px 3px rgba(160, 210, 200, 0.90)'
    } }>
      <code className={ `language-javascript` }>{ codeString }</code>
    </pre>
    </div>
  );
};

export default CodeViewer;
