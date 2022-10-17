import EditButtons from './edit-buttons.component';
import BackButton from './back-button.component';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Stack from 'react-bootstrap/Stack';

const SongItem = ({ song, description, thumbnail, buttonProps, actionProps }) => {
  const { editOpen = undefined, handleEditSubmit = undefined, handleEditChange = undefined } = actionProps;

  if (thumbnail) {
    song['thumbnail_url'] = thumbnail;
  }

  return (
    <Container className="my-3">
      <Row>
        <Col lg={5} className="p-5 border rounded text-center">
          <h1 className="title">{song.title}</h1>
          <h2 className="artist">by {song.artist}</h2>
          <Image fluid rounded src={song.thumbnail_url} alt={song.full_title} />
          <p className="text-muted fst-italic  mt-3">{description}</p>
          <BackButton />
        </Col>
        <Col lg={1} />
        <Col lg={5} className="p-5 border rounded">
          <EditButtons buttonProps={buttonProps} song={song} />
          {!editOpen ? (
            <p className="mt-3 text-center" style={{ whiteSpace: 'pre-line' }}>
              {song.lyrics}
            </p>
          ) : (
            <Form onSubmit={handleEditSubmit} className="mt-3">
              <Form.Control
                as={'textarea'}
                defaultValue={song.lyrics}
                cols={50}
                rows={50}
                onChange={handleEditChange}
                className="text-center"
              />
              <Stack gap={2} className="col-md-6 mx-auto mt-2">
                <Button variant="secondary" type="submit">
                  Save changes
                </Button>
                <Button variant="outline-secondary" onClick={buttonProps.toggleFormOpen}>
                  Cancel
                </Button>
              </Stack>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SongItem;
