/* eslint-disable */
import Head from 'next/head';

import { REACT } from '../../tools/general/system-variables.util';

import { tableColumnString, TableContainerString, TableString, tableStylesString } from '../../tools/code/TableCodeStrings';

import ContentContainer from '../../tools/components/content-container/ContentContainer';
import ArticleContainer from '../../tools/components/article-container/ArticleContainer';
import Table from '../../tools/components/table/Table';
import CodeViewer from '../../tools/components/code-viewer/CodeViewer';

import styles from '../../styles/pages.module.scss';

export default function EasyReactHTMLTable() {

  return (
    <>
      <Head>
        <title>{ 'Easy HTML table in React' }</title>
      </Head>
      <ContentContainer view={ REACT }>
        <ArticleContainer>
          <h1>{ 'Easy HTML table in React' }</h1>

          <TableContainer />

          <p>
            So you need to make a table in React, there are tons of
            <a target="_blank" href="https://blog.logrocket.com/the-top-react-table-libraries-to-use-in-2021/"> libraries </a>
            out there but you aren't sold. You need a combination of custom features and methods but you aren't sure if making
            one yourself is gonna work out. This is part one of a series showing how we can do just that
            - create our own, custom, extensible HTML Table for React. </p>

          <p>
            First, we need a container to call our table from and some data to display. Note that the table takes an array of objects, with
            the keys displaying in the header row and the values showing as the body rows.
          </p>

          <CodeViewer codeString={ TableContainerString }
                      height={ '1000px' } />

          <p>
            Easy enough, next our Table component. We extract the keys into a new list 'objectKeys', and map each key to a th element.
            Each key is then wrapped in a tr and thead element and is then returned.
          </p>

          <p>
            Next, we use a similar technique for the table body. We strip 'activeTableData' of its values and map them into td
            elements via the 'objectValues' indexes and a switch statement. This allows us to customize each column's td tag and return
            whatever elements we may need in whichever column it's necessary!
          </p>

          <CodeViewer codeString={ TableString }
                      height={ '1000px' } />

          <p>
            This can be done in a TableColumn component that passes props along to determine which td element should be returned.
          </p>

          <CodeViewer codeString={ tableColumnString }
                      height={ '1000px' } />

          <p>
            Note that we return a tr tag for each element in 'activeTableData' filled with the td tags we have just defined above.
            'Rows' is then wrapped in a tbody tag and is returned. We then call buildTableHeader() and buildTableBody()
            inside our table tag, and there we have it, a table component that takes a list of objects and returns a header and a body.
          </p>

          <p>
            We are not done yet, we must still add styles to the container and the table tags. These styles are crucial in
            order to align the header and body columns as well as to make our table responsive.
          </p>

          <CodeViewer codeString={ tableStylesString }
                      height={ '1000px' } />

          <div style={ { display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' } }>
            <a href="https://codesandbox.io/s/easy-react-html-table-wzi6w4" target="_blank">
              <img src={ 'https://codesandbox.io/static/img/play-codesandbox.svg' } alt={ 'Easy HTML table in React' } />
            </a>
          </div>

        </ArticleContainer>
      </ContentContainer>
    </>
  );
}

const TableContainer = ({}) => {

  const tableData = [
    {
      Cover: 'mastery.png',
      title: 'Mastery',
      description: 'The keys to success and long term fulfillment',
      link: 'https://www.goodreads.com/book/show/81940.Mastery'
    },
    {
      Cover: 'makeyourbed.png',
      title: 'Make Your Bed',
      description: 'Little things that can change your life... and maybe the world.',
      link: 'https://www.goodreads.com/book/show/31423133-make-your-bed'
    },
    {
      Cover: 'confidentmind.png',
      title: 'The Confident Mind',
      description: 'A Battle-Tested Guide to Unshakable Performance',
      link: 'https://www.goodreads.com/en/book/show/57863475'
    },
    {
      Cover: 'atomichabits.png',
      title: 'Atomic Habits',
      description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
      link: 'https://www.goodreads.com/book/show/40121378-atomic-habits'
    }
  ];

  return (
    <div className={ styles.tableContainer }>
      <Table activeTableData={ tableData }
             hiddenColumns={ [] } />
    </div>
  );
};
