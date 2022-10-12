import { LinkContainer } from 'react-router-bootstrap';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

const SearchResults = ({ songs }) => {
  return (
    <Container className='text-center p-3'>
      <h2>Search Results...</h2>
      <ListGroup variant="flush">
        {songs.map((song) => {
          return (
            <LinkContainer to={`/search/${song.result.id}`} key={song.result.id} style={{ cursor: 'pointer' }}>
              <ListGroup.Item className='text-decoration-underline'>{song.result.full_title}</ListGroup.Item>
            </LinkContainer>
          );
        })}
      </ListGroup>
    </Container>
  );
};

export default SearchResults;
