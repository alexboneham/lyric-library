import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const Home = ({ title, message }) => (
  <Container className="p-5 mt-5 shadow-lg rounded">
    <Container className="text-center px-5 pb-2">
      <h1 className="display-4">{title}</h1>
      <p>{message}</p>
    </Container>
    <hr />
    <Container className="d-flex flex-column align-items-center">
      <h2>Usage:</h2>
      <Nav className="flex-column align-items-center">
        <Nav.Item className="mb-2">
          <LinkContainer to={'/search'}>
            <Nav.Link className="d-inline-flex p-0">Search</Nav.Link>
          </LinkContainer>{' '}
          for a song by title or artist
        </Nav.Item>
        <Nav.Item className="mb-2">
          Save a song to your{' '}
          <LinkContainer to={'/library'}>
            <Nav.Link className="d-inline-flex p-0">library</Nav.Link>
          </LinkContainer>{' '}
          for fast access and more features
        </Nav.Item>
        <Nav.Item className="mb-2">
          Create{' '}
          <LinkContainer to={'/setlists'}>
            <Nav.Link className="d-inline-flex p-0">setlists</Nav.Link>
          </LinkContainer>{' '}
          and add songs
        </Nav.Item>
      </Nav>
    </Container>
  </Container>
);

export default Home;
