import { useEffect, useState } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';

import { isResponseOk } from '../utils/helper-functions';

import Search from './search.component';
import Results from '../components/results.component';
import Loading from '../components/loading.component';

const SearchResults = () => {
  let location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [hits, setHits] = useState([]);

  useEffect(() => {
    if (location.state !== null) {
      setSearchParams(location.state.query);
    }
  }, [location.state, setSearchParams]);

  useEffect(() => {
    setSearchQuery(searchParams.toString());
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery) {
      // Make fetch to database for search results

      fetch(`http://localhost:8000/search?${searchQuery}`, {
        credentials: 'include',
      })
        .then((res) => isResponseOk(res))
        .then((data) => {
          setIsLoading(false);
          if (data.hits) {
            setHits(data.hits);
          } else if (data.id) {
            // Go straight to song
            navigate(`/search/${data.id}`)
          } else {
            console.log('Something else went wrong');
          }
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
          setIsError(true);
        });
    }
  }, [searchQuery, navigate]);

  return (
    <>
      <Search />
      <hr />
      {isLoading && <Loading />}
      {isError && <div>An error occurred</div>}
      {hits && (
        <>
          <Results songs={hits} />
        </>
      )}
    </>
  );
};

export default SearchResults;
