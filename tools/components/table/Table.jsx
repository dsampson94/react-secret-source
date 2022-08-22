import React, { useState } from 'react';
import Image from 'next/image';

const Table = ({ activeTableData, hiddenColumns }) => {

  const [selectedRow, setSelectedRow] = useState(undefined);

  const generateId = () => `_${ Math.random().toString(36).substring(2, 9) }`;

  const removeCamelCase = (key) => {
    return key.repeat(1).replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1').replace(/^./, s => s.toUpperCase());
  };

  const buildTableHeader = () => {
    if (!activeTableData) return;
    let headers;
    if (activeTableData?.length !== 0) {
      const objectKeys = Object.keys(activeTableData[0]);
      headers = objectKeys.filter((key) => !hiddenColumns.includes(key)).map((key) => (
        <th key={ generateId() }>
          { removeCamelCase(key) }
        </th>
      ));
    }

    return (
      <thead>
      <tr>
        { headers }
      </tr>
      </thead>
    );
  };

  const buildTableBody = () => {
    if (!activeTableData) return;
    const rows = activeTableData?.map(object => {

      const objectValues = [];
      for (const property in object) {
        if (!hiddenColumns.includes(property)) {
          objectValues.push(object[property]);
        }
      }

      let tableDataElements = [];
      if (activeTableData?.length > 0) {
        tableDataElements = objectValues?.map((value, dataIndex) => {
          switch (dataIndex) {
            case 0:
              return <Column dataIndex={ dataIndex }
                             value={ value }
                             image />;
            case 1:
              return <Column dataIndex={ dataIndex }
                             value={ value } />;
            case 2:
              return <Column dataIndex={ dataIndex }
                             value={ value } />;
            default:
              return <Column dataIndex={ dataIndex }
                             value={ value }
                             link />;
          }
        });
      }

      return (
        <tr style={ { backgroundColor: (object === selectedRow) ? '#75B7E5' : 'none' } }
            onClick={ () => setSelectedRow(object) }
            key={ generateId() }>
          { tableDataElements }
        </tr>
      );
    });

    return (
      <tbody>
      { rows }
      </tbody>
    );
  };

  return (
    <table>
      { buildTableHeader() }
      { buildTableBody() }
    </table>
  );
};

export default Table;

const Column = ({ dataIndex, value, image, link }) => {

  if (image)
    return <td style={ { width: '10px', padding: '5px' } }
               key={ dataIndex + value }>
      <Image src={ `/${ value }` }
             alt={ 'mastery icon' }
             height={ 50 }
             width={ 45 } />
    </td>;
  else if (link)
    return <td style={ { width: '60px', textDecoration: 'underline' } }
               key={ dataIndex + value }>
      <a target="_blank" href={ value }>Link</a>
    </td>;
  else
    return <td key={ dataIndex + value }>
      { value }
    </td>;
};
