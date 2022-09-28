import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { isResponseOk } from '../../utils/helper-functions';
import './setlists.styles.scss';

const Setlists = () => {
  const [setlists, setSetlists] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [setlistName, setSetlistName] = useState('');
  const [allSongs, setAllSongs] = useState([]);
  const [selectSongs, setSelectSongs] = useState([]);

  useEffect(() => {
    // Makes get request on page load for setlists data
    const makeFetch = async () => {
      const res = await (await fetch('http://localhost:8000/setlists')).json();
      setSetlists(res.setlists);
    };
    makeFetch();
  }, []);

  const clickHandler = (e) => {
    // Toggles form show/hide
    setFormOpen(true);
    // Grab songs from user's library
    fetch('http://localhost:8000/library')
      .then((res) => isResponseOk(res))
      .then((data) => {
        setAllSongs(data.songs);
      });
  };

  const submitHandler = (e) => {
    // Create a setlist and save to database
    e.preventDefault();
    newSetlist();
    setSetlistName('');
    setFormOpen(false);
  };

  const changeHandler = (e) => {
    // Set state value from form input
    setSetlistName(e.target.value);
  };

  const handleSelectChange = (e) => {
    const selectOptions = e.target.selectedOptions;
    let newSelectSongs = [];
    for (let i = 0; i < selectOptions.length; i++) {
      newSelectSongs.push(selectOptions[i].value);
    }
    setSelectSongs(newSelectSongs);
  };

  const newSetlist = () => {
    fetch('http://localhost:8000/setlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: setlistName,
        new_songs: selectSongs,
      }),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        console.log(data);
        setSetlists([...setlists, data]);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <form onSubmit={submitHandler} className="new-setlist-form">
            <label htmlFor="name">Setlist name: </label>
            <input
              name="name"
              id="name"
              value={setlistName}
              placeholder="setlist name"
              className="form-input"
              onChange={changeHandler}
              required
              autoComplete="off"
            />
            <label htmlFor="songs-menu">Select songs: </label>
            <select id="songs-menu" multiple={true} className="select-input" onChange={handleSelectChange}>
              {allSongs.map((song) => (
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
        <button type="submit" onClick={clickHandler} className="new-button">
          New setlist
        </button>
      )}
    </div>
  );
};

export default Setlists;
