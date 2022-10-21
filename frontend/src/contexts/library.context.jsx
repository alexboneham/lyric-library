import { createContext, useState, useEffect, useContext } from 'react';

import { UserContext } from '../contexts/user.context';
import { isResponseOk } from '../utils/helper-functions';

export const LibraryContext = createContext({
  librarySongs: [],
  setLibrarySongs: () => null,
  isSongInLibrary: () => null,
  removeSong: () => null,
});

export const LibraryProvider = ({ children }) => {
  const [librarySongs, setLibrarySongs] = useState([]);
  const { user, isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    console.log('library useEffect running...');
    if (isAuthenticated) {
      console.log('Fetching library songs...');
      fetch('http://localhost:8000/library', {
        credentials: 'include',
      })
        .then((res) => isResponseOk(res))
        .then((data) => {
          setLibrarySongs(data.songs);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  const isSongInLibrary = (song) => {
    if (librarySongs.find((element) => element.genius_id === song.id)) {
      return true;
    }
    return false;
  };

  const removeSong = (song) => {
    const newSongs = librarySongs.filter((item) => item.id !== song.id);
    setLibrarySongs(newSongs);
  };

  const value = {
    librarySongs,
    setLibrarySongs,
    isSongInLibrary,
    removeSong,
  };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};
