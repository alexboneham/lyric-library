import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import SearchResults from '../../components/search-results.component';
import Loading from '../../components/loading/loading.component';

import './search.styles.scss';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialParam, setInitialParam] = useState(searchParams.get('title') || '');
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [results, setResults] = useState([]);
  // const page = searchParams.get('page') || 0;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(
    (searchQuery) => {
      // Creates a memoized callback to use from other hooks avoiding re-render loop.
      setIsLoading(true);
      setSearchParams(searchQuery);
      fetch(`http://localhost:8000/search?${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          if (data.hits) {
            setResults(data.hits);
          } else if (data.id) {
            navigate(`/search/${data.id}`);
          } else {
            console.log('Something wrong in the fetch data handling...');
          }
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
          setIsLoading(false);
        });
    },
    [setSearchParams, navigate]
  );

  useEffect(() => {
    // Set the query state depending on current input states
    artist ? setQuery(`title=${title}&artist=${artist}`) : setQuery(`title=${title}`);
  }, [title, artist]);

  useEffect(() => {
    // Run fetch on initial render if URL already has a 'title' search parameter.
    // Note: linter requires fetchData function as dep, so hook runs on fetch too.
    if (initialParam) {
      const initialQuery = `title=${initialParam}`;
      setTitle(initialParam);
      fetchData(initialQuery);
    }
    setInitialParam('');
  }, [initialParam, fetchData]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleArtistChange = (e) => setArtist(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query);
    fetchData(query);
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
      {isError && <div style={{ marginTop: '20px' }}>An Error has occurred. Please try again</div>}
      {isLoading ? <Loading /> : <SearchResults songs={results} />}
    </div>
  );
};

export default Search;
