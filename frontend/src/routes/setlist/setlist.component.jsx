import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { isResponseOk } from '../../utils/helper-functions';
import { LibraryContext } from '../../contexts/library.context';
import { UserContext } from '../../contexts/user.context';

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
  const { csrfToken } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:8000/setlists/${id}`)
      .then((res) => isResponseOk(res))
      .then((data) => {
        setSetlist(data);
        setSetlistNameValue(data.name);
      });
  }, [id]);

  useEffect(() => {
    if (setlist.songs) {
      setSelectSongs(setlist['songs'].map((item) => item.id));
    }
  }, [setlist]);

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
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({
        name: setlistNameValue,
        songs: selectSongs,
      }),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        console.log(data);
        setSetlist(data);
        setEditOpen(false);
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
        headers: {
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
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
          selectSongs={selectSongs}
          librarySongs={librarySongs}
          buttonMessage={'Save setlist'}
        />
      )}
      {setlist.songs && <LibraryList songs={setlist.songs} parent={'setlist'} />}
    </div>
  );
};

export default Setlist;
