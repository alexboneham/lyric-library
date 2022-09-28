import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './setlists.styles.scss';
const Setlists = () => {
  const [setlists, setSetlists] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [setlistName, setSetlistName] = useState('');

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
  };

  const submitHandler = (e) => {
    // Create a setlist and save to database
    e.preventDefault();
    makeNewSetlist();
    // add checkboxes for songs to add
    setSetlistName('');
    setFormOpen(false);
  };

  const changeHandler = (e) => {
    // Set state value from form input
    setSetlistName(e.target.value);
  };

  const makeNewSetlist = async () => {
    // POST request to API to create a new setlist
    const res = await fetch('http://localhost:8000/setlists', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: setlistName,
        new_songs: [],
      }),
    });
    const data = await res.json();
    setSetlists([...setlists, data]);    
  };

  return (
    <div className="setlists-container">
      <h1>Setlists</h1>
      {setlists.map((setlist) => (
        <div key={setlist.id} className="setlists">
          <Link to={`/setlists/${setlist.id}`}>{setlist.name}</Link>
        </div>
      ))}
      {formOpen ? (
        <form onSubmit={submitHandler} className="new-setlist-form">
          <input
            name="name"
            value={setlistName}
            placeholder="setlist name"
            className="form-input"
            onChange={changeHandler}
            required
            autoComplete='off'
          />
          <button type="submit" className="form-button">
            Create setlist
          </button>
        </form>
      ) : (
        <button type="submit" onClick={clickHandler} className="new-button">
          New setlist
        </button>
      )}
    </div>
  );
};

export default Setlists;
