import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { isResponseOk } from '../../utils/helper-functions';
import { LibraryContext } from '../../contexts/library.context';

import ButtonGroup from '../../components/button-group/button-group.component';
import LibraryList from '../../components/library-list/library-list.component';
import SetlistEditForm from '../../components/setlist-edit-form/setlist-edit-form.component';

import './setlist.styles.scss';

const Setlist = () => {
  const [setlist, setSetlist] = useState({});
  const [setlistNameValue, setSetlistNameValue] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [selectSongs, setSelectSongs] = useState([]);

  const { id } = useParams();
  const naviagate = useNavigate();
  const { librarySongs } = useContext(LibraryContext);

  useEffect(() => {
    fetch(`http://localhost:8000/setlists/${id}`)
      .then((res) => isResponseOk(res))
      .then((data) => {
        setSetlist(data);
        setSetlistNameValue(data.name);
      });
  }, [id]);

  const editButtonClick = () => setEditOpen(editOpen ? false : true);

  const handleFormSubmit = (e) => {
    /* 
      Edit setlist
      Send PUT request to API with name and an array of song ids for setlist
      Returns new setlist object
    */
    e.preventDefault();
    fetch(`http://localhost:8000/setlists/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: setlistNameValue,
        songs: selectSongs,
      }),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        console.log(data);
        setSetlist(data);
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

  const deleteButtonClick = () => {
    // Delete setlist from library
    if (window.confirm('Are you sure you want to delete this setlist?')) {
      fetch(`http://localhost:8000/setlists/${id}`, {
        method: 'DELETE',
      })
        .then((res) => isResponseOk(res))
        .then((data) => {
          console.log(data);
          naviagate('/setlists');
        });
    }
  };

  return (
    <div className="setlist-container">
      <h1>{setlist.name}</h1>
      <p>{setlist.timestamp}</p>
      <ButtonGroup buttonProps={{ editButtonClick, deleteButtonClick }} />
      {editOpen && (
        <SetlistEditForm
          handleFormSubmit={handleFormSubmit}
          handleSelectChange={handleSelectChange}
          setlistNameValue={setlistNameValue}
          setSetlistNameValue={setSetlistNameValue}
          librarySongs={librarySongs}
          buttonMessage={'Save setlist'}
        />
      )}
      {setlist.songs && <LibraryList songs={setlist.songs} />}
    </div>
  );
};

export default Setlist;
