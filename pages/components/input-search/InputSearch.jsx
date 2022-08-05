import React, { useEffect, useState } from 'react';

import { arrayOf, bool, func, shape, string } from 'prop-types';

import { getClassNames, isEmpty } from '../../../tools/general/helpers.util';

import SVGIcon from '../icon/SVGIcon';

const InputSearch = ({
                       name,
                       type,
                       dataToFilter,
                       setFilteredData,
                       persistSearchString,
                       setPersistSearchString,
                       placeholder,
                       sidebar,
                       table,
                       overview
                     }) => {

  const [searchString, setSearchString] = useState(persistSearchString ? persistSearchString : '');

  useEffect(() => {
    filter();
    if (searchString.length === 0) setFilteredData(undefined);
  }, [searchString]);

  const filter = () => {
    if (table)
      filterTable();
    else if (overview)
      filterClientList();
    else if (sidebar) {
      filterClientList();
      setPersistSearchString(searchString);
    }
  };

  const filterTable = () => {
  };

  const filterClientList = () => {
  };

  return (
    <div className={ 'search' }>
      <div className={ 'search__icon' }>
      </div>
      <input autoFocus
             name={ name }
             value={ persistSearchString }
             type={ type }
             placeholder={ placeholder }
             className={ getClassNames('search__input', { sidebar, table }) }
             onChange={ ({ target }) => setSearchString(target.value) }
             onKeyDown={ event => {
               if (event.key === 'Enter') searchString ? filter() : setFilteredData(undefined);
             } } />
    </div>
  );
};

InputSearch.propTypes = {
  dataToFilter: arrayOf(shape({})),
  name: string,
  value: shape({}),
  type: string,
  setFilteredData: func.isRequired,
  placeholder: string,
  sidebar: bool,
  table: bool
};

export default InputSearch;
