import { useState } from 'react';
import SearchBox from '../../components/search-box/search-box.component';

import './search.styles.scss';

const Search = () => {
  const [searchField, setSearchField] = useState('');

  const submitHandler = (e) => {
    console.log('submitted')
  };

  return (
    <div className="search-container">
      <h2>Search</h2>
      <SearchBox submitHandler={submitHandler}/>
    </div>
  );
};

export default Search;
