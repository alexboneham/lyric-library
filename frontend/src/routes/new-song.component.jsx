import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewSong = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [lyrics, setLyrics] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleArtistChange = (e) => setArtist(e.target.value);
  const handleLyricsChange = (e) => setLyrics(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(title + '\n' + artist + '\n' + lyrics);



    setTitle('');
    setArtist('');
    setLyrics('');
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
                autoComplete='off'
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
                autoComplete='off'
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
                autoComplete='off'
                required
              />
            </Form.Group>
            <Button type="submit">Save</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewSong;
