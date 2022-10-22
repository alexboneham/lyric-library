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
    // Set the setlists state once user is authenticated
    if (isAuthenticated) {
      fetch('http://localhost:8000/setlists', {
        credentials: 'include',
      })
        .then((res) => isResponseOk(res))
        .then((data) => setSetlists(data.setlists));
    }
  }, [isAuthenticated]);

  const addSongToSetlist = (setlistId, song) => {
    // Find the targeted setlist
    const setlistToUpdate = setlists.find(({ id }) => id === setlistId);
    if (!setlistToUpdate) return;

    // Create an array of song ids to send to API
    const currentSongsIds = setlistToUpdate['songs'].map((item) => item.id);
    const newIds = [...currentSongsIds, song.id];

    // Call the generic bulk add function with relevant arguments
    bulkAddToSetlist(setlistToUpdate.id, setlistToUpdate.name, newIds);
  };

  const bulkAddToSetlist = (id, name, idsArray) => {
    // Make PUT request to API with setlist name and an array of song ids
    // If successful, update state

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
        console.log(data);
        const newSetlists = setlists.map((setlist) => (setlist.id === parseInt(id) ? data : setlist));
        setSetlists(newSetlists);
      })
      .catch((e) => console.log(e));
  };

  const deleteSetlist = (id) => {
    // Make DELETE request to API and update state upon valid response

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
      })
      .catch((e) => console.log(e));
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
