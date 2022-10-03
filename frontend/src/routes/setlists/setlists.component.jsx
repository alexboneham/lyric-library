import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import SetlistEditForm from '../../components/setlist-edit-form/setlist-edit-form.component'

import { LibraryContext } from '../../contexts/library.context';
import { isResponseOk } from '../../utils/helper-functions';
import './setlists.styles.scss';

const Setlists = () => {
  const [setlists, setSetlists] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [setlistNameValue, setSetlistNameValue] = useState('');
  const [selectSongs, setSelectSongs] = useState([]);

  const { librarySongs } = useContext(LibraryContext);

  useEffect(() => {
    // Get setlists from database
    fetch('http://localhost:8000/setlists')
      .then((res) => isResponseOk(res))
      .then((data) => setSetlists(data.setlists));
  }, []);

  const handleFormSubmit = (e) => {
    // Create a setlist and save to database
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
        setFormOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectChange = (e) => {
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
        <div className="form-container">
          <form onSubmit={handleFormSubmit} className="new-setlist-form">
            <label htmlFor="name">Setlist name: </label>
            <input
              name="name"
              id="name"
              value={setlistNameValue}
              placeholder="setlist name"
              className="form-input"
              onChange={(e) => setSetlistNameValue(e.target.value)}
              required
              autoComplete="off"
            />
            <label htmlFor="songs-menu">Select songs: </label>
            <select id="songs-menu" multiple={true} className="select-input" onChange={handleSelectChange}>
              {librarySongs.map((song) => (
                <option value={song.id} key={song.id}>
                  {song.title}
                </option>
              ))}
            </select>
            <span>
              <small>Hold down “Control”, or “Command” on a Mac, to select more than one.</small>
            </span>
            <button type="submit" className="form-button">
              Create setlist
            </button>
          </form>
        </div>
      ) : (
        <button onClick={() => setFormOpen(true)} className="new-button">
          New setlist
        </button>
      )}
    </div>
  );
};

export default Setlists;
