import { useContext } from 'react';

import { SetlistsContext } from '../../contexts/setlists.context';

const AddSongToSetlist = ({ song }) => {
  const { setlists } = useContext(SetlistsContext);

  const checkSongInSetlist = (setlist) => {
    if (setlist.songs.find(({ id }) => id === song.id)) {
      return true;
    }
    return false;
  };

  return (
    <form className="add-to-setlist-form">
      <select>
        {setlists.map((setlist) => {
          let check = checkSongInSetlist(setlist);
          return (
            <option value={setlist.id} key={setlist.id} disabled={check}>
              {setlist.name}
            </option>
          );
        })}
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddSongToSetlist;
