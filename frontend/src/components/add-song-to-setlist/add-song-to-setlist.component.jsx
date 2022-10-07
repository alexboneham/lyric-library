import { useContext, useState } from 'react';

import { SetlistsContext } from '../../contexts/setlists.context';
import { isResponseOk } from '../../utils/helper-functions';

const AddSongToSetlist = ({ song }) => {
  const { setlists } = useContext(SetlistsContext);
  const [selectValue, setSelectValue] = useState(-1);

  const checkSongInSetlist = (setlist) => {
    if (setlist.songs.find(({ id }) => id === song.id)) {
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    setSelectValue(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    /* 
      Edit setlist
      Send PUT request to API with name and an array of song ids for setlist
      Returns new setlist object
    */
    e.preventDefault();
    if(selectValue < 0){
      console.log('No setlist value selected')
      return 
    }
    const setlistToUpdate = setlists.find(({ id }) => id === selectValue);
    const songsArray = setlistToUpdate['songs'].map((item) => item.id);

    fetch(`http://localhost:8000/setlists/${setlistToUpdate.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: setlistToUpdate.name,
        songs: [...songsArray, song.id],
      }),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        console.log(data);
        // Need to disable the select menu option for that setlist
        // need the select menu to re-render due to state change
      });
  };

  return (
    <form className="add-to-setlist-form" name="add-to-setlist" onSubmit={handleSubmit}>
      <select value={selectValue} onChange={handleChange}>
        <option value={-1} disabled={true}>--choose a setlist--</option>
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
