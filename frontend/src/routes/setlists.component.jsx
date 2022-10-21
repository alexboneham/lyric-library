import { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import SetlistEditForm from '../components/setlist-edit-form.component';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LinkContainer } from 'react-router-bootstrap';

import { LibraryContext } from '../contexts/library.context';
import { SetlistsContext } from '../contexts/setlists.context';
import { UserContext } from '../contexts/user.context';

import { isResponseOk } from '../utils/helper-functions';

const Setlists = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [setlistNameValue, setSetlistNameValue] = useState('');
  const [selectSongs, setSelectSongs] = useState([]);

  const { librarySongs } = useContext(LibraryContext);
  const { csrfToken, isAuthenticated } = useContext(UserContext);
  const { setlists, setSetlists } = useContext(SetlistsContext);

  const handleFormSubmit = (e) => {
    /* 
      Create new setlist
      Send POST request to API with name and songs to add
      Returns new setlist object, spread to current setlists object
    */
    e.preventDefault();

    if (isAuthenticated) {
      fetch('http://localhost:8000/setlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
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
    }
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

  const toggleFormOpen = () => (formOpen ? setFormOpen(false) : setFormOpen(true));

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col sm={4}>
          <Container className="d-flex flex-column align-items-center" fluid>
            <h1>Setlists</h1>

            <Nav className="flex-column align-items-start">
              {setlists.map((setlist) => (
                <Nav.Item key={setlist.id}>
                  <LinkContainer to={`/setlists/${setlist.id}`}>
                    <Nav.Link>{setlist.name}</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              ))}
            </Nav>

            {formOpen ? (
              <SetlistEditForm
                handleFormSubmit={handleFormSubmit}
                handleSelectChange={handleSelectChange}
                setlistNameValue={setlistNameValue}
                setSetlistNameValue={setSetlistNameValue}
                selectSongs={selectSongs}
                librarySongs={librarySongs}
                buttonMessage={'Create setlist'}
                toggleFormOpen={toggleFormOpen}
              />
            ) : (
              <Button onClick={toggleFormOpen} className="mt-2" variant="outline-secondary">
                New setlist
              </Button>
            )}
          </Container>
        </Col>

        <Col sm={8}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Setlists;
