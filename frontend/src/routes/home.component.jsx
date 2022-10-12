import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

const Home = ({ title, message }) => (
  <Container className="p-3 mt-3 text-center shadow-lg rounded ">
    <h1 className="display-4">{title}</h1>
    <p>{message}</p>
    <hr />
    <h2>Usage:</h2>
    <Container className="w-75">
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Link to={'/search'}>Search</Link> for a song by title or artist
        </ListGroup.Item>
        <ListGroup.Item>
          Save a song to your <Link to={'/library'}>Library</Link> for fast access and more features
        </ListGroup.Item>
        <ListGroup.Item>
          Create <Link to={'/setlists'}>Setlists</Link> and add songs
        </ListGroup.Item>
      </ListGroup>
    </Container>
  </Container>
);

export default Home;
