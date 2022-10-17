import { Link } from 'react-router-dom';
import SongCard from './song-card.component';

import { LinkContainer } from 'react-router-bootstrap';

// React bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SearchMessage = () => (
  <div>
    <span>{'This song is not in your library, try '}</span>
    <Link to={'/search'}>{'searching'}</Link>
    <span>{' for it instead'}</span>
  </div>
);

const LibraryList = ({ songs, parent }) => {
  let message = () => null;

  switch (parent) {
    case 'setlist':
      message = () => 'This setlist is empty. Try adding a song';
      break;
    case 'library':
      message = SearchMessage;
      break;
    default:
      message = () => 'no message';
  }

  return (
    <Container>
      <Row xs={2} sm={3} md={4} lg={5}>
        {songs.map((song) => (
          <Col key={parseInt(song.id)}>
            <LinkContainer to={`/library/${song.id.toString()}`}>
              <SongCard song={song} />
            </LinkContainer>
          </Col>
        ))}
        {songs.length < 1 && <div>{message()}</div>}
      </Row>
    </Container>
  );
};

export default LibraryList;
