import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ResultList from '../../components/result-list.component';

import './search.styles.scss';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  // const page = searchParams.get('page') || 0;
  const [results, setResults] = useState([]);

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
    // Run fetch on initial render if url has search params already defined
    if (query) {
      fetchFunction(query);
    }
  }, []);

  const fetchFunction = (searchQuery) => {
    fetch(`http://localhost:8000/search?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.hits);
      });
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input id="query" name="q" value={query} placeholder="Search for a song" required onChange={handleChange} autoComplete="off"/>
        <button type="submit">Search</button>
      </form>
      {results.length > 0 && <ResultList songs={results} />}
    </div>
  );
};

export default Search;
