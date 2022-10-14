import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { isResponseOk } from '../utils/helper-functions';

import { LibraryContext } from '../contexts/library.context';
import { UserContext } from '../contexts/user.context';
import { SetlistsContext } from '../contexts/setlists.context';

import EditButtons from '../components/edit-buttons.component';
import LibraryList from '../components/library-list/library-list.component';
import SetlistEditForm from '../components/setlist-edit-form.component';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const Setlist = () => {
  const [setlist, setSetlist] = useState({songs: []});
  const [setlistNameValue, setSetlistNameValue] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [selectSongs, setSelectSongs] = useState([]);

  const { id } = useParams();
  const navivgate = useNavigate();

  const { librarySongs } = useContext(LibraryContext);
  const { csrfToken } = useContext(UserContext);
  const { deleteSetlist } = useContext(SetlistsContext);

  useEffect(() => {
    // Get the setlist data from database
    fetch(`http://localhost:8000/setlists/${id}`)
      .then((res) => isResponseOk(res))
      .then((data) => {
        setSetlist(data);
        setSetlistNameValue(data.name);
      });
  }, [id]);

  useEffect(() => {
    // Set the default values of the select menu after setlist has loaded
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
      deleteSetlist(id);
      navivgate('/setlists');
    }
  };

  return (
    <Container>
      <h1>{setlist.name}</h1>
      <p>{setlist.timestamp}</p>

      {setlist.songs.length >= 1 ? (
        <Nav className="flex-column">
        {setlist.songs.map((song) => (
          <Nav.Item key={song.id}>
            <LinkContainer to={`/library/${song.id}`}>
              <Nav.Link>{song.title}</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        ))}
      </Nav>
      ) : (
        <p className='text-muted'>Your setlist is empty</p>
      )}
      

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
      <EditButtons buttonProps={{ editButtonClick, deleteButtonClick }} />
    </Container>
  );
};

export default Setlist;






