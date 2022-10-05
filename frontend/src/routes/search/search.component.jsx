import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import SearchResults from '../../components/search-results.component';
import Loading from '../../components/loading/loading.component';

import './search.styles.scss';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialParam, setInitialParam] = useState(searchParams.get('title') || '');

  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [results, setResults] = useState([]);
  // const page = searchParams.get('page') || 0;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleArtistChange = (e) => setArtist(e.target.value);

  useEffect(() => {
    // Set the query state depending on current input states
    artist ? setQuery(`title=${title}&artist=${artist}`) : title ? setQuery(`title=${title}`) : setQuery('');
  }, [title, artist]);

  useEffect(() => {
    // Dynamically update search parameters with current query state
    setSearchParams(query);
  }, [query]);

  useEffect(() => {
    // Run fetch on initial render if URL already has a 'title' search parameter
    if (initialParam) {
      const initialQuery = `title=${initialParam}`;
      setTitle(initialParam)
      fetchFunction(initialQuery);
    }
    setInitialParam('');
  }, [initialParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFunction(query);
  };

  const fetchFunction = (searchQuery) => {
    setIsLoading(true);
    setSearchParams(searchQuery);
    fetch(`http://localhost:8000/search?${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.hits);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      });
  };

  return (
    <div className="search-container">
      <h1>Search for a song</h1>
      <p>Search by song title and (optionally) artist</p>
      <form onSubmit={handleSubmit}>
        <input
          id="query"
          name="q"
          value={title}
          placeholder="search title"
          required
          onChange={handleTitleChange}
          autoComplete="off"
        />
        <input name="artist" value={artist} onChange={handleArtistChange} placeholder="search artist" />
        <button type="submit">Search</button>
      </form>
      {isError && <div style={{ marginTop: '20px' }}>An Error has occurred</div>}
      {isLoading ? <Loading /> : <SearchResults songs={results} />}
    </div>
  );
};

export default Search;
