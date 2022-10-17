import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import SongItem from '../../components/song-item.component';
import { isResponseOk } from '../../utils/helper-functions';
import { LibraryContext } from '../../contexts/library.context';
import { UserContext } from '../../contexts/user.context';

import './library-item.styles.scss';

const LibraryItem = () => {
  const { id } = useParams();
  const [song, setSong] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [editValue, setEditValue] = useState('');

  const { removeSong } = useContext(LibraryContext);
  const { csrfToken } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Load song from database
    fetch(`http://localhost:8000/library/${id}`)
      .then((res) => isResponseOk(res))
      .then((data) => setSong(data))
      .catch((e) => console.log(e));
  }, [id]);

  const handleEditSubmit = (e) => {
    // Make PUT request to Django API to update the song with new lyrics
    e.preventDefault();
    if (!editValue) {
      console.log('No changes detected');
      setEditOpen(false);
      return;
    }
    fetch(`http://localhost:8000/library/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({
        lyrics: editValue,
      }),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        song.lyrics = data.lyrics;
        setEditOpen(false);
        setEditValue('');
        console.log('Song edited!');
      })
      .catch((e) => console.log(e));
  };

  const handleEditChange = (e) => {
    // Grab value from textarea on change for use in submit
    setEditValue(e.target.value);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      fetch(`http://localhost:8000/library/${id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
      })
        .then((res) => isResponseOk(res))
        .then((data) => {
          console.log('Song deleted!');
          console.log(data);
          removeSong(song);
          navigate('/library');
        })
        .catch((e) => console.log(e));
    }
  };

  // Props to send relating to actions
  const actionProps = {
    editOpen,
    handleEditSubmit,
    handleEditChange,
  };

  // Props to send relating to button display
  const buttonProps = {
    toggleFormOpen: () => (editOpen ? setEditOpen(false) : setEditOpen(true)),
    deleteButtonClick: handleDelete,
  };

  return (
    <>
      <SongItem song={song} description={song.description} buttonProps={buttonProps} actionProps={actionProps} />
    </>
  );
};

export default LibraryItem;
