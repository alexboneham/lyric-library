import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../../components/loading/loading.component';
import SongItem from '../../components/song-item/song-item.component';

import { isResponseOk } from '../../utils/helper-functions';
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
    console.log('Search result route useEffect is running');
    setIsLoading(true);
    // API call for song details
    fetch(`http://localhost:8000/search/${id}`)
      .then((res) => isResponseOk(res))
      .then((data) => {
        setIsLoading(false);
        setSong(data);
        if (isSongInLibrary(data)) {
          setInLibrary(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [id, isSongInLibrary]);

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
        <div>
          <button disabled={inLibrary ? true : false} onClick={clickHandler}>
            {inLibrary ? 'Added to library!' : 'Add to library'}
          </button>
          <SongItem
            song={song}
            description={song.description['plain']}
            thumbnail={song['song_art_image_thumbnail_url']}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResult;
