import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import './search-result.styles.scss';

const SearchResult = () => {
  const { id } = useParams();
  const [song, setSong] = useState(undefined);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // API call for song details
    try {
      fetch(`http://localhost:8000/search/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSong(data);
          console.log('useEffect run');
        });
    } catch (e) {
      console.log(`Error: ${e}`);
      setIsError(true);
    }
  }, [id]);

  return (
    <div className="search-result-container">
      {isError && <div>Something went wrong...</div>}
      {song && (
        <Fragment>
          <h1 className="title">{song.title}</h1>
          <h3 className="artist-name">by {song.artist}</h3>
          <p className="lyrics">{song.lyrics}</p>
        </Fragment>
      )}
    </div>
  );
};

export default SearchResult;