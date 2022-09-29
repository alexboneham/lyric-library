import { createContext, useState, useEffect } from 'react';

import { isResponseOk } from '../utils/helper-functions';

export const LibraryContext = createContext({
  librarySongs: [],
  setLibrarySongs: () => null,
  addSongToLibrary: () => null,
});

export const LibraryProvider = ({ children }) => {
  const [librarySongs, setLibrarySongs] = useState([]);

  useEffect(() => {
    console.log('Context useEffect running...');
    fetch('http://localhost:8000/library')
      .then((res) => isResponseOk(res))
      .then((data) => {
        setLibrarySongs(data.songs);
      })
      .catch((error) => console.log(error));
  }, []);

  const addSongToLibrary = (newSong) => setLibrarySongs([...librarySongs, newSong]);

  const value = {
    librarySongs,
    setLibrarySongs,
    addSongToLibrary,
  };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};
