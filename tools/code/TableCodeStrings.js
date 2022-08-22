/*#region easyhtmlreacttable part1*/
export const TableContainerString = 'import { Table } from \'./Table.jsx\';\n' +
  '\n' +
  'import \'./table.scss\';\n' +
  '\n' +
  'export default function App() {\n' +
  '\n' +
  '  const tableData = [\n' +
  '    {\n' +
  '      Cover: \'mastery.png\',\n' +
  '      title: \'Mastery\',\n' +
  '      description: \'The keys to success and long term fulfillment\',\n' +
  '      link: \'https://www.goodreads.com/book/show/81940.Mastery\'\n' +
  '    },\n' +
  '    {\n' +
  '      Cover: \'makeyourbed.png\',\n' +
  '      title: \'Make Your Bed\',\n' +
  '      description: \'Little things that can change your life... and maybe the world.\',\n' +
  '      link: \'https://www.goodreads.com/book/show/31423133-make-your-bed\'\n' +
  '    },\n' +
  '    {\n' +
  '      Cover: \'confidentmind.png\',\n' +
  '      title: \'The Confident Mind\',\n' +
  '      description: \'A Battle-Tested Guide to Unshakable Performance\',\n' +
  '      link: \'https://www.goodreads.com/en/book/show/57863475\'\n' +
  '    },\n' +
  '    {\n' +
  '      Cover: \'atomichabits.png\',\n' +
  '      title: \'Atomic Habits\',\n' +
  '      description: \'An Easy & Proven Way to Build Good Habits & Break Bad Ones\',\n' +
  '      link: \'https://www.goodreads.com/book/show/40121378-atomic-habits\'\n' +
  '    }\n' +
  '  ];\n' +
  '\n' +
  '  return (\n' +
  '    <div className={ \'tableContainer\' }>\n' +
  '      <Table activeTableData={ tableData } >\n' +
  '    </div>\n' +
  '  );\n' +
  '}';

// import { Table } from './Table.jsx';
//
// import './table.scss';
//
// export default function App() {
//
//   const tableData = [
//     {
//       Cover: 'mastery.png',
//       title: 'Mastery',
//       description: 'The keys to success and long term fulfillment',
//       link: 'https://www.goodreads.com/book/show/81940.Mastery'
//     },
//     {
//       Cover: 'makeyourbed.png',
//       title: 'Make Your Bed',
//       description: 'Little things that can change your life... and maybe the world.',
//       link: 'https://www.goodreads.com/book/show/31423133-make-your-bed'
//     },
//     {
//       Cover: 'confidentmind.png',
//       title: 'The Confident Mind',
//       description: 'A Battle-Tested Guide to Unshakable Performance',
//       link: 'https://www.goodreads.com/en/book/show/57863475'
//     },
//     {
//       Cover: 'atomichabits.png',
//       title: 'Atomic Habits',
//       description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
//       link: 'https://www.goodreads.com/book/show/40121378-atomic-habits'
//     }
//   ];
//
//   return (
//     <div className={ 'tableContainer' }>
//       <Table activeTableData={ tableData } >
//     </div>
//   );
// }

export const TableString = 'import React, { useState } from \'react\';\n' +
  'import { TableColumn } from \'./TableColumn\';\n' +
  '\n' +
  'export const Table = ({ activeTableData }) => {\n' +
  '\n' +
  '  const [selectedRow, setSelectedRow] = useState(undefined);\n' +
  '\n' +
  '  const buildTableHeader = () => {\n' +
  '    let headers;\n' +
  '\n' +
  '    if (activeTableData?.length !== 0) {\n' +
  '      const objectKeys = Object.keys(activeTableData[0]);\n' +
  '      headers = objectKeys.map(key =>\n' +
  '        <th key={ generateId() }>\n' +
  '          { removeCamelCase(key) }\n' +
  '        </th>\n' +
  '      );\n' +
  '    }\n' +
  '\n' +
  '    return (\n' +
  '      <thead>\n' +
  '      <tr>{ headers }</tr>\n' +
  '      </thead>\n' +
  '    );\n' +
  '  };\n' +
  '\n' +
  '  const buildTableBody = () => {\n' +
  '    const rows = activeTableData?.map((object) => {\n' +
  '\n' +
  '      const objectValues = [];\n' +
  '      for (const property in object) {\n' +
  '        objectValues.push(object[property]);\n' +
  '      }\n' +
  '\n' +
  '      let tableDataElements = [];\n' +
  '      if (activeTableData?.length > 0) {\n' +
  '        tableDataElements = objectValues?.map((value, dataIndex) => {\n' +
  '          switch (dataIndex) {\n' +
  '            case 0:\n' +
  '              return <TableColumn dataIndex={ dataIndex }\n' +
  '                                  value={ value }\n' +
  '                                  image />;\n' +
  '            case 1:\n' +
  '              return <TableColumn dataIndex={ dataIndex }\n' +
  '                                  value={ value } />;\n' +
  '            case 2:\n' +
  '              return <TableColumn dataIndex={ dataIndex }\n' +
  '                                  value={ value } />;\n' +
  '            case 3:\n' +
  '              return <TableColumn dataIndex={ dataIndex }\n' +
  '                                  value={ value }\n' +
  '                                  link />;\n' +
  '            default:\n' +
  '              return <TableColumn dataIndex={ dataIndex }\n' +
  '                                  value={ value } />;\n' +
  '          }\n' +
  '        });\n' +
  '      }\n' +
  '\n' +
  '      return (\n' +
  '        <tr style={ { backgroundColor: object === selectedRow && \'#75B7E5\' } }\n' +
  '            onClick={ () => setSelectedRow(object) }\n' +
  '            key={ generateId() }>\n' +
  '          { tableDataElements }\n' +
  '        </tr>\n' +
  '      );\n' +
  '    });\n' +
  '\n' +
  '    return <tbody>{ rows }</tbody>;\n' +
  '  };\n' +
  '\n' +
  '  return (\n' +
  '    <table>\n' +
  '      { buildTableHeader() }\n' +
  '      { buildTableBody() }\n' +
  '    </table>\n' +
  '  );\n' +
  '};';

// import React, { useState } from 'react';
// import { TableColumn } from './TableColumn';
//
// export const Table = ({ activeTableData }) => {
//
//   const [selectedRow, setSelectedRow] = useState(undefined);
//
//   const buildTableHeader = () => {
//     let headers;
//
//     if (activeTableData?.length !== 0) {
//       const objectKeys = Object.keys(activeTableData[0]);
//       headers = objectKeys.map(key =>
//         <th key={ generateId() }>
//           { removeCamelCase(key) }
//         </th>
//       );
//     }
//
//     return (
//       <thead>
//       <tr>{ headers }</tr>
//       </thead>
//     );
//   };
//
//   const buildTableBody = () => {
//     const rows = activeTableData?.map((object) => {
//
//       const objectValues = [];
//       for (const property in object) {
//         objectValues.push(object[property]);
//       }
//
//       let tableDataElements = [];
//       if (activeTableData?.length > 0) {
//         tableDataElements = objectValues?.map((value, dataIndex) => {
//           switch (dataIndex) {
//             case 0:
//               return <TableColumn dataIndex={ dataIndex }
//                                   value={ value }
//                                   image />;
//             case 1:
//               return <TableColumn dataIndex={ dataIndex }
//                                   value={ value } />;
//             case 2:
//               return <TableColumn dataIndex={ dataIndex }
//                                   value={ value } />;
//             case 3:
//               return <TableColumn dataIndex={ dataIndex }
//                                   value={ value }
//                                   link />;
//             default:
//               return <TableColumn dataIndex={ dataIndex }
//                                   value={ value } />;
//           }
//         });
//       }
//
//       return (
//         <tr style={ { backgroundColor: object === selectedRow && '#75B7E5' } }
//             onClick={ () => setSelectedRow(object) }
//             key={ generateId() }>
//           { tableDataElements }
//         </tr>
//       );
//     });
//
//     return <tbody>{ rows }</tbody>;
//   };
//
//   return (
//     <table>
//       { buildTableHeader() }
//       { buildTableBody() }
//     </table>
//   );
// };

// const generateId = () => `_${ Math.random().toString(36).substring(2, 9) }`;
//
// const removeCamelCase = (key) => {
//   return key.repeat(1).replace(/([A-Z]+)/g, ' $1').
//     replace(/([A-Z][a-z])/g, ' $1').replace(/^./, s => s.toUpperCase());
// };

export const tableColumnString = 'export const TableColumn = ({ dataIndex, value, image, link }) => {\n' +
  '  \n' +
  '  if (image)\n' +
  '    return <td style={ { width: \'10px\', padding: \'5px\' } }\n' +
  '               key={ dataIndex }>\n' +
  '      <img src={ value }\n' +
  '           alt={ \'icon\' }\n' +
  '           height={ 50 }\n' +
  '           width={ 45 } />\n' +
  '    </td>;\n' +
  '\n' +
  '  else if (link)\n' +
  '    return <td style={ { width: \'60px\', textDecoration: \'underline\' } }\n' +
  '               key={ dataIndex }>\n' +
  '      <a target="_blank"\n' +
  '         href={ value }>\n' +
  '        Link\n' +
  '      </a>\n' +
  '    </td>;\n' +
  '\n' +
  '  else\n' +
  '    return <td key={ dataIndex }>\n' +
  '      { value }\n' +
  '    </td>;\n' +
  '};';

export const TableColumn = ({ dataIndex, value, image, link }) => {

  if (image)
    return <td style={ { width: '10px', padding: '5px' } }
               key={ dataIndex }>
      <img src={ value }
           alt={ 'icon' }
           height={ 50 }
           width={ 45 } />
    </td>;

  else if (link)
    return <td style={ { width: '60px', textDecoration: 'underline' } }
               key={ dataIndex }>
      <a target="_blank"
         href={ value }>
        Link
      </a>
    </td>;

  else
    return <td key={ dataIndex }>
      { value }
    </td>;
};

export const tableStylesString = '.tableContainer {\n' +
  '  display: flex;\n' +
  '  margin: 0 20px 0 20px;\n' +
  '\n' +
  '  table {\n' +
  '    display: table;\n' +
  '    border-collapse: collapse;\n' +
  '    user-select: none;\n' +
  '    width: 100%;\n' +
  '\n' +
  '    thead {\n' +
  '      top: 0;\n' +
  '\n' +
  '      th {\n' +
  '        padding: 0 5px 0 5px;\n' +
  '        border: 3px solid #53A5DF;\n' +
  '      }\n' +
  '    }\n' +
  '\n' +
  '    tbody {\n' +
  '\n' +
  '      tr {\n' +
  '        transition: 1s;\n' +
  '\n' +
  '        &:hover {\n' +
  '          background-color: #75B7E5;\n' +
  '        }\n' +
  '      }\n' +
  '\n' +
  '      td {\n' +
  '        position: relative;\n' +
  '        display: table-cell;\n' +
  '        background-clip: padding-box;\n' +
  '        text-align: left;\n' +
  '        padding: 0 5px 0 10px;\n' +
  '        color: black;\n' +
  '        border: 2px solid #53A5DF;\n' +
  '      }\n' +
  '    }\n' +
  '  }\n' +
  '}';

/*#endregion easyhtmlreacttable part1*/

/*#region*/

/*#endregion*/

/*#region*/

/*#endregion*/

/*#region*/

/*#endregion*/

/*#region*/

/*#endregion*/

/*#region*/

/*#endregion*/

/*#region*/

/*#endregion*/
