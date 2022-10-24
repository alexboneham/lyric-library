import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../components/loading.component';
import SongItem from '../components/song-item.component';
import ErrorLoad from './error-load.component';

import Container from 'react-bootstrap/Container';

import { isResponseOk } from '../utils/helper-functions';
import { LibraryContext } from '../contexts/library.context';
import { UserContext } from '../contexts/user.context';

const SearchResult = () => {
  const { id } = useParams(); // Get Genius id from the URL route
  const { librarySongs, setLibrarySongs, isSongInLibrary } = useContext(LibraryContext); // Context provider
  const { csrfToken, isAuthenticated } = useContext(UserContext);

  // Set State
  const [song, setSong] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inLibrary, setInLibrary] = useState(isAuthenticated ? false : undefined);

  useEffect(() => {
    setIsLoading(true);
    // Search for song data.
    // Calls Django API, which in turn calls Genius API for song info, lyrics, etc
    fetch(`http://localhost:8000/search/${id}`)
      .then((res) => isResponseOk(res))
      .then((data) => {
        setIsLoading(false);
        if (data.description.plain) {
          if (data.description.plain === '?') {
            data.description.plain = `From the album: ${data.album.name}`;
          }
        }
        setSong(data);
      })
      .catch((error) => {
        console.log(`from useEffect: ${error}`);
        setIsLoading(false);
        setIsError(true);
      });
  }, [id]);

  useEffect(() => {
    // Runs when song is loaded to check whether song is in library.
    // N.B. moved this function out of the fetch useEffect because it was triggering it to
    // re-run thus making a redundant call to the API + re-rendering the entire page.
    // Now this use effect runs more often, but avoids the fetch and is lightweight.
    if (song) {
      if (isSongInLibrary(song)) {
        setInLibrary(true);
      }
    }
  }, [song, isSongInLibrary]);

  const clickAddToLibrary = () => {
    // Handles POST request to Django API to save the song to the user's database
    if (isAuthenticated) {
      fetch('http://localhost:8000/library', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(song),
      })
        .then((res) => isResponseOk(res))
        .then((data) => {
          console.log(data);
          setLibrarySongs([data.song, ...librarySongs]);
          setInLibrary(true);
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
        });
    }
  };

  const buttonProps = {
    inLibrary: inLibrary,
    clickAddToLibrary: clickAddToLibrary,
  };

  // Send empty object to satisfy destructing at song-item level
  const actionProps = {};

  return (
    <>
      <Container className="text-center mt-5">
        {isError && (
          <>
            <ErrorLoad id={id} />
          </>
        )}
        {isLoading && <Loading />}
      </Container>
      {song && (
        <>
          <SongItem
            song={song}
            description={song.description['plain']}
            thumbnail={song['song_art_image_thumbnail_url']}
            buttonProps={buttonProps}
            actionProps={actionProps}
          />
        </>
      )}
    </>
  );
};

export default SearchResult;
