import { createContext, useState, useEffect } from 'react';
import { isResponseOk } from '../utils/helper-functions';

export const SetlistsContext = createContext({
  setlists: [],
  addSongToSetlist: () => null,
});

export const SetlistsProvider = ({ children }) => {
  const [setlists, setSetlists] = useState([]);

  useEffect(() => {
    // Get setlists from database
    fetch('http://localhost:8000/setlists')
      .then((res) => isResponseOk(res))
      .then((data) => setSetlists(data.setlists));
  }, []);

  const addSongToSetlist = (setlistId, song) => {

    const setlistToUpdate = setlists.find(({ id }) => id === setlistId);
    if (!setlistToUpdate) return
    const songsIdsArray = setlistToUpdate['songs'].map((item) => item.id);

    fetch(`http://localhost:8000/setlists/${setlistToUpdate.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: setlistToUpdate.name,
        songs: [...songsIdsArray, song.id],
      }),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        console.log(data);
        // Need to disable the select menu option for that setlist
        // need the select menu to re-render due to state change
        
      });
  }

  const value = {
    setlists,
    setSetlists,
    addSongToSetlist
  };
  return <SetlistsContext.Provider value={value}>{children}</SetlistsContext.Provider>;
};
