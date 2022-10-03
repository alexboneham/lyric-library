import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import SetlistEditForm from '../../components/setlist-edit-form/setlist-edit-form.component';

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
        setSelectSongs([]);
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
