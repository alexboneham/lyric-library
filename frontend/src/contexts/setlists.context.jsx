import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { isResponseOk } from '../utils/helper-functions';

import { UserContext } from './user.context';

export const SetlistsContext = createContext({
  setlists: [],
  addSongToSetlist: () => null,
  deleteSetlist: () => null,
});

export const SetlistsProvider = ({ children }) => {
  const [setlists, setSetlists] = useState([]);
  const { csrfToken } = useContext(UserContext);

  const getSetlists = useCallback(() => {
    // Get setlists from database
    fetch('http://localhost:8000/setlists')
      .then((res) => isResponseOk(res))
      .then((data) => setSetlists(data.setlists));
  }, []);

  useEffect(() => {
    getSetlists();
  }, [getSetlists]);

  const addSongToSetlist = (setlistId, song) => {
    const setlistToUpdate = setlists.find(({ id }) => id === setlistId);
    if (!setlistToUpdate) return;
    const songsIdsArray = setlistToUpdate['songs'].map((item) => item.id);

    fetch(`http://localhost:8000/setlists/${setlistToUpdate.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({
        name: setlistToUpdate.name,
        songs: [...songsIdsArray, song.id],
      }),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        console.log(data);
        getSetlists();
      });
  };

  const deleteSetlist = (id) => {
    fetch(`http://localhost:8000/setlists/${id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        console.log(data);
        getSetlists();
      });
  };

  const value = {
    setlists,
    setSetlists,
    addSongToSetlist,
    deleteSetlist,
  };
  return <SetlistsContext.Provider value={value}>{children}</SetlistsContext.Provider>;
};
