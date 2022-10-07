import { useContext, useState } from 'react';

import { SetlistsContext } from '../../contexts/setlists.context';

const AddSongToSetlist = ({ song }) => {
  const { setlists, addSongToSetlist } = useContext(SetlistsContext);
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
    if (selectValue < 0) {
      console.log('No setlist value selected');
      return;
    }
    addSongToSetlist(selectValue, song);
  };

  return (
    <form className="add-to-setlist-form" name="add-to-setlist" onSubmit={handleSubmit}>
      <select value={selectValue} onChange={handleChange}>
        <option value={-1} disabled={true}>
          --choose a setlist--
        </option>
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
