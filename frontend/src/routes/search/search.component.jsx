import { useState, useEffect } from 'react';

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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make call to API for search results
    fetch(`http://localhost:8000/search?q=${searchValue}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrors(data.error);
          console.log(errors);
          return;
        } else {
          setSearchResults(data.hits);
        }
      });

    setSearchValue('');
  };

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults])

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
