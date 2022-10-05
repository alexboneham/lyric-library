import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import SearchResults from '../../components/search-results.component';
import Loading from '../../components/loading/loading.component';

import './search.styles.scss';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  // const page = searchParams.get('page') || 0;
  const [results, setResults] = useState([]);
  const [initialParam, setInitialParam] = useState(searchParams.get('q') || '');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSearchParams(
      newQuery
        ? {
            q: newQuery,
          }
        : undefined
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFunction(query);
  };

  useEffect(() => {
    // Run fetch on initial render if url alreay has params
    if (initialParam) {
      fetchFunction(initialParam);
    }
    setInitialParam('');
  }, [initialParam]);

  const fetchFunction = (searchQuery) => {
    setIsLoading(true);
    fetch(`http://localhost:8000/search?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.hits);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true)
        setIsLoading(false)
      });
  };

  return (
    <div className="search-container">
      <h1>Search for a song</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="query"
          name="q"
          value={query}
          placeholder="song title..."
          required
          onChange={handleChange}
          autoComplete="off"
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div style={{'marginTop': '20px'}}>An Error has occurred</div>}
      {isLoading ? <Loading /> : <SearchResults songs={results} />}
    </div>
  );
};

export default Search;
