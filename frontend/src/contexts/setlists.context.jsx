import { createContext, useState, useEffect, useContext } from 'react';
import { isResponseOk } from '../utils/helper-functions';

import { UserContext } from './user.context';

export const SetlistsContext = createContext({
  setlists: [],
  addSongToSetlist: () => null,
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
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newArr = setlists.map((setlist) => setlist.id === setlistId ? data : setlist)
        setSetlists(newArr);
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
    deleteSetlist,
  };
  return <SetlistsContext.Provider value={value}>{children}</SetlistsContext.Provider>;
};
