import { createContext, useState, useEffect, useContext } from 'react';
import { isResponseOk } from '../utils/helper-functions';

import { UserContext } from './user.context';

export const SetlistsContext = createContext({
  setlists: [],
  addSongToSetlist: () => null,
  bulkAddToSetlist: () => null,
  deleteSetlist: () => null,
});

export const SetlistsProvider = ({ children }) => {
  const [setlists, setSetlists] = useState([]);
  const { csrfToken, isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated) {
      // Get setlists from database
      fetch('http://localhost:8000/setlists', {
        credentials: 'include',
      })
        .then((res) => isResponseOk(res))
        .then((data) => setSetlists(data.setlists));
    }
  }, [isAuthenticated]);

  const addSongToSetlist = (setlistId, song) => {
    const setlistToUpdate = setlists.find(({ id }) => id === setlistId);
    if (!setlistToUpdate) return;

    const currentSongsArr = setlistToUpdate['songs'].map((item) => item.id);
    const newIdsArray = [...currentSongsArr, song.id];

    bulkAddToSetlist(setlistToUpdate.id, setlistToUpdate.name, newIdsArray)
  };

  const bulkAddToSetlist = (id, name, idsArray) => {
    fetch(`http://localhost:8000/setlists/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        songs: idsArray,
      }),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        console.log('Updated setlist: ')
        console.log(data);
        const newSetlists = setlists.map((setlist) => (setlist.id === parseInt(id) ? data : setlist));
        setSetlists(newSetlists);
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
        setSetlists(setlists.filter((setlist) => setlist.id !== parseInt(id)));
      });
  };

  const value = {
    setlists,
    setSetlists,
    addSongToSetlist,
    bulkAddToSetlist,
    deleteSetlist,
  };
  return <SetlistsContext.Provider value={value}>{children}</SetlistsContext.Provider>;
};
