import { createContext, useState, useEffect } from 'react';

import { isResponseOk } from '../utils/helper-functions';

export const LibraryContext = createContext({
  librarySongs: [],
  setLibrarySongs: () => null,
  isSongInLibrary: () => null,
});

export const LibraryProvider = ({ children }) => {
  const [librarySongs, setLibrarySongs] = useState([]);

  useEffect(() => {
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

  const value = {
    librarySongs,
    setLibrarySongs,
    isSongInLibrary,
  };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};
