import { useEffect } from 'react';
import Prism from 'prismjs';

const CodeViewer = ({ codeString }) => {

  useEffect(() => {
    if (typeof window !== 'undefined')
      Prism.highlightAll();
  }, []);

  return (
    <pre style={ {
      height: '600px',
      width: '96%',
      borderRadius: '30px',
      marginLeft: '2%',
      boxShadow: '0px 0px 3px rgba(160, 210, 200, 0.90)'
    } }>
      <code className={ `language-javascript` }>{ codeString }</code>
    </pre>
  );d
};

export default CodeViewer;
