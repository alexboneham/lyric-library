import EditButtons from '../edit-buttons.component';
import BackButton from '../back-button.component';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const SongItem = ({ song, description, thumbnail, buttonProps, actionProps }) => {
  const {
    editOpen = undefined,
    handleEditSubmit = undefined,
    handleEditChange = undefined,
  } = actionProps;

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
          <EditButtons buttonProps={buttonProps} song={song}/>
          {editOpen ? (
            <form onSubmit={handleEditSubmit}>
              <textarea defaultValue={song.lyrics} cols={50} rows={50} onChange={handleEditChange} />
              <button type="submit">Submit</button>
            </form>
          ) : (
            <p className="mt-3 text-center" style={{ whiteSpace: 'pre-line' }}>
              {song.lyrics}
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SongItem;
