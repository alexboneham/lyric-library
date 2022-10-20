import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { LinkContainer } from 'react-router-bootstrap';

const Results = ({ songs }) => {
  return (
    <Container className="mt-4">
      {songs.slice(0, 5).map((song) => {
        return (
          <Row key={song.result.id} className="my-3 justify-content-center">
            <Col md={4} className="d-flex flex-column justify-content-center">
              <Nav>
                <Nav.Item>
                  <LinkContainer to={`/search/${song.result.id}`} style={{ cursor: 'pointer' }}>
                    <Nav.Link className="p-0">
                      <h3>{song.result.title}</h3>
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              </Nav>
              <span className="text-muted">by {song.result.artist_names}</span>
            </Col>
            <Col md={3}>
              <LinkContainer to={`/search/${song.result.id}`} style={{ cursor: 'pointer' }}>
                <Image src={song.result.song_art_image_url} fluid width={100} height={100} rounded />
              </LinkContainer>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default Results;
