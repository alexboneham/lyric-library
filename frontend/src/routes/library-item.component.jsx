import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { isResponseOk } from '../utils/helper-functions';
import { LibraryContext } from '../contexts/library.context';
import { UserContext } from '../contexts/user.context';

import SongItem from '../components/song-item.component';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const LibraryItem = () => {
  const { id } = useParams();
  const [song, setSong] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { removeSong } = useContext(LibraryContext);
  const { csrfToken } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Load song from database
    fetch(`http://localhost:8000/library/${id}`, {
      credentials: 'include',
    })
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

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = () => {
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
    handleShowModal: handleShowModal,
  };

  return (
    <>
      <SongItem song={song} description={song.description} buttonProps={buttonProps} actionProps={actionProps} />

      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this song?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleDelete}>
            Yes!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LibraryItem;
