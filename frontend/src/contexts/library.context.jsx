import { createContext, useState, useEffect } from 'react';

import { isResponseOk } from '../utils/helper-functions';

export const LibraryContext = createContext({
  librarySongs: [],
  setLibrarySongs: () => null,
  isSongInLibrary: () => null,
  removeSong: () => null,
});

export const LibraryProvider = ({ children }) => {
  const [librarySongs, setLibrarySongs] = useState([]);

  useEffect(() => {
    console.log('Context fetch running...')
    fetch('http://localhost:8000/library')
      .then((res) => isResponseOk(res))
      .then((data) => {
        setLibrarySongs(data.songs);
      })
      .catch((error) => console.log(error));
  }, []);

  const isSongInLibrary = (song) => {
    if (librarySongs.find((element) => element.genius_id === song.id)) {
      return true;
    }
    return false;
  };

  // Remove song from library function
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
