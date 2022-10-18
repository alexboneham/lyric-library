import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../contexts/user.context';
import { LibraryContext } from '../contexts/library.context';
import { isResponseOk } from '../utils/helper-functions';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import BackButton from '../components/back-button.component';

const NewSong = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [lyrics, setLyrics] = useState('');

  const { csrfToken } = useContext(UserContext);
  const { librarySongs, setLibrarySongs } = useContext(LibraryContext);
  const navigate = useNavigate();

  const imageUrl =
    'https://images.unsplash.com/photo-1602848597941-0d3d3a2c1241?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=875&q=80';

  const artistImageUrl =
    'https://images.unsplash.com/photo-1595971294624-80bcf0d7eb24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80';

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleArtistChange = (e) => setArtist(e.target.value);
  const handleLyricsChange = (e) => setLyrics(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const song = {
      title: title,
      artist: artist,
      lyrics: lyrics,
      id: 0,
      full_title: `${title} by ${artist}`,
      description: {
        plain: `A song composed by ${artist}`,
      },
      song_art_image_thumbnail_url: imageUrl,
      primary_artist: {
        id: 0,
        image_url: artistImageUrl,
      },
      album: {
        name: 'My songs',
        full_title: 'My songs by me',
        id: 0,
      },
    };

    fetch('http://localhost:8000/library', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify(song),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        console.log(data);
        setLibrarySongs([...librarySongs, data.song]);
        navigate('/library');
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col md={4} className="mx-auto">
          <h1 className="display-5 text-center">New song</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="The greatest song ever"
                autoComplete="off"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formArtist">
              <Form.Label>Artist name</Form.Label>
              <Form.Control
                type="text"
                value={artist}
                onChange={handleArtistChange}
                placeholder="Awesome band name"
                autoComplete="off"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLyrics">
              <Form.Label>Lyrics</Form.Label>
              <Form.Control
                as="textarea"
                rows={20}
                value={lyrics}
                onChange={handleLyricsChange}
                placeholder="La la la la la..."
                autoComplete="off"
                required
              />
            </Form.Group>
            <Stack gap={1} className="col-sm-8 col-md-10 mx-auto mb-3">
              <Button type="submit">Save</Button>
              <BackButton />
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewSong;
