import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { LibraryContext } from '../contexts/library.context';
import { SetlistsContext } from '../contexts/setlists.context';

import EditButtons from '../components/edit-buttons.component';
import SetlistEditForm from '../components/setlist-edit-form.component';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

const Setlist = () => {
  const [setlist, setSetlist] = useState({ songs: [], name: '' });
  const [setlistNameValue, setSetlistNameValue] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [selectSongs, setSelectSongs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  const navivgate = useNavigate();

  const { librarySongs } = useContext(LibraryContext);
  const { setlists, bulkAddToSetlist, deleteSetlist } = useContext(SetlistsContext);

  useEffect(() => {
    // Find the desired setlist in context and set in local state
    const currentSetlist = setlists.find((item) => item.id === parseInt(id));

    if (currentSetlist) {
      console.log(`Found setlist: ${currentSetlist.name}`);
      console.dir(currentSetlist);
      setSetlist(currentSetlist);
      setSetlistNameValue(currentSetlist.name);
    }
  }, [setlists, id]);

  useEffect(() => {
    // Set the default values of the select menu after setlist has loaded
    if (setlist.songs) {
      setSelectSongs(setlist['songs'].map((item) => item.id));
    }
  }, [setlist]);

  const handleFormSubmit = (e) => {
    // Bundle form data and call the setlists update function from context
    e.preventDefault();
    bulkAddToSetlist(id, setlistNameValue, selectSongs);
    setEditOpen(false);
  };

  const handleSelectChange = (e) => {
    // Create array from edit form select menu options
    // Update state to reflect selected values
    const selectOptions = e.target.selectedOptions;
    let newSelectSongs = [];
    for (let i = 0; i < selectOptions.length; i++) {
      newSelectSongs.push(selectOptions[i].value);
    }
    setSelectSongs(newSelectSongs);
  };

  const handleDelete = () => {
    // Call setlists context delete function
    deleteSetlist(id);
    navivgate('/setlists');
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const toggleFormOpen = () => setEditOpen(editOpen ? false : true);

  return (
    <Container className="mb-5">
      <h1>{setlist.name}</h1>
      <p>{setlist.timestamp}</p>

      {setlist.songs.length >= 1 ? (
        <ListGroup variant="flush" className="align-items-start">
          {setlist.songs.map((song) => {
            return (
              <ListGroup.Item key={song.id}>
                <Nav>
                  <Nav.Item>
                    <LinkContainer to={`/library/${song.id}`}>
                      <Nav.Link>
                        <Container>
                          <Stack direction="horizontal" gap={3}>
                            <Image src={song.thumbnail_url} fluid width={100} height={100} rounded />
                            <Stack gap={1} className="my-auto">
                              <span>{song.title}</span>
                              <span className="text-muted">by {song.artist}</span>
                            </Stack>
                          </Stack>
                        </Container>
                      </Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                </Nav>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <p className="text-muted">Your setlist is empty</p>
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
          toggleFormOpen={toggleFormOpen}
        />
      )}
      {!editOpen && <EditButtons buttonProps={{ toggleFormOpen, handleShowModal }} />}

      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this setlist?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleDelete}>
            Yes!
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Setlist;
