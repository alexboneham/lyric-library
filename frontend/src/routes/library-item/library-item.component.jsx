import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import SongItem from '../../components/song-item/song-item.component';
import { isResponseOk } from '../../utils/helper-functions';
import './library-item.styles.scss';

const LibraryItem = () => {
  const { id } = useParams();
  const [song, setSong] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [editValue, setEditValue] = useState('');

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
      })
      .catch((e) => console.log(e));
  };

  const handleEditChange = (e) => {
    // Grab value from textarea on change for use in submit
    setEditValue(e.target.value);
  };

  const handleDelete = () => {};

  // Props to send relating to actions
  const actionProps = {
    editOpen,
    handleEditSubmit,
    handleEditChange,
  };

  // Props to send relating to button display
  const buttonProps = {
    editButtonClick: () => setEditOpen(true),
    deleteButtonClick: () => console.log('Delete clicked'),
  };

  return (
    <Fragment>
      <SongItem song={song} description={song.description} buttonProps={buttonProps} actionProps={actionProps} />
    </Fragment>
  );
};

export default LibraryItem;
