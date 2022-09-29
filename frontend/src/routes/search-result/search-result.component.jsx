import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { isResponseOk } from '../../utils/helper-functions';
import Loading from '../../components/loading/loading.component';

import './search-result.styles.scss';

const SearchResult = ({ librarySongs }) => {
  const { id } = useParams();
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
        });
    } catch (e) {
      console.log(`Error: ${e}`);
      setIsError(true);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    console.log('Check if in library hook running....');
    if(song){
      if(librarySongs.find((element) => element.genius_id === song.id)){
        setInLibrary(true);
        console.log('Made it through conditional');
      }
    }
  }, [librarySongs, song]);

  const addSongToLibrary = () => {
    fetch('http://localhost:8000/library', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(song),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        console.log(data);
        // Update library state ??
      })
      .catch((error) => console.log(error));

    setInLibrary(true);
  };

  return (
    <div className="search-result-container">
      {isError && <div>Something went wrong...</div>}
      {isLoading && <Loading />}
      {song && (
        <Fragment>
          <h1 className="title">{song.title}</h1>
          <h3 className="artist-name">by {song.artist}</h3>
          <button disabled={inLibrary ? true : false} onClick={addSongToLibrary}>
            {inLibrary ? 'Added to library!' : 'Add to library'}
          </button>
          <p className="lyrics">{song.lyrics}</p>
        </Fragment>
      )}
    </div>
  );
};

export default SearchResult;
