import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import { LinkContainer } from 'react-router-bootstrap';

const SearchResults = ({ songs }) => {
  return (
    <Container className="d-flex flex-column align-items-center">
      <h2>Search Results...</h2>
      <ListGroup variant="flush" className="align-items-start">
        {songs.slice(0, 5).map((song) => {
          // N.B. limiting results to 5 here. Could do this via pagination too...
          return (
            <ListGroup.Item key={song.result.id}>
              <Nav>
                <Nav.Item>
                  <LinkContainer to={`/search/${song.result.id}`}>
                    <Nav.Link>
                      <Container>
                        <Stack direction="horizontal" gap={3}>
                          <Image src={song.result.song_art_image_url} fluid width={171} height={171} rounded />
                          <Stack gap={1} className="my-auto">
                            <span>{song.result.title}</span>
                            <span className="text-muted">by {song.result.artist_names}</span>
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
    </Container>
  );
};

export default SearchResults;

// {song.result.full_title}
