import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import SetlistEditForm from '../../components/setlist-edit-form/setlist-edit-form.component';

import { LibraryContext } from '../../contexts/library.context';
import { SetlistsContext } from '../../contexts/setlists.context';

import { isResponseOk } from '../../utils/helper-functions';
import './setlists.styles.scss';

const Setlists = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [setlistNameValue, setSetlistNameValue] = useState('');
  const [selectSongs, setSelectSongs] = useState([]);

  const { librarySongs } = useContext(LibraryContext);
  const { setlists, setSetlists } = useContext(SetlistsContext);

  const handleFormSubmit = (e) => {
    /* 
      Create new setlist
      Send POST request to API with name and songs to add
      Returns new setlist object, spread to current setlists object
    */
    e.preventDefault();

    fetch('http://localhost:8000/setlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: setlistNameValue,
        new_songs: selectSongs,
      }),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        console.log(data);
        setSetlists([...setlists, data]);
        setSetlistNameValue('');
        setSelectSongs([]);
        setFormOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectChange = (e) => {
    // Updates state from chosen options in edit select menu
    const selectOptions = e.target.selectedOptions;
    let newSelectSongs = [];
    for (let i = 0; i < selectOptions.length; i++) {
      newSelectSongs.push(selectOptions[i].value);
    }
    setSelectSongs(newSelectSongs);
  };

  return (
    <div className="setlists-container">
      <div className="header-container">
        <h1>Setlists</h1>
        {setlists.map((setlist) => (
          <div key={setlist.id} className="setlists">
            <Link to={`/setlists/${setlist.id}`}>{setlist.name}</Link>
          </div>
        ))}
      </div>
      {formOpen ? (
        <SetlistEditForm
          handleFormSubmit={handleFormSubmit}
          handleSelectChange={handleSelectChange}
          setlistNameValue={setlistNameValue}
          setSetlistNameValue={setSetlistNameValue}
          selectSongs={selectSongs}
          librarySongs={librarySongs}
          buttonMessage={'Create setlist'}
        />
      ) : (
        <button onClick={() => setFormOpen(true)} className="new-button">
          New setlist
        </button>
      )}
    </div>
  );
};

export default Setlists;
