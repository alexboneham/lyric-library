import { useState, useEffect, Fragment, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import SongItem from '../../components/song-item/song-item.component';
import { isResponseOk } from '../../utils/helper-functions';
import { LibraryContext } from '../../contexts/library.context';

import './library-item.styles.scss';

const LibraryItem = () => {
  const { id } = useParams();
  const [song, setSong] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [addToSetlistOpen, setAddToSetlistOpen] = useState(false);

  const { removeSong } = useContext(LibraryContext);
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
      },
      body: JSON.stringify({
        lyrics: editValue,
      }),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        song.lyrics = data.lyrics;
        setEditOpen(false);
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
    addToSetlistOpen,
    handleEditSubmit,
    handleEditChange,
  };

  // Props to send relating to button display
  const buttonProps = {
    editButtonClick: () => (editOpen ? setEditOpen(false) : setEditOpen(true)),
    deleteButtonClick: handleDelete,
    setlistButtonClick: () => (addToSetlistOpen ? setAddToSetlistOpen(false) : setAddToSetlistOpen(true))
  };

  return (
    <Fragment>
      <SongItem song={song} description={song.description} buttonProps={buttonProps} actionProps={actionProps} />
    </Fragment>
  );
};

export default LibraryItem;
