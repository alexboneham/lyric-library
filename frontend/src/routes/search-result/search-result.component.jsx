import { useState, useEffect, Fragment, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { isResponseOk } from '../../utils/helper-functions';
import Loading from '../../components/loading/loading.component';
import { LibraryContext } from '../../contexts/library.context';

import './search-result.styles.scss';

const SearchResult = () => {
  const { id } = useParams();
  const { librarySongs, setLibrarySongs, isSongInLibrary } = useContext(LibraryContext); // Context provider
  const [song, setSong] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inLibrary, setInLibrary] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // API call for song details
    try {
      fetch(`http://localhost:8000/search/${id}`)
        .then((res) => isResponseOk(res))
        .then((data) => {
          setSong(data);
          setIsLoading(false);
          setInLibrary(isSongInLibrary(data));
        });
    } catch (e) {
      console.log(`Error: ${e}`);
      setIsError(true);
      setIsLoading(false);
    }
  }, [id]);

  const clickHandler = () => {
    fetch('http://localhost:8000/library', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(song),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        setLibrarySongs([data.song, ...librarySongs]);
        setInLibrary(true);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  };

  return (
    <div className="search-result-container">
      {isError && <div>Something went wrong...</div>}
      {isLoading && <Loading />}
      {song && (
        <Fragment>
          <h1 className="title">{song.title}</h1>
          <h3 className="artist-name">by {song.artist}</h3>
          <button disabled={inLibrary ? true : false} onClick={clickHandler}>
            {inLibrary ? 'Added to library!' : 'Add to library'}
          </button>
          <p className="lyrics">{song.lyrics}</p>
        </Fragment>
      )}
    </div>
  );
};

export default SearchResult;
