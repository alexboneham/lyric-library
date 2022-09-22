import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import SearchBox from '../../components/search-box/search-box.component';
import SearchResults from '../../components/search-results/search-results.component';

import './search.styles.scss';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errors, setErrors] = useState('');

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  // let location = useLocation();
  // const queryString = location.search;

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make call to API for search results
    fetch(`http://localhost:8000/search?q=${searchValue}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return console.log(errors);
        } else {
          setSearchResults(data.hits);
        }
      });

    setSearchValue('');
  };


  return (
    <div className="search-container">
      <h2>Search</h2>
      <SearchBox
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={searchValue}
        placeholder="Find a song"
        label="Song search: "
      />
      {searchResults.length > 0 && 
        <SearchResults hits={searchResults} />
      }
    </div>
  );
};

export default Search;
